const express = require('express');
const mongoose = require('mongoose');
const Article = require('../models/Article');

const router = express.Router();

// GET articles route
router.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find();

        return res.json({
            articles: articles.map(article => ({
                name: article.name,
                price: article.price,
                src: article.src,
                id: article._id
            }))
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Handle unsupported HTTP methods
router.all('/articles', (req, res) => {
    res.status(405).json({ error: 'Invalid HTTP method' });
});

module.exports = router;