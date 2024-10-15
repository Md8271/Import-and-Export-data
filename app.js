// app.js

// File input element ko select karein
const fileInput = document.getElementById('fileInput');

// File ko read karne ke liye function
function importCSV(file) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const text = event.target.result;
        const data = Papa.parse(text, { header: true }); // CSV ko parse karein
        console.log(data); // Parsed data ko console mein dikhayen

        // Yahan aap parsed data ko kisi variable mein store kar sakte hain
        // taaki export ke liye use kar sakein
        window.csvData = data.data; // Parsed data ko global variable mein store karein
    };

    reader.readAsText(file); // File ko text ke roop mein padhein
}

// File input ke liye event listener
fileInput.addEventListener('change', function(event) {
    const file = event.target.files[0]; // Pehli file ko lein
    if (file) {
        importCSV(file); // CSV import karein
    }
});

// Export function
function exportCSV(data) {
    const csv = Papa.unparse(data); // Data ko CSV mein convert karein
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' }); // Blob create karein
    const url = URL.createObjectURL(blob); // Blob ka URL create karein

    const a = document.createElement('a'); // Link create karein
    a.href = url;
    a.download = 'exported_data.csv'; // Default filename
    document.body.appendChild(a);
    a.click(); // Link par click karein
    document.body.removeChild(a); // Link ko remove karein
}

// Export button ke liye event listener
const exportButton = document.getElementById('exportButton');
exportButton.addEventListener('click', function() {
    // Yahan aap window.csvData se data lete hain jo import function mein store hua tha
    if (window.csvData) {
        exportCSV(window.csvData); // Export function call karein
    } else {
        alert("Please import a CSV file first."); // Agar koi data nahi hai toh alert karein
    }
});