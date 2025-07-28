// firebaseAdmin.js
const admin=require('firebase-admin');
const path = require('path');

// Load service account key
const serviceAccount = require(path.resolve("blogideator-firebase-adminsdk-fbsvc-29d1dd1e23.json"));
// Prevent duplicate initialization
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

module.exports=admin;
