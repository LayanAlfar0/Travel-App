const path = require('path');
const express = require('express');
const app = express();

// Serve static files from the 'dist' directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle root request by sending the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/index.html'));
});

// Use the port from the environment variable or fallback to 5000
const PORT = process.env.PORT || 5000;

// Start the server and handle any errors during the startup
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}).on('error', (err) => {
    console.error('Failed to start server:', err);
});

module.exports = server;
