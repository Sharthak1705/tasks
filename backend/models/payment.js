const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending',  },
  sessionId: { type: String, required: true },
    products: [
    {
      title: String,
      price: Number,
      quantity: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Payment', PaymentSchema);
