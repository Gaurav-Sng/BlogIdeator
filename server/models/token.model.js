const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));

const tokenSchema = new mongoose.Schema({
  accessToken: String,
  refreshToken: String,
  expiresAt: Date, // store token expiry
}, { timestamps: true });

module.exports = mongoose.model('Token', tokenSchema);
