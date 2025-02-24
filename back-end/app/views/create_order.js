const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Order = require('../models/Order');
const Item = require('../models/Item');
const Article = require('../models/Article');

const router = express.Router();

// Create Order Route
router.post('/create_order', async (req, res) => {
    try {
        const items = req.body;

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ error: 'Invalid order items' });
        }

        // Create a new order
        const order = new Order();
        await order.save();

        // Process items in the order
        for (const item of items) {
            const newItem = new Item({
                name: item.name,
                count: item.count,
                price: item.price,
                order: order._id
            });
            await newItem.save();

            // Update the Article's "how_many_times_ordered"
            const article = await Article.findOne({ name: item.name });
            if (article) {
                article.how_many_times_ordered += item.count;
                await article.save();
            }
        }

        return res.status(201).json({ id: order._id });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Render Dynamic Form (GET request)
router.get('/create_order', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dynamic_form.html'));
});

// Unsupported HTTP Methods
router.all('/create_order', (req, res) => {
    res.status(405).json({ error: 'Invalid HTTP method' });
});

module.exports = router;