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
        $('body').show();
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
    createSymbolChart(`/dashboard/day/${symbol}`, symbol, createHourChart);
  });
});

function createFavoritesTable() {
  let favorites = sessionStorage.getItem('favorites');
  if (favorites) {
    favorites = JSON.parse(favorites);
    let tableBody = $('#favorites-table tbody');
    favorites.forEach(function (symbol) {
      let row = `<tr>
              <td>${symbol}</td>
              <td><button class="btn btn-primary show-daily" data-symbol="${symbol}">Show Last Day Chart</button></td>
              <td><button class="btn btn-primary show-monthly" data-symbol="${symbol}">Show Month Chart</button></td>
              <td><button class="btn btn-primary show-yearly" data-symbol="${symbol}">Show Year Chart</button></td>
              <td><button class="btn btn-danger unfavorite" data-symbol="${symbol}">Unfavorite</button></td>
          </tr>`;
      tableBody.append(row);
    });
  }
}

function createDayChart(symbol, response) {
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
}

function createHourChart(symbol, response) {
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
            unit: 'hour'
          }
        },
        y: {
          beginAtZero: true
        }
      }
    }
  });
}


function createSymbolChart(url, symbol, chartFunc) {
  $('#spinner').show();
  $.ajax({
    url,
    type: 'GET',
    success: function (response) {
      if (chart) {
        chart.destroy()
      };

      chartFunc(symbol, response);

      // Retrieve the favorites from the session storage
      let favorites = JSON.parse(sessionStorage.getItem('favorites')) || [];

      // Check if the symbol is not in the favorites
      if (!favorites.includes(symbol)) {
        // Add the button to the button container
        $('#button-container').empty().append('<button id="favorite-btn" class="btn btn-primary my-4 mx-2">Add to Favorites</button>');

        // Bind a click event handler to the button
        $('#favorite-btn').click(function () {
          addToFavorites();
          $('#favorite-btn').hide();
        });
      } else {
        // If the symbol is already in the favorites, remove any existing button
        $('#button-container').empty();
      }

      // Always add the 'Show Month Chart' and 'Show Year Chart' buttons
      $('#button-container').append('<button id="day-chart-btn" class="btn btn-primary my-4 mx-2">Show Last Day Chart</button>');
      $('#button-container').append('<button id="month-chart-btn" class="btn btn-primary my-4 mx-2">Show Month Chart</button>');
      $('#button-container').append('<button id="year-chart-btn" class="btn btn-primary my-4 mx-2">Show Year Chart</button>');

      // Bind click event handlers to these buttons as well
      $('#day-chart-btn').click(function () {
        createSymbolChart(`/dashboard/day/${selectedSymbol}`, selectedSymbol, createHourChart);
      });
      $('#month-chart-btn').click(function () {
        createSymbolChart(`/dashboard/month/${selectedSymbol}`, selectedSymbol, createDayChart);
      });
      $('#year-chart-btn').click(function () {
        createSymbolChart(`/dashboard/year/${selectedSymbol}`, selectedSymbol, createDayChart);
      });

      $('#spinner').hide();
    },
    error: function (xhr, status, error) {
      window.alert('Symbol Not Found');
    }
  });
}

$(document).on('click', '.show-daily', function () {
  let symbol = $(this).data('symbol');
  selectedSymbol = symbol;
  createSymbolChart(`/dashboard/day/${symbol}`, symbol, createHourChart);
});

$(document).on('click', '.show-monthly', function () {
  let symbol = $(this).data('symbol');
  selectedSymbol = symbol;
  createSymbolChart(`/dashboard/month/${symbol}`, symbol, createDayChart);
});

$(document).on('click', '.show-yearly', function () {
  let symbol = $(this).data('symbol');
  selectedSymbol = symbol;
  createSymbolChart(`/dashboard/year/${symbol}`, symbol, createDayChart);
});

// favorite functionality
function addToFavorites() {
  let symbol = selectedSymbol;
  let favorites = sessionStorage.getItem('favorites');
  if (favorites) {
    $.ajax({
      type: 'PATCH',
      url: `/dashboard/favorites/add/${uuid}`,
      data: { symbol: selectedSymbol },
      success: (res) => {
        favorites = JSON.parse(favorites);
        favorites.push(symbol);
        favorites = [...new Set(favorites)];
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
        $('#favorites-table tbody').empty();
        createFavoritesTable();
      },
    });
  }
}

$(document).on('click', '.unfavorite', function () {
  let symbol = $(this).data('symbol');
  let favorites = sessionStorage.getItem('favorites');
  $.ajax({
    type: 'PATCH',
    url: `/dashboard/favorites/remove/${uuid}`,
    data: { symbol },
    success: (res) => {
      if (favorites) {
        favorites = JSON.parse(favorites);
        favorites = favorites.filter((stock) => stock !== symbol);
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
        $('#favorites-table tbody').empty();
        createFavoritesTable();
      }
    },
  });
});


// sign out functionality
$('#sign-out').click((e) => {
  e.preventDefault();
  $.ajax({
    type: 'POST',
    url: '/sign-out',
    data: { token: uuid },
    success: (res) => {
      sessionStorage.removeItem('uuid');
      document.cookie = 'uuid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      window.location.href = '/sign-in';
    }
  })
})

