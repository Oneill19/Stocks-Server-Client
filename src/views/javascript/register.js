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

  if (password !== repeatPassword) {
    alert('Passwords do not match');
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
        sessionStorage.setItem('email', res.email);
        sessionStorage.setItem('favorites', res.favorites);
        window.location.href = '/dashboard';
      }
    },
  });
});