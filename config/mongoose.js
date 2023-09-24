// Require the Mongoose library
const mongoose = require('mongoose');

// Define an async function for connecting to the database
async function main() {
    // Use the 'mongoose.connect' method to connect to the MongoDB database
    const db = await mongoose.connect('mongodb+srv://shatabarman3:5J46BAQg6RLClnll@cluster.htctynm.mongodb.net/CSV_Upload?retryWrites=true&w=majority');

    // Export the connected database instance 
    module.exports = db;
}

// Call the 'main' function to initiate the database connection
main()
    .then(() => console.log('MongoDB Connected...')) // If the connection is successful
    .catch(err => console.log("Error in connecting mongodb : ",err)); // If an error occurs during connection
