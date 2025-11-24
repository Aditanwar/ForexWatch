const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
    currencyPair: {
        type: String,
        required: true,
        uppercase: true, // e.g., "EUR/USD"
    },
    targetRate: {
        type: Number,
        required: true,
    },
    condition: {
        type: String,
        enum: ['ABOVE', 'BELOW'],
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'TRIGGERED'],
        default: 'ACTIVE',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Alert', alertSchema);
