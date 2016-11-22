$(document).ready(function(){
	//ophalen en weergeven van de opgeslagen data
	showLocalStorage();			

	//btn data saven
	$('.btn-save').on('click', function() {
		saveLocalStorage();
	})

	//btn data wissen
	$('.btn-clear').on('click', function() {
		clearLocalStorage();
	})
})

//
// SHOW
// 
function showLocalStorage(){
	//look in localstorage and get the data
	var storeddata = localStorage.getItem('saveddiv');		
	$('#saved').html(storeddata);

	$.each($('.dates').first(), function(){
		var day = $(this).attr('data-day-temp');
		var night = $(this).attr('data-night-temp');
		var min = $(this).attr('data-min-temp');
		var max = $(this).attr('data-max-temp');
		myWeatherChart(min, max, night, day);	
	})	
}

//
// SAVE
//
function saveLocalStorage (divtosave) {
	var oldForecasts = localStorage.getItem('saveddiv');
	var newForeCasts = $("#allcontent").html();
	var divtosave =  newForeCasts + oldForecasts;

	localStorage.setItem('saveddiv', divtosave);
	$('#saved').html(localStorage.getItem('saveddiv'));
}

//
// CLEAR
//
function clearLocalStorage (divtoremove) {
	localStorage.removeItem('saveddiv');
	localStorage.removeItem('currentWeather');
	$('#saved').html('');
}

//
// CHART
//
function myWeatherChart(min, max, night, day){
	// var ctx = document.getElementById('myWeatherChart').getContext("2d");

	var data = {
	    labels: ["max. temp", "day temp", "night temp", "min. temp"],
	    datasets: [
	        {
	          label: "My weather",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
	          data: [max, day, night, min],          
	        }
		    ]
	};

	var options = {}

	var ctx1 = $('#saved .dates .myWeatherChart').get(0).getContext("2d");

	var myLineChart = new Chart(ctx1).Line(data, options)
}