// Get weather.gov alerts

const apiUrlTwo = 'https://api.weather.gov/alerts?zone=TXC355';

function isDateInPast(date) {
  return new Date(date) < new Date();
};

fetch(apiUrlTwo)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    const features = data.features;
    let formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
    let div = document.getElementById("alert");
    for (let i = 0; i < features.length; i++) {
      let effectiveStart = new Date(features[i].properties.onset);
      let effectiveEnd = new Date(features[i].properties.ends);

      let severity = features[i].properties.severity;

      let instructions = (features[i].properties.instruction == null) ? "There are no instructions." : features[i].properties.instruction;

      let status = (isDateInPast(features[i].properties.expires)) === true ? "Past Event" : "Active Now";

      let statusColor = (isDateInPast(features[i].properties.expires) === true) ? "#636363" : "#000000";

      let display = document.createElement('div');

      if (features[i].properties.status === 'Actual') {
        display.innerHTML =
          '<div class="row">' +
          '<div class="col-12">' +
          '<div class="card blue-grey lighten-4">' +
          '<div class="card-content black-text">' +
          '<h5 style="margin-top: 0; color:' + statusColor + '"><strong>' + status + ': ' + features[i].properties.event + '</strong></h5>' +
          '<p style="margin-top:  0;color:' + statusColor + '"><strong> Start Date: </strong>' + formatter.format(new Date(effectiveStart)) +
          '<br><strong> End Date: </strong>' + formatter.format(new Date(effectiveEnd)) +
          '<br><strong>' + features[i].properties.headline + '</strong>' +
          '<br><strong>Description: </strong>' + features[i].properties.description + '</p>'
        '</div></div></div></div>'
          ;
        document.getElementById("alertsCC").appendChild(display);
      }

    }
    console.log('Data fetched:', data);
    console.log(new Date(features[1].properties.parameters.eventEndingTime[0]));
    console.log(new Date());
    // Process the data here
  })
  .catch(error => {
    console.error('Fetch error:', error);
    // Handle errors here
  });