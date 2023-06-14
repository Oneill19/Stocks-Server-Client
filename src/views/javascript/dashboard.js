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
      } else {
        window.location.href = '/sign-in';
      }
    },
  });
} else {
  window.location.href = '/sign-in';
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