const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors'); // To handle CORS issues if frontend and backend are on different ports

const app = express();

// Enable CORS to allow requests from different origins (e.g., frontend running on a different port)
app.use(cors());

// Middleware to serve static files
app.use(express.static(path.join(__dirname, '../front'))); // Serve frontend files from the public directory

// Set up storage for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads/')); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Route to handle file upload
app.post('/upload', upload.single('cropImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.send(Image uploaded successfully! File path: ${path.join(__dirname, 'uploads/', req.file.filename)});
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(Server is running on http://localhost:${PORT});
});