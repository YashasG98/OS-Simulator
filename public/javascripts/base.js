$(document).ready(function () {

	// to load the time
	setInterval(function() {
		let time = new Date();
		let	hours = time.getHours();
		let	minutes = time.getMinutes();

		var dd = String(time.getDate()).padStart(2, '0');
		let mm = String(time.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = time.getFullYear();

		today = dd + '-' + mm + '-' + yyyy;

		if(minutes<10)
		{
			minutes = "0" + minutes;
		}

		if(hours>=12)
		{
			hours = hours-12;
			$('.start-bottom .date-time .am-pm').text('PM');
		}

		else
		{
			$('.start-bottom .date-time .am-pm').text('AM');
		}

		$('.start-bottom .date-time .time').text(hours + ':' + minutes);
		$('.start-bottom .date-time .date').text(today);
		console.log(hours + ' : ' + minutes);
		console.log('Date : ' + today);

	},1000);

});

// set initially the start button onClick as hidden
$("#start_menu").hide();

//toggle start Menu
function startmenu() {
	$('#start_menu').toggle(100);
}