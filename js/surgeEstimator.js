// Surge Estimation functions

// Global variable declarations


// TO DO: MAKE SURE TIME ZONES DON'T MESS UP SAN FRANCISCO WEATHER REQUESTS
function updateWeather(date, time, city, rideType) {
	// get longitude and latitude for querying weather
	var latlon = {"Atlanta": [33.7488933,-84.3903931], "Boston": [42.3605229,-71.0579748], "New York": [40.7127744,-74.006059], "San Francisco": [37.779272,-122.4193494], "Washington DC": [38.8899389,-77.0090505]};
	var lat = latlon[city][0];
	var lon = latlon[city][1];

  	if (city.localeCompare("San Francisco")===0) {
  		console.log("dope");
  	};

	// Calculate index based on time input
 	var hourBlock = roundHourBlock(date, time);
 	var day = new Date(date).getDay();

 	console.log(hourBlock);



 	//call weather data from Weather Underground API and update display divs
 	// Summer key: 1b29e9b48c40d837
 	// Dillon key: 51192aa9f8ab44fb
	var w_url = "http://api.wunderground.com/api/51192aa9f8ab44fb/hourly10day/q/"+String(lat)+","+String(lat)+".json";
	$.getJSON(w_url, function(json) {
			console.log(json);
			changeText("selectedTemp", json.hourly_forecast[hourBlock].temp.english + "°F");
			changeText("selectedWeather", json.hourly_forecast[hourBlock].condition);
			predictSurge(rideType, city, json.hourly_forecast[hourBlock].temp.english, day, time, json.hourly_forecast[hourBlock].condition);
	});
}

// Function called when use submits selections
function submitChanges() {
	// when selections change, get values for weather calculations
	var date = document.getElementById("datepicker").value;
	var time = document.getElementById("timepicker").value;
	var city = document.getElementById("nowCity").value;
	var rideType = document.getElementById("rideType").value;

	// changes global temp and weather variables
	updateWeather(date, time, city, rideType);

	// update other display text
	changeText("selectedCity", city);
	changeText("selectedDate", date);
	changeText("selectedTime", time);
}

function predictSurge(rideType, city, temp, day, time, weather) {
	var modelURL = "http://52.34.28.96:5000/ride="+String(rideType)+"&city="+String(city)+"&temp="+String(temp)+"&day="+String(day)+"&time="+String(time)+"&weather="+String(weather);
	console.log(modelURL);

	// make $.getJSON() call to AWS to return prediction in json format
	$.getJSON(modelURL, function(json) {
		console.log("hey");
		getSurge(json);
		/*changeText("noSurge", json["No Surge"]);
		changeText("highSurge", json["High Surge"]);
		changeText("lowSurge", json[""]);
		changeText("midSurge", json[3]);*/
		
  	});
}

// To update innerHTML of certain display
function changeText(id, text) {
	var element = document.getElementById(id);
	element.innerHTML = text;
}

function getSurge(json) {
	var ids = ["noSurge", "highSurge", "lowSurge", "midSurge"];
	var c = 0;
	for (i in json) {
		changeText(ids[c], String((Math.round(json[i]*1000)/10)).concat("%"));
		c+=1;
	}
}

// For 5-day forecasts, 3-hour blocks
function roundHourBlock(d, t) {
	var hb;
	var now = new Date().getTime();
 	console.log(d, t);

 	var dt = d.concat(" "+t);
 	dt = new Date(dt);
 	var diff = new Date(dt - now);

 	// convert to hours difference for indexing into weather forecast data
 	var hb = (diff - diff%3600000)/3600000;
 	console.log(hb);

 	if (diff <= 0) {
		alert("Please enter a future date and time");
 	} else if (hb > 239) {
		alert("Please select a time within the next 240 hours so we can factor in weather forecasts");
 	} else {
 		return hb;
 	};
}
