// Import the 'CSV' model
const CSV = require('../models/csv');

// Method to render the home page
module.exports.home = async function(req, res){
    // Find all CSV documents in the database
    let csvs = await CSV.find({});
    
    // Render the 'home.ejs' template with the list of CSV files
    return res.render('home.ejs', {
        title: "CSV Reader | Home",
        files: csvs
    });
}
