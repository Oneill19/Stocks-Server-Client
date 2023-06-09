// Get a reference to the form element
const form = document.getElementById('user-register');

// Attach an event listener to the form element
form.addEventListener('submit', function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the values of the input elements
  const firstName = document.getElementById('first-name').value;
  const lastName = document.getElementById('last-name').value;
  const email = document.getElementById('email').value;

  // Construct an object that represents the data
  const data = { firstName, lastName, email };
    console.log(data);
  // Send an HTTP request to the server-side script
//   const xhr = new XMLHttpRequest();
//   xhr.open('POST', '/save-data');
//   xhr.setRequestHeader('Content-Type', 'application/json');
//   xhr.send(JSON.stringify(data));
});