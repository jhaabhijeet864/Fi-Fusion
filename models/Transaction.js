const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});
module.exports = mongoose.model('Transaction', TransactionSchema);