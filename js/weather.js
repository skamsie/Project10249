getWeather();
setInterval(getWeather, 60000);

function getWeather() {
  $.simpleWeather({
    location: '',
    woeid: '20065566', //Berlin 10249
    unit: 'c',
    success: function(weather) {
      html = '<h2><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</h2>';
      html += '<ul><li>'+weather.currently+'</li>';
      html += '<li>Humidity: '+weather.humidity+' %</li>';
      html += '<li> Wind: '+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+'</li></ul>';
      html += '<li>Last Update: '+weather.updated+'</li>';

      $("#weather").html(html);
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}

$(function() {
 
    getStatus();
 
});
 
function getStatus() {
 
    $.getJSON('php/rf.php', function(data) {
        $('#inside-temperature').html(data.temperature);
        $('#inside-humidity').html(data.humidity);
        $('#localtime').html(data.localtime);
    });
    setTimeout("getStatus()",20000);
 
}

