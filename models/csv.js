// Import the 'mongoose' library
const mongoose = require('mongoose');

// Define a schema for CSV files
const csvSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true 
    },
    filepath: {
        type: String,
        required: true 
    }
},
{
    timestamps: true // Automatically add 'createdAt' and 'updatedAt' timestamps to documents
});

// Define a Mongoose model named 'CSV' using the 'csvSchema' schema
const CSV = mongoose.model('CSV', csvSchema);

// Export the 'CSV' model to make it available for use in other parts of the application
module.exports = CSV;
