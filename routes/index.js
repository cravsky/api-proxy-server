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

// default route
router.get('/', cache('2 minutes'), async (req, res) => {
    try {
        const params = new URLSearchParams({
            // Universal approach to get query parameters
            // ...url.parse(req.url, true).query
            [API_KEY_NAME]: API_KEY_VALUE,
            language: 'en-US',
            page: 1,
        });

        const apiRes = await needle('get', `${API_BASE_URL}/popular?${params}`);
        const data = apiRes.body;
        if (process.env.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${API_BASE_URL}/popular?${params}`);
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false
        });
    }});

    // moviemanic top_rated
    router.get('/upcoming', cache('2 minutes'), async (req, res) => {
        try {
            const params = new URLSearchParams({
                // Universal approach to get query parameters
                // ...url.parse(req.url, true).query
                [API_KEY_NAME]: API_KEY_VALUE,
                language: 'en-US',
                page: 1,
            });
            const apiRes = await needle('get', `${API_BASE_URL}/upcoming?${params}`);
            const data = apiRes.body;
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({
                message: error.message,
                success: false
            });
        }


        // res.json({
        //     message: 'Welcome to the API',
        //     success: true
        // });
    });


    module.exports = router;