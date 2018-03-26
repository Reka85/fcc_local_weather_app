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
            $('#data').html(`
              <p>Type of weather: ${description}</p></br>
              <p id='temperature'> ${temperature} °C</p></br>
              <p>Wind speed: ${wind} km/h</p></br>
              <p>City: ${city}</p>`)
            $('#weather-icon').html(`<img src=${icon}/>`)
         }
      });
    });
  }
  $('#convert-temperature').click(function(){
    if ( $(this).text() == "To fahrenheit" ) {
      var celsius = $('#temperature').text();
      var temp = new RegExp(/[0-9]+/);
      if (temp.test(celsius)){
        var tempInFahrenheit = (parseInt(celsius.match(temp)[0]) * (9/5) + 32).toFixed(2);
        $("#temperature").text(`${tempInFahrenheit} °F`);
        $(this).text("To celsius");
      }
    }
    else if ($(this).text() == "To celsius"){
      var fahrenheit = $('#temperature').text();
      var temp = new RegExp(/[0-9]+/);
      if (temp.test(fahrenheit)){
        var tempInCelsius = ((parseInt(fahrenheit.match(temp)[0]) - 32) / (9/5)).toFixed(2);
        $("#temperature").text(`${tempInCelsius} °C`);
        $(this).text("To fahrenheit");
      }
    }
  })
});

