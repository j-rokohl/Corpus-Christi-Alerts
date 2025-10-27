// Get weather.gov forecasts

const apiUrl = 'https://api.weather.gov/gridpoints/CRP/110,32/forecast';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const periods = data.properties.periods;
    let formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    let div = document.getElementById("weather");
    for (let i = 0; i < periods.length; i++) {
      let myDate = new Date(periods[i].startTime);
      let node = document.createElement('div');
      node.innerHTML =
        '<div class="col s12 m3" style="min-height: 28rem !important;">' +
        '<div class="card" style="min-height: 28rem;">' +
        '<div class="card-image">' +
        '<img src="' + periods[i].icon + '"' + ' alt="' + periods[i].shortForecast + '" />' +
        '<h6 class="card-title black-text" style="background-color: white; font-size: 1em;"><strong>' + periods[i].name + ', ' + formatter.format(myDate) + '</strong></h6>' +
        '<a class="btn-floating halfway-fab deep-orange accent-3"><i class="material-icons">share</i></a>' +
        '</div>' +
        '<div class="card-content black-text">' +
        '<p class="truncate-multi-line"><strong>' + "Temperature: </strong>" + periods[i].temperature + periods[i].temperatureUnit +
        '<br><strong>' + "Wind Speed: </strong>" + periods[i].windSpeed +
        '<br><strong>' + "Wind Direction: </strong>" + periods[i].windDirection +
        '<br>' + periods[i].detailedForecast + '</p>' +
        '</div></div></div>'
        ;
      document.getElementById("weather").appendChild(node);
    }
    console.log('Data fetched:', periods);
    // Process the data here
  })
  .catch(error => {
    console.error('Fetch error:', error);
    // Handle errors here
  });

function isDateInPast(date) {
  return new Date(date) < new Date();
};