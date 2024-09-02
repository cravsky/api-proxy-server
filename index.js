const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 5 // limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.set('trust proxy', 1); // trust first proxy

// Routes
app.use('/api', require('./routes/index'));


// Enable cors
app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 
