// Import the required modules
const express = require('express');
const db = require('./config/mongoose'); // Import database configuration
const upload = require('express-fileupload'); // Middleware for file uploads
const path = require('path'); // Node.js path module for handling file paths
const flash = require('connect-flash'); // Middleware for flash messages
const session = require('express-session'); // Middleware for session handling
const customMware = require('./config/middleware'); // Custom middleware

// Create an Express application
const app = express();

// Define the port on which the server will listen
const port = 8000;

// Configure and use session middleware
app.use(session({
    name: 'csv-upload', // Session name
    secret: 'secretkey', // Session secret (used for encryption)
    saveUninitialized: false, // Don't save uninitialized sessions
    resave: false, // Don't resave sessions if not modified
}));

// Configure and use express-fileupload middleware for handling file uploads
app.use(upload());

// Serve static assets from the 'assets' directory
app.use(express.static('./assets'));

// Configure and use flash middleware for flash messages
app.use(flash());

// Configure custom middleware for flash messages
app.use(customMware.setFlash);

// Configure the view engine as EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Define routes
app.use('/', require('./routes'));

// Start the server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});
