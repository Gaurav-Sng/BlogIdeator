const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const paypal = require('@paypal/checkout-server-sdk');
const admin = require('./admin');

// Load environment variables
dotenv.config();

// PayPal environment setup
let environment = process.env.PAYPAL_MODE === 'live'
  ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
  : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const paypalClient = new paypal.core.PayPalHttpClient(environment);
// Import routes
const trendRoutes = require('./routes/trend.routes');
const blogRoutes = require('./routes/blog.routes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', apiLimiter);

// Register routes
app.use('/api/trends', trendRoutes);
app.use('/api/blogs', blogRoutes);

// PAYPAL ORDER CREATION
app.post("/orders", async (req, res) => {
  const { amount, planName, userID } = req.body;
  const formattedAmount = parseFloat(amount.slice(1)).toFixed(2);
  console.log(`Formatted amount for PayPal: "${formattedAmount}", type: ${typeof (formattedAmount)}`);
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [{
      amount: {
        currency_code: "USD",
        value: formattedAmount
      },
      description: `Subscription: ${planName}`,
      custom_id: `${userID}::${planName}`
    }],
    application_context: {
      return_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    }
  });

  try {
    const order = await paypalClient.execute(request);
    const approvalUrl = order.result.links.find(link => link.rel === 'approve').href;
    res.json({ id: order.result.id, approvalUrl });
  } catch (err) {
    //console.error(err);
    console.log(err.debug_id, err.message);
    res.status(500).json({ error: 'Failed to create PayPal order' });
  }
});



// PAYPAL PAYMENT CAPTURE
app.post("/capture/:orderID", async (req, res) => {
  var { orderID } = req.params;
  const { uid } = req.body;
  orderID=orderID.slice(1, orderID.length);
  console.log("Order ID received for capture:", orderID);

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});
  try {
    const capture = await paypalClient.execute(request);
    const status = capture.result.status;
    const captureID = capture.result.purchase_units[0].payments.captures[0].id;
    const amount = capture.result.purchase_units[0].payments.captures[0].amount;

    // Check if the payment is completed
    if (status === 'COMPLETED') {
      await admin.auth().setCustomUserClaims(uid, { plan: 'pro' });

      await admin.firestore().collection('users').doc(uid).update({
        plan: 'pro',
        upgradedAt: admin.firestore.FieldValue.serverTimestamp(),
        paypalCaptureID: captureID,
        paymentAmount: amount,
      });

      return res.status(200).json({
        success: true,
        message: `Plan upgraded to PRO`,
        captureID,
        amount,
        plan: 'pro'
      });
    } else {
      return res.status(400).json({ success: false, message: 'Payment not completed' });
    }
  } catch (err) {
    console.error("PayPal capture error:", err);
    res.status(500).json({ error: "Failed to capture PayPal payment" });
  }
});




// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: true,
    message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: true, message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`TrendBuddy API server running on port ${PORT}`);
});

// Unhandled promise rejection handler
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
