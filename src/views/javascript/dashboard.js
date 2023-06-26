const uuid = getUUID();

if (uuid) {
  $.ajax({
    type: 'POST',
    url: '/sign-in/authenticate',
    data: { uuid: uuid },
    success: (res) => {
      if (res.response === 'OK') {
        sessionStorage.setItem('email', res.email);
        sessionStorage.setItem('favorites', JSON.stringify(res.favorites));
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
let ctx;
let chart;
let selectedSymbol;

$(document).ready(function () {
  createFavoritesTable();
  ctx = document.getElementById('myChart').getContext('2d');

  $('#submit-button').click(function () {
    let symbol = $('#symbol-input').val();
    selectedSymbol = symbol;
    createSymbolChart(`/dashboard/month/${symbol}`, symbol);
  });
});

function createFavoritesTable() {
  console.log('here');
  let favorites = sessionStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(favorites);
    let tableBody = $('#favorites-table tbody');
    favorites.forEach(function (symbol) {
      let row = `<tr>
              <td>${symbol}</td>
              <td><button class="btn btn-primary show-daily" data-symbol="${symbol}">Show Daily</button></td>
              <td><button class="btn btn-primary show-monthly" data-symbol="${symbol}">Show Monthly</button></td>
              <td><button class="btn btn-danger unfavorite" data-symbol="${symbol}">Unfavorite</button></td>
          </tr>`;
      tableBody.append(row);
    });
  }
}

function createSymbolChart(url, symbol) {
  $.ajax({
    url,
    type: 'GET',
    success: function (response) {
      if (chart) {
        chart.destroy()
      };

      chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: response.dates,
          datasets: [{
            label: symbol,
            data: response.prices,
            borderColor: 'rgba(75, 192, 192, 0.2)',
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'day'
              }
            },
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Retrieve the favorites from the session storage
      let favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];

      // Check if the symbol is not in the favorites
      if (!favorites.includes(symbol)) {
        // Add the button to the button container
        $('#button-container').empty().append('<button id="favorite-btn" class="btn btn-primary my-4">Add to Favorites</button>');

        // Bind a click event handler to the button
        $('#favorite-btn').click(function () {
          addToFavorites();
        });
      } else {
        // If the symbol is already in the favorites, remove any existing button
        $('#button-container').empty();
      }
    },
    error: function (xhr, status, error) {
      window.alert('Symbol Not Found');
    }
  });
}

$(document).on('click', '.show-daily', function () {
  let symbol = $(this).data('symbol');
  selectedSymbol = symbol;
  createSymbolChart(`/dashboard/month/${symbol}`, symbol);
});

$(document).on('click', '.show-monthly', function () {
  let symbol = $(this).data('symbol');
  selectedSymbol = symbol;
  createSymbolChart(`/dashboard/year/${symbol}`, symbol);
});

function addToFavorites() {
  let symbol = selectedSymbol;
  let favorites = sessionStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(favorites);
    favorites.append(symbol);
    favorites = [...new Set(favorites)];
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
    $('#favorites-table tbody').empty();
    createFavoritesTable();
  }
}

$(document).on('click', '.unfavorite', function () {
  let symbol = $(this).data('symbol');
  $('#favorites-table tbody').empty();
});

