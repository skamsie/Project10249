function getWeather() {
  $.simpleWeather({
    location: 'Berlin, BE, Germany',
    woeid: '', //Berlin 10249
    unit: 'c',
    success: function(weather) {
      var fixedLocation = weather.city+', '+weather.region+', '+weather.country;
      html = '<h2><i class="icon-' + weather.code + '"></i> ' + weather.temp + '&deg;' + weather.units.temp + '</h2>';
      html += '<ul><li>'+weather.currently+'</li>';
      html += '<li>Humidity: ' + weather.humidity + ' %</li>';
      html += '<li> Wind: ' + weather.wind.direction + ' '+ weather.wind.speed + ' ' + weather.units.speed + '</li></ul>';
      html += '<li>Last Update: ' + weather.updated + '</li>';

      $("#weather").html(html);
      $("#fixed-location").html(fixedLocation);
    },
    error: function(error) {
      $("#weather").html('<p>' + error + '</p>');
    }
  });
}

function getStatus() {
  $.getJSON('php/rf.php', function(data) {
    $('#inside-temperature').html(data.temperature);
    $('#inside-humidity').html(data.humidity);
    $('#localtime').html(data.localtime);
  });
}

$(document).ready(function() {
  
  var inputLocation = '';
  var UNITS = 'c';
  
  $("#units-button").click(function () {
    $(this).text(function(i, v){
      return v == '°C' ? '°F' : '°C';
    });
    if (UNITS == 'c') {
      UNITS = 'f';
    } else {
      UNITS = 'c';
    }
    $(this).toggleClass('colored-button');
  });

  $('#submit-location').click(function() {
    var locationData = '';
    var separator = '';
    inputLocation = $('#input-location').val(),
    $.simpleWeather({
      location: inputLocation,
      woeid: '', //Berlin 10249
      unit: UNITS,
      success: function(weather) {
        html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';

        if (weather.region != '') {
          separator = ', ';
        };
        
        locationData = '<span id=weather-city>'+weather.city+'</span>'+separator+weather.region+', '+weather.country;
        
        $(".weather-items").children().show();
        $("#custom-weather").html(html);
        $("#location-data").html(locationData);
        $("#weather-items-hr").show();
        $("#current-condition").html('Current condition: ' + weather.currently + ' ' + weather.temp + '&deg;' + weather.units.temp);
        $("#humidity").html('Humidity: ' + weather.humidity + ' %');
        $("#wind").html('<span class=small-icon>,</span> '+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed);
        $("#day-low-high").html("Today's forecast: <span class=low>&darr;</span> " + weather.low + '&deg;' + " <span class=high>&uarr;</span> " + weather.high + '&deg;');
        $("#tomorrow").html('Tomorrow: ' + weather.forecast[1].text + '  <span class=low>&darr;</span> ' + weather.forecast[1].low + '&deg;' + ' <span class=high>&uarr;</span> ' + weather.forecast[1].high + '&deg;')
        $("#sun").html('Sun: <span class=small-icon>7</span> ' + weather.sunrise + ' <span class=small-icon>8</span> ' + weather.sunset)
        $("#last-update").html('Last Update: '+weather.updated);
      },
      
      error: function(error) {
        $("#custom-weather").html("<p id=error>" +error.message+ "</p>");
        $(".weather-items").children().hide();
        $("#weather-items-hr").hide();
      }
    });
  });
});

getWeather();
getStatus();
setInterval(getWeather, 60000);
setInterval(getStatus, 60000);