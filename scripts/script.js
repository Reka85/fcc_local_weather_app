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
            $('#data').html('<p>Sorry, an error has occurred. Try again!</p>');
         },
         success: function(data) {
            const city = data['name'];
            const icon = data['weather'][0]['icon'];
            const description = data['weather'][0]['description'];
            const temperature = data['main']['temp'];
            const wind = data['wind']['speed'];
            $('#weather-icon').html(`<img src=${icon}/>`);
            $('#data').html(`
              <p>${city}</p>
              <p>${description}</p></br>
              <p id='temperature'> ${temperature} °C</p></br>
              <p>Wind: ${wind} km/h</p></br>`);
            GenerateBcg(data['weather'][0]['main']);
         }
      });
    });
  }
  $('#convert-temperature').click(function(){
    var temperature = $('#temperature').text();
    var match_num = new RegExp(/[0-9]+/);
    if (match_num.test(temperature)){
      if ( $(this).text() == "To fahrenheit" ) {
        var tempInFahrenheit = (parseInt(temperature.match(match_num)[0]) * (9/5) + 32).toFixed(1);
        $("#temperature").text(`${tempInFahrenheit} °F`);
        $(this).text("To celsius");
        }
      else if ($(this).text() == "To celsius"){
        var tempInCelsius = ((parseInt(temperature.match(match_num)[0]) - 32) / (9/5)).toFixed(1);
        $("#temperature").text(`${tempInCelsius} °C`);
        $(this).text("To fahrenheit");
      }
    }
  })

  function GenerateBcg(weather_type){
    switch(weather_type){
      case('Clouds'):
        var imgCode = "S7ChB4FBboI";
        $('body').css('color', "white");
        break;
      case('Thunderstorm'):
        var imgCode = "Cm5zI68Wdew";
        $('body').css('color', "white");
        break;
      case('Drizzle'):
        var imgCode = "f-X4hUILms0";
        break;
      case('Rain'):
        var imgCode = "8yt8kBuEqok";
        $('body').css('color', "white");
        break;
      case('Snow'):
        var imgCode = "yNaGxHqjOuw";
        break;
      case('Clear'):
        var imgCode = "W51VK3Obcj0";
        break;
      case('Extreme'):
        var imgCode = "8eFbe3jQZ7Y";
        $('body').css('color', "white");
        break;
      default:
        var imgCode = "pgGnvJF7p20";
    }
    $("body").css('background-image', `url(\"https://source.unsplash.com//${imgCode}/1600x900\")`);
  }
});

