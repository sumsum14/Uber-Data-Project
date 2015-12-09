// Surge
var date;
var time;
var city;

// TO DO: MAKE SURE TIME ZONES DON'T MESS UP SAN FRANCISCO WEATHER REQUESTS
function getWeather() {

	date = document.getElementById("datepicker").value;
	time = document.getElementById("timepicker").value;
	city = document.getElementById("nowCity").value;
	var latlon = {"Atlanta": [33.7488933,-84.3903931], "Boston": [42.3605229,-71.0579748], "New York": [40.7127744,-74.006059], "San Francisco": [37.779272,-122.4193494], "Washington DC": [38.8899389,-77.0090505]};
	var lat = latlon[city][0];
	var lon = latlon[city][1];

  	date = date.replace("/", "-").replace("/", "-");
  	time = time.concat(":00");
  	datetime = date.concat(" "+time);

  	// convert time to nearest three hour block

  	// calculate difference to see which forecast to call
	var x = roundHourBlock(datetime);
	var n = new Date().getTime();
	n = roundDay(n);

	var difference = Math.abs(x - n);

 	// forcasting conditions call 5 day
  	if (difference <= 432000000) {
  		var hourBlock = (difference - difference%10800000)/10800000 + 1;
  		//console.log("within 5  - hourBlock:", hourBlock); 
  		var url = "http://api.openweathermap.org/data/2.5/forecast?lat="+String(lat)+"&lon="+String(lon)+"&APPID=25f78cc77890be12d72bd825dcbdcd37&callback=?";
	  	$.getJSON(url, function(json) {
	  		var main = json.list[hourBlock].weather[0].main;
	  		var temp = json.list[hourBlock].main.temp;
	  		temp = temp * 9 / 5  - 459.67;
	  		temp = String(Math.round(temp)).concat("°F");
	  		console.log(temp);
	  		var title = "Weather in ";
	  		title = title.concat(city);
	  		var d = new Date(datetime);
	  		// Change weather lables
	  		changeText("selectedCity", title);
	  		changeText("selectedDate", d);
	  		changeText("selectedTemp", temp);
	  		changeText("selectedWeather", main);

	  		console.log(json.list[hourBlock]);
  		});
  	} else if (difference <= 1382000000) {
  		var day = (difference - difference%86400000)/86400000 + 1;
  		var url = "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=16&lat="+String(lat)+"&lon="+String(lon)+"&APPID=25f78cc77890be12d72bd825dcbdcd37&callback=?";

  		$.getJSON(url, function(json) {
  			weather.innerHTML = json.list[day];
	  		console.log(json.list[day]);
  		});
  	};  	
}

// Function called when selection changes occur
function onChange() {
	getWeather();
}

// To update innerHTML of certain display
function changeText(id, text) {
	var element = document.getElementById(id);
	element.innerHTML = text;
}

// For 5-day forecasts, 3-hour blocks
function roundHourBlock(d) {
	hb = new Date(d).getHours();
	hb = hb - hb%3;

	nd = new Date(d).setHours(hb);
	nd = new Date(nd).setMinutes(00);
	return nd;
}

// for 16-day forecasts, 1-day blocks
function roundDay(d) {
	day = new Date(d).getDate();
	day = day+1;
	console.log(day);
	nd = new Date(d).setHours(00);
	nd = new Date(nd).setMinutes(00);
	nd = new Date(nd).setSeconds(00);
	nd = new Date(nd).setDate(day);
	return nd;
}