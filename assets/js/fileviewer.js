// Get the search input field and table rows
const search = document.querySelector('#search-bar input');
const tableRow = document.querySelectorAll('tbody tr');

// This method takes a search term and filters the table rows based on the term
const filterTable = (term) => {
    tableRow.forEach((row, index) => {
        // Skip the first row (header row)
        if (index === 0) return;

        let rowtext = row.textContent.trim().toLowerCase();
        if (rowtext.includes(term)) {
            row.style.display = 'table-row'; // Display the row if it matches the search term
        } else {
            row.style.display = 'none'; // Hide the row if it doesn't match
        }
    });
};

// Add a keyup event listener to the search input field
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase(); // Get the trimmed and lowercase search term
    filterTable(term); // Call the filterTable function to filter the table rows
});

// Function to sort the table when a header item is clicked
function sortTable(n) {
    var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.querySelector("table");
    switching = true;
    // Set the initial sorting direction to ascending:
    dir = "asc";

    // Continue sorting until no more switching is needed:
    while (switching) {
        // Start by assuming no switching is needed:
        switching = false;
        rows = table.rows;

        // Loop through all table rows (except the first, which contains headers):
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;

            // Get the two elements to compare (one from the current row and one from the next):
            x = rows[i].getElementsByTagName("TD")[n];
            y = rows[i + 1].getElementsByTagName("TD")[n];

            // Check if the two rows should switch places based on the sorting direction (ascending or descending):
            if (dir == "asc") {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break; // Mark as a switch and exit the loop
                }
            } else if (dir == "desc") {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break; // Mark as a switch and exit the loop
                }
            }
        }
        if (shouldSwitch) {
            // If a switch has been marked, make the switch and mark that a switch has been done:
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
            // Increase the switch count by 1 each time a switch is done:
            switchcount++;
        } else {
            // If no switching has been done and the direction is "asc," switch to "desc" and run the loop again:
            if (switchcount == 0 && dir == "asc") {
                dir = "desc";
                switching = true;
            }
        }
    }
}
