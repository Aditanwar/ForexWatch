const express = require('express');
const router = express.Router();
const Alert = require('../models/Alert');
const auth = require('../middleware/auth');

// Create a new alert (Protected)
router.post('/', auth, async (req, res) => {
    try {
        const { currencyPair, targetRate, condition, phoneNumber } = req.body;
        const newAlert = new Alert({
            currencyPair,
            targetRate,
            condition,
            phoneNumber,
            user: req.user.id // Associate with logged in user
        });
        const savedAlert = await newAlert.save();
        res.status(201).json(savedAlert);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all alerts for logged in user
router.get('/', auth, async (req, res) => {
    try {
        const alerts = await Alert.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(alerts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an alert
router.delete('/:id', auth, async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);
        if (!alert) return res.status(404).json({ msg: 'Alert not found' });

        // Check user
        if (alert.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'User not authorized' });
        }

        await alert.deleteOne();
        res.json({ msg: 'Alert removed' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
