
$(document).ready(function () {
  //prevent from submitting empty form
  try{
    const name = $('#name');
    const emailField = $('#email');
    const submitButton = $('#submit');
    const dropdown = $('#drop-down');
  
    function isEmptyInputs() {
      console.log('value of dropdown: ', dropdown.val());
      if (emailField.val() !== '' && name.val() !== '' && dropdown.val() !== null) {
        submitButton.removeClass('disabled');
      } else {
        submitButton.addClass('disabled');
      }}
  
    name.on('input', isEmptyInputs);
    emailField.on('input', isEmptyInputs);
    dropdown.on('input', isEmptyInputs);
  }catch(err){
    console.log(err);
  }
  });

  $('#submit').click((e) => {
    // validate inputs before sending request
    
    e.preventDefault();
    const name = $('#name').val();
    const email = $('#email').val();
    const dropdown = $('#drop-down').val();
    const message = $('#message').val();

    //check that email is with pattern
    let isEmailValid = /^\S+@\S+\.\S+$/.test(email);
    if (!isEmailValid) {
      console.log('Email is not valid');
      alert('Email is not valid');
      return;
    }

    $.ajax({
      type: 'POST',
      url: '/contact_us',
      data: {
        name: name,
        email: email,
        dropdown: dropdown,
        message: message,
      },
      success: (res) => {
        console.log(res);
        alert('Message sent successfully');
        window.location.href = '/';
      },
      error:(jqXHR, textStatus, errorThrown) => {
        // alert(jqXHR.responseJSON.error); 
      },
    });
  });