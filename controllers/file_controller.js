// Import required modules
const fs = require('fs');
const path = require('path');
const csvParser = require('csv-parser');
const CSV = require('../models/csv');

// Method to handle file upload
module.exports.uploadCSV = function (req, res) {
    // Restrict to only allow CSV files by checking the file's mimetype
    if (req.files && req.files.csvfile && req.files.csvfile.mimetype == "text/csv") {

        let file = req.files.csvfile;

        let filename = file.name;
        let uploadpath = path.join(__dirname, '../uploads/csv', Date.now() + filename);

        // Use 'file.mv' to move the uploaded file to a specific directory
        // I have used 'fileUpload' library instead of 'multer'
        file.mv(uploadpath, async function (err) {
            if (err) {
                req.flash("error", 'Error in Uploading file');
                console.log("File Upload Failed", filename, err);
                return res.redirect('back');
            } else {
                // If file upload is successful, add the file's path to the database
                let csv = await CSV.create({
                    filename: filename,
                    filepath: uploadpath
                });

                if (!csv) {
                    req.flash("error", 'Error in Uploading file');
                    console.log("Error in creating csv file");
                    return res.redirect('back');
                } else {
                    req.flash("success", 'File Uploaded Successfully');
                    console.log("File Uploaded Successfully: ", filename);
                    res.redirect('back');
                }
            }
        });
    } else {
        req.flash("error", 'Please upload a CSV file');
        res.redirect('back');
    }
}

// Method to delete a CSV file from both the 'uploads' directory and the database
module.exports.deleteCSV = async function (req, res) {
    try {
        let id = req.params.id;
        // Find the document by its id
        let csv = await CSV.findById(id);

        // If found
        if (csv) {
            // Delete from the database and also remove from the 'uploads' directory
            csv.deleteOne();
            fs.unlinkSync(csv.filepath);

            console.log("File Deleted Successfully: ", csv.filename);
            req.flash("success", 'File Deleted Successfully');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash("error", 'Error in deleting file');
        console.log("Error in deleting CSV file", err);
        return res.redirect('back');
    }
}

// Method to display CSV files in tabular form, paginated to show 100 rows per page
module.exports.displayCSV = async function (req, res) {
    try {
        // If 'page' and 'limit' are provided in the query, use them; otherwise, default to the 1st page with 100 rows
        const page = parseInt(req.query.page) || 1;       
        const limit = parseInt(req.query.limit) || 100;
        const startIndex = (page - 1) * limit;       
        const endIndex = page * limit;       

        // Get the CSV file's ID from the request parameters
        let id = req.params.id;
        
        // Find the CSV file by its ID
        let csv = await CSV.findById(id);
        
        if (csv) {
            let data = []; // Array to store the CSV data
            let header = []; // Array to store the CSV headers

            // Use the 'csv-parser' library to parse the CSV file to JSON format and store it in an array
            fs.createReadStream(csv.filepath)
                .pipe(csvParser({ separator: ',' }))
                .on('headers', (headers) => {
                    // Store the CSV headers
                    headers.map((head) => {
                        header.push(head);
                    });
                })
                .on('data', (row) => {
                    // Push each row of CSV data into the 'data' array
                    data.push(row);
                })
                .on('end', () => {
                    // Prepare pagination information
                    let pageInfo = {};
                    
                    // Check if there's a previous page
                    if (startIndex > 0) {
                        pageInfo.prev = page - 1;
                    }

                    // Check if there's a next page
                    if (endIndex < data.length) {
                        pageInfo.next = page + 1;
                    }

                    // Calculate the total number of pages
                    pageInfo.total = Math.ceil(data.length / limit);

                    // Set the current page number
                    pageInfo.current = page;

                    // Slice data to show only 100 rows on a page
                    data = data.slice(startIndex, endIndex);
                 
                    // Render the data in the 'viewcsv.ejs' template
                    return res.render('viewcsv.ejs', {
                        title: `CSV Reader | ${csv.filename.substring(0, csv.filename.lastIndexOf('.'))}`,
                        id: id,
                        filename: csv.filename,
                        csv: csv,
                        header: header,
                        data: data,
                        pageInfo: pageInfo
                    });
                });
        }
    } catch (err) {
        // Handle errors
        console.log("Error in displaying CSV file: ", err);
        req.flash("error", 'Error in displaying file');
        return res.redirect('back');
    }
}
