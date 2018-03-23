$(document).ready(function(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      $.ajax({
         url: `https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`,
         type: 'GET',
         dataType: 'jsonp',
         data: {
            format: 'json'
         },
         error: function() {
            $('#data').html('<p>An error has occurred</p>');
         },
         success: function(data) {
            const description = data['weather'][0]['description'];
            const temperature = data['main']['temp'];
            const wind = data['wind']['speed'];
            const city = data['name'];
            const icon = data['weather'][0]['icon']
            $('#data').html(`<p>${description}</p></br>
              <p>${temperature} °C</p></br>
              <p>${wind} km/h</p></br>
              <p>City: ${city}</p>`)
            $('#weather-icon').html(`<img src=${icon}/>`)
         }
      });
    });
  }
});
