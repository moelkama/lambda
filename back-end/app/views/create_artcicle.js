const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Article = require('../models/Article'); // Import the Article model

const router = express.Router();

const UPLOAD_PATH = 'public/articles_pictures/';
const MEDIA_URL = '/media/';

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_PATH)) {
    fs.mkdirSync(UPLOAD_PATH, { recursive: true });
}

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
        const articleName = req.body.name;
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, `${articleName}${ext}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const validExtensions = ['.jpg', '.jpeg', '.png'];
        if (!validExtensions.includes(path.extname(file.originalname).toLowerCase())) {
            return cb(new Error('Invalid image extension'), false);
        }
        cb(null, true);
    }
});

// Create Article Route
router.post('/create_article', upload.single('image'), async (req, res) => {
    try {
        const { name, price, type, category, height, width, how_many_available } = req.body;

        // Check if article name already exists
        const existingArticle = await Article.findOne({ name });
        if (existingArticle) {
            console.log(`Article name already exists: ${name}`);
            return res.status(400).json({ error: 'Article name already exists' });
        }

        // Check if image is provided
        if (!req.file) {
            console.log("Image is required");
            return res.status(400).json({ error: 'Image is required' });
        }

        // File path for storing the image
        const filePath = `${MEDIA_URL}${UPLOAD_PATH}${req.file.filename}`;
        console.log(`File path: ${filePath}`);

        // Create new article
        const article = new Article({
            name,
            price,
            src: filePath,
            type,
            category,
            height,
            width,
            how_many_available
        });

        await article.save();
        return res.status(201).json({ id: article._id });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Render Dashboard (GET request)
router.get('/create_article', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/dashboard.html'));
});

// Unsupported HTTP Methods
router.all('/create_article', (req, res) => {
    res.status(405).json({ error: 'Unsupported HTTP method' });
});

const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    src: { type: String, required: true },
    type: { type: String, required: true },
    category: { type: String, required: true },
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    how_many_available: { type: Number, required: true }
});

module.exports = mongoose.model('Article', ArticleSchema);