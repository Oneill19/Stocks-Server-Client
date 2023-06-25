const uuid = getUUID();

if (uuid) {
  $.ajax({
    type: 'POST',
    url: '/sign-in/authenticate',
    data: { uuid: uuid },
    success: (res) => {
      if (res.response === 'OK') {
        sessionStorage.setItem('email', res.email);
        sessionStorage.setItem('favorites', res.favorites);
        window.location.href = '/dashboard';
      }
    },
  });
}

function getUUID() {
  let uuid;
  if (document.cookie) {
    uuid = document.cookie.split('; ').find(row => row.startsWith('uuid')).split('=')[1];
  }

  if (!uuid) {
    uuid = sessionStorage.getItem('uuid');
  }

  return uuid;
}

$(document).ready(function () {
  const emailField = $('#email');
  const passwordField = $('#password');
  const loginButton = $('#sign-in');

  function validateInputs() {
    let passwordVal = passwordField.val();
    let emailVal = emailField.val();

    let isEmailValid = /^\S+@\S+\.\S+$/.test(emailVal);
    let hasUpperCase = /[A-Z]/.test(passwordVal);
    let hasLowerCase = /[a-z]/.test(passwordVal);
    let hasNumbers = /\d/.test(passwordVal);
    let hasNonalphas = /\W/.test(passwordVal);
    let isLengthValid = passwordVal.length >= 6;

    if (emailVal !== '' && passwordVal !== '' && isEmailValid && hasUpperCase && hasLowerCase && hasNumbers && hasNonalphas && isLengthValid) {
      loginButton.removeClass('disabled');
    } else {
      loginButton.addClass('disabled');
    }
  }

  emailField.on('input', validateInputs);
  passwordField.on('input', validateInputs);
});


$('#sign-in').click((e) => {
  e.preventDefault();

  const email = $('#email').val();
  const password = $('#password').val();

  $.ajax({
    type: 'POST',
    url: '/sign-in',
    data: {
      email: email,
      password: password,
    },
    success: (res) => {
      if ($('#remember-me').is(':checked')) {
        document.cookie = `uuid=${res.token};path=/`;
      } else {
        sessionStorage.setItem('uuid', res.token);
      }

      sessionStorage.setItem('favorites', res.favorites);

      window.location.href = '/dashboard';
    },
    error: (jqXHR, textStatus, errorThrown) => {
      window.alert(jqXHR.responseJSON.error);
    },
  });
});