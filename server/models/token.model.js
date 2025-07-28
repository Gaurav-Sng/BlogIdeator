const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blogideator')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Connection error', err));

const tokenSchema = new mongoose.Schema({
  accessToken: String,
  refreshToken: String,
  expiresAt: Date, // store token expiry
}, { timestamps: true });

module.exports = mongoose.model('Token', tokenSchema);
