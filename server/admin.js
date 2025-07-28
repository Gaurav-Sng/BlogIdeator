// firebaseAdmin.js
const admin=require('firebase-admin');
const path = require('path');

// Load service account key
const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CONFIG);
// Prevent duplicate initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports=admin;
