const express = require('express');
const router = express.Router();
const needle = require('needle');

// Env vars
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;


router.get('/', async (req, res) => {

    try {
        // const apiRes = await needle('get', `${API_BASE_URL}`);
        const apiRes = await needle('get', `${API_BASE_URL}/popular?api_key=${API_KEY_VALUE}&language=en-US&page=1`);

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