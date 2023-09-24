// Import the Express.js library
const express = require('express');

// Create a router object using Express's Router class
const router = express.Router();

// Import the controllers for handling routes
const homeController = require('../controllers/home_controller');
const fileController = require('../controllers/file_controller');


// Route for the home page, handled by the homeController's 'home' method
router.get('/', homeController.home);

// Route for adding a CSV file, handled by the fileController's 'uploadCSV' method
router.post('/add', fileController.uploadCSV);

// Route for deleting a CSV file, handled by the fileController's 'deleteCSV' method
router.get('/delete/:id', fileController.deleteCSV);

// Route for displaying a CSV file, handled by the fileController's 'displayCSV' method
router.get('/display/:id', fileController.displayCSV);

// Export the router so it can be used by the main application
module.exports = router;
