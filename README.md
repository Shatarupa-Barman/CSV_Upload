# CSV_Upload
CSV_Upload is a web application that allows users to upload , parse CSV files and display a list of all uploaded csv files. The application is built with Node.js , Express, and MongoDB.
## Installation
To install CSV_Upload, please follow these steps:

- Clone this repository using the following command:
```
$ git clone https://github.com/Shatarupa-Barman/CSV_Upload.git
```
- Install the required dependencies using the following command:
```
$ npm install 
```
- Start the application using the following command:
```
$ npm start 
```
Open the application in your web browser by visiting the following URL:
```
$ http://localhost:8000 
```

## Features
* CSV file upload: Users can upload CSV files with a simple web form.
* CSV parsing: The application parses the CSV data and displays it in a table.
* Searching: Users can search data in the table.
* Sorting: Users can sort table data according to a row by clicking on any header.
* Pagination: Table data is paginated so user can only see 100 rows at a page.

## Folder Structure
```

CSV_Upload/
├── assets/
│ ├── css/
│ │ ├── home.css
│ │ ├── viewcsv.css
│ ├── js/
│ │ └── fileviewer.js
├── config/
│ ├── middleware.js
│ ├── mongoose.js
├── controllers/
│ ├── file_controller.js
│ ├── home_controller.js
├── models/
│ ├── csv.js
├── routes/
│ ├── index.js
├── uploads/
│ ├── csv/
├── views/
│ ├── home.ejs
│ ├── viewcsv.ejs
├── .gitignore
├── .node-version
├── README.md
├── index.js
├── package-lock.json
├── package.json

```

##  Demo :-

- Git Repository link : https://github.com/Shatarupa-Barman/CSV_Upload
- Hosted Link :
