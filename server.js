const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

// Enhanced security middleware
app.use(cors({ origin: true }));
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// Payment endpoint with improved error handling
app.post('/payment', async (req, res) => {
    try {
        // Validate required fields
        if (!req.body.token || !req.body.token.id || !req.body.amount) {
            return res.status(400).json({
                error: 'Missing required fields: token.id and amount'
            });
        }

        // Validate amount is a number and meets minimum requirement
        const amount = Number(req.body.amount);
        if (isNaN(amount)) {
            return res.status(400).json({ error: 'Amount must be a number' });
        }
        if (amount < 50) { // Minimum $0.50
            return res.status(400).json({ error: 'Amount must be at least $0.50' });
        }

        const charge = await stripe.charges.create({
            source: req.body.token.id,
            amount: Math.round(amount), // Ensure integer value
            currency: 'usd',
            description: 'E-commerce purchase',
            metadata: {
                ip: req.ip // Track originating IP
            }
        });

        // Enhanced success response
        res.status(200).json({
            success: true,
            chargeId: charge.id,
            amount: charge.amount,
            receipt_url: charge.receipt_url
        });

    } catch (stripeErr) {
        console.error('Stripe error:', stripeErr);

        // User-friendly error messages
        const errorMessages = {
            'card_declined': 'Your card was declined',
            'expired_card': 'Your card has expired',
            'insufficient_funds': 'Insufficient funds',
            'invalid_cvc': 'Invalid CVC code',
            'processing_error': 'Payment processing failed'
        };

        const message = errorMessages[stripeErr.code] || 'Payment failed';

        res.status(stripeErr.statusCode || 500).json({
            error: message,
            details: process.env.NODE_ENV !== 'production' ? stripeErr.message : undefined
        });
    }
});

// Production static file serving
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

// Error handling for server startup
app.listen(port, error => {
    if (error) {
        console.error('Server failed to start:', error);
        process.exit(1);
    }
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});