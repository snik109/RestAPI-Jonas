const express = require('express');
const cors = require('cors');
const path = require('path');
const findVersions = require('./findVersions.js');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Function to find versioned routes and mount them
findVersions(app);

module.exports = app;


app.listen(3872, () => {
    console.log('Server is running on port 3872');
})