 //STEP 1: check input
 //STEP 2: GET data with AJAX
 //STEP 3: FETCH callback
 //STEP 4: INITIALIZE the google map

 /*
 * VARIABLES
 -------------------------------------------- */
	var openWeatherAppId = '4693635bcdfc77e55e9447b307358caf',
	openWeatherUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily'
//http://api.openweathermap.org/data/2.5/forecast/daily?q=Brussels&mode=json&units=metric&cnt=7&appid=4693635bcdfc77e55e9447b307358caf
	//check if inputfield is not empty
	var prepareData = function() {
		var cityName = $('#city-name').val()
		if (cityName != ''){
			cityName = cityName.trim() //removing spaties
			getData(cityName)
		}
		else {
			alert('Please enter the city name')
		}
	}

 /*
  * INIT MAP ON WINDOW LOAD
 -------------------------------------------- */
	window.onload = function () {
	    initMap();
	}

/*
 * FUNCTIONS
 -------------------------------------------- */
	 $(document).ready(function(){
	 	$('.btn-confirm').click(function() {
	 		prepareData();

	 	})
	 })

//GET DATA
	function getData (cityName) {
		$.ajax({
			type: "GET",
			url: openWeatherUrl + '?q='+ cityName + '&units=metric&cnt=' + 4 + '&appid=' + openWeatherAppId,
			dataType: "jsonp",
			jsonpCallback: "fetchData"
		}).fail(function(error){
			alert('We were not able to fetch your data')
		})
}

//FETCHED DATA
function fetchData (forecast) {
	var content = '', //now empty but it will be filled
			cityName = forecast.city.name,
			country = forecast.city.country,
			coords = new google.maps.LatLng(forecast.city.coord.lat, forecast.city.coord.lon)

	var moustacheWeatherTemplate 		= '<h3> Weather forecast for {{name}}, {{country}} </h3>';
	content += Mustache.render(moustacheWeatherTemplate, forecast.city);

	
	forecast.list.forEach(function(forecastEntry, index, list){
			weatherIcon = forecastEntry.weather[0].icon,
			max = forecastEntry.temp.max,
			min = forecastEntry.temp.min,
			night = forecastEntry.temp.night,
			day = forecastEntry.temp.day

			console.log(max, min, night, day)

	//Moustache.js templates
	var moustacheWeatherTemplate2a 	= '<span><img src="images/{{icon}}.svg"/></span>' +
																		'<span class="date-description"><p>{{description}}</p></span>';
	var moustacheWeatherTemplate2b 	=  "" +
																	 	'<span class="date-daytemp"><p> Day temp: {{day}} &degC </p></span>' +
																	 	'<span class="date-daymin"><p> Day min: {{min}} &degC </p></span>' +
																	 	'<span class="date-daymax"><p> Day max: {{max}} &degC </p></span>'	+
																	 	'<span class="date-daynight"><p> Night temp: {{night}} &degC </p></span>';
	
	//GENERATE THE HTML CONTENT
		content += ' <div class="dates date'+ index + '" data-day-temp="' + day + '" data-min-temp="' + min + '" data-night-temp="' + night +  '" data-max-temp="' + max + '">'
			content += '<canvas class="myWeatherChart" width="400" height="400"></canvas>';
			content += '<div class="myWeatherChart-content"'+ Mustache.render(moustacheWeatherTemplate2a, forecastEntry.weather[0]);
			content += '<span class="date-date"><p>' + convertTimestamp(forecastEntry.dt) + '</p></span>';
			content += Mustache.render(moustacheWeatherTemplate2b, forecastEntry.temp);
			// content += myWeatherChart(forecastEntry.temp.min, forecastEntry.temp.max, forecastEntry.temp.night, forecastEntry.temp.day);
		content += ' </div></div>'
	});

	console.log('testa');

	//plot image and on specific coordinates
	initMap(coords, weatherIcon);

	$('#log').html(content) //bind generated content to the empty var


}

//GOOGLE MAP
function initMap(coords, weatherIcon) {
	map = new google.maps.Map(document.getElementById('map'), {
		center: coords,
		zoom: 15
	});

	//options for the map
	if(coords){
			var mapOptions = {
				zoom: 12,
				center: coords,
				scrollwheel: false,
				mapTypeControl: false,
				navigationControlOptions: {
					style: google.maps.NavigationControlStyle.SMALL
				},
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				
				styles : [{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"color":"#737373"},{"weight":"0.01"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":"97"},{"color":"#ffffff"},{"visibility":"simplified"},{"lightness":"81"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"saturation":"100"},{"lightness":"100"},{"gamma":"10.00"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":"100"},{"lightness":"100"},{"gamma":"10.00"},{"weight":"0.01"}]},{"featureType":"poi.attraction","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.business","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.government","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.medical","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"saturation":"100"},{"lightness":"100"},{"gamma":"10.00"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.school","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.sports_complex","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-70"},{"lightness":"43"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#39d2ca"}]}]
			};
		}else{
			var mapOptions = {
				zoom: 4,
				center: new google.maps.LatLng(50,4),
				scrollwheel: false,
				mapTypeControl: false,
				navigationControlOptions: {
					style: google.maps.NavigationControlStyle.SMALL
				},
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				styles : [{"featureType":"administrative.country","elementType":"labels.text","stylers":[{"color":"#737373"},{"weight":"0.01"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":"97"},{"color":"#ffffff"},{"visibility":"simplified"},{"lightness":"81"}]},{"featureType":"landscape.natural.landcover","elementType":"all","stylers":[{"saturation":"100"},{"lightness":"100"},{"gamma":"10.00"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":"100"},{"lightness":"100"},{"gamma":"10.00"},{"weight":"0.01"}]},{"featureType":"poi.attraction","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.business","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.government","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.medical","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"saturation":"100"},{"lightness":"100"},{"gamma":"10.00"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.place_of_worship","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.school","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"poi.sports_complex","elementType":"labels.text.fill","stylers":[{"color":"#565656"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-70"},{"lightness":"43"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#39d2ca"}]}]

			};
		}


	//define the marker
	var marker = new google.maps.Marker({
		position: coords,
		center: coords,
		visible: true,
		icon: 'images/map/'+ weatherIcon + '.png',
		title:'This is where you are now',
		animation: google.maps.Animation.DROP
	});


	//Bind the mapoptions to the ID
	var GoogleCustomMap = new google.maps.Map(document.getElementById('map'),	mapOptions);
	
	//Show the marker on the map
	marker.setMap(GoogleCustomMap);
}


function convertTimestamp(timestamp) {
  var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
  yyyy = d.getFullYear(),
			mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
			dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
			time;
			time = dd + ' / ' + mm + ' / ' + yyyy ;	
			return time;
}




