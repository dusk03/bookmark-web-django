const siteUrl = '//mysite.com:8000/';
const styleUrl = siteUrl + 'static/css/bookmarklet.css';
const minWidth = 250;
const minHeight = 250;

// Load CSS
var head = document.getElementsByTagName('head')[0];  // Get HTML head element
var link = document.createElement('link'); // Create new link element
link.rel = 'stylesheet'; // Set the attributes for link element
link.type = 'text/css';
link.href = styleUrl + '?r=' + Math.floor(Math.random() * 9999999999999999);
head.appendChild(link);  // Append link element to HTML head

// Load HTML (append a new bookmarklet box)
var body = document.getElementsByTagName('body')[0];
var bookmarkletBox = document.createElement('div');
bookmarkletBox.id = "bookmarklet";
bookmarkletBox.innerHTML = `
  <a href="#" id="close">&times;</a>
  <h1>Select an image to bookmark:</h1>
  <div class="images"></div>
`;
body.appendChild(bookmarkletBox);

// Function to launch the bookmarklet
function bookmarkletLaunch() {
    var bookmarklet = document.getElementById('bookmarklet');
    var imagesFound = bookmarklet.querySelector('.images');

    // Clear previously found images
    imagesFound.innerHTML = '';

    // Display the bookmarklet
    bookmarklet.style.display = 'block';

    // Close event handler
    bookmarklet.querySelector('#close')
        .addEventListener('click', function () {
            bookmarklet.style.display = 'none';
        });

    // Find all images in the DOM
    var images = document.querySelectorAll('img');

    images.forEach(image => {
        // Ensure the image is loaded and has valid dimensions
        if (image.complete && image.naturalWidth >= minWidth && image.naturalHeight >= minHeight) {
            var imageFound = document.createElement('img');
            imageFound.src = image.src;
            imagesFound.appendChild(imageFound);  // Use appendChild to ensure proper DOM insertion
        } else {
            // Listen for the load event if image is not fully loaded
            image.onload = function () {
                if (image.naturalWidth >= minWidth && image.naturalHeight >= minHeight) {
                    var imageFound = document.createElement('img');
                    imageFound.src = image.src;
                    imagesFound.appendChild(imageFound);  // Use appendChild to ensure proper DOM insertion
                }
            };
        }
    });

    // Select image event
    imagesFound.querySelectorAll('img').forEach(image => {
        image.addEventListener('click', function (event) {
            var imageSelected = event.target;
            bookmarklet.style.display = 'none';
            window.open(siteUrl + 'images/create/?url='
                + encodeURIComponent(imageSelected.src)
                + '&title='
                + encodeURIComponent(document.title),
                '_blank');
        });
    });
}

// Launch the bookmarklet
bookmarkletLaunch();
