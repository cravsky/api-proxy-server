const express = require('express');
const router = express.Router();
const needle = require('needle');
const url = require('url');
const apicache = require('apicache');

// Env vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Cache
let cache = apicache.middleware;

// GET - /moviemaniac
router.get('/', cache('2 minutes'), async (req, res) => {
    try {
        // Configuration for external API request
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            language: 'en-US',
            page: 1,
        });
        // Universal approach to get query parameters
        const movieType = url.parse(req.url, true).query.movieType;
        const apiRes = await needle('get', `${API_BASE_URL}/${movieType}?${params}`);
        const data = apiRes.body;
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }
});

module.exports = router;