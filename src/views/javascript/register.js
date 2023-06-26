$(document).ready(function () {
  const firstName = $('#first');
  const lastName = $('#last');
  const emailField = $('#email');
  const passwordField = $('#pwd');
  const reapeatPasswordField = $('#rpwd');
  const registerButton = $('#register');

  function validateInputs() {
    if (emailField.val() !== '' && passwordField.val() !== '' 
                                && reapeatPasswordField.val() !== ''
                                && firstName.val() !== ''
                                && lastName.val() !== '') {
      registerButton.removeClass('disabled');
    } else {
      registerButton.addClass('disabled');
    }}

  firstName.on('input', validateInputs);
  lastName.on('input', validateInputs);
  emailField.on('input', validateInputs);
  passwordField.on('input', validateInputs);
  reapeatPasswordField.on('input', validateInputs);
});

$('#register').click((e) => {
  e.preventDefault();
  const firstName = $('#first').val();
  const lastName = $('#last').val();
  const email = $('#email').val();
  const password = $('#pwd').val();
  const repeatPassword = $('#rpwd').val();

  let hasUpperCase = /[A-Z]/.test(password);
  let hasLowerCase = /[a-z]/.test(password);
  let hasNumbers = /\d/.test(password);
  let hasNonalphas = /\W/.test(password);
  let isLengthValid = password.length >= 6;

  if (!(hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas && isLengthValid)) {
    alert('Password is not valid, please make sure of the following:\n' +
      '1. Password should contain at least one uppercase letter.\n' +
      '2. Password should contain at least one lowercase letter.\n' +
      '3. Password should contain at least one number.\n' +
      '4. Password should contain at least one special character.\n' +
      '5. Password should be at least 6 characters long.');
    return;
  }


  if (password !== repeatPassword) {
    alert('Passwords do not match');
    return;
  }

  let isEmailValid = /^\S+@\S+\.\S+$/.test(email);
  if (!isEmailValid) {
    alert('Email is not valid, please make sure of the following:\n' +
      '1. Email should contain @ and .\n' +
      '2. Email should not contain spaces.');
    return;
  }

  $.ajax({
    type: 'POST',
    url: '/register',
    data: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    },
    success: (res) => {
      if (res.response === 'OK') {
        // show success message with data sent from backend
        alert(res.email + ' has been registered successfully!');


        window.location.href = '/sign-in';
      }
    },
  });
});