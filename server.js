const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Fallback to index.html for any other requests (useful if adding routing later)
app.use((req, res) => {
    res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// Only start listening when run directly (not when imported by tests)
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

module.exports = app;
