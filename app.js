var titles = ["Thor", "Iron Man", "Spiderman", " Hulk"];
var buttonMaker = function() {
	for (var i = 0; i < titles.length; i++) {
		var plusTitles = titles[i].split(' ').join('+');
		var button = $('<button data-movie=' + plusTitles + '>').append(titles[i]);
		button.addClass('button');
		$('#movieButtons').append(button);
	}
	$('#addMovie').on('click', function() {
		$('#movieButtons').empty();
		var newTitle = $('#movie-input').val();
		for (i = 0; i < titles.length; i++) {
			if (newTitle == titles[i]) {
				titles.pop(newTitle);
			}
		}
		titles.push(newTitle);
		buttonMaker();
	});
	$('.button').on('click', function() {
		var movie = $(this).data('movie');
		console.log($(this).data('movie'));
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=dc6zaTOxFJmzC&limit=10";
		$.ajax({
			url: queryURL,
			method: 'GET'
		}).done(function(response) {
			console.log(response);
			var results = response.data;
			$('#movies').empty();
			for (var i = 0; i < results.length; i++) {
				var movieDiv = $('<div>');
				var p = $('<p>');
				var rating = results[i].rating.toUpperCase();
				if (rating == '') {
					p.text("Not rated");
				} else {
					p.text("Rated " + rating);
				}
				var movieImage = $('<img>');
				movieImage.attr("src", results[i].images.fixed_height_small_still.url);
				movieImage.attr("data-still", results[i].images.fixed_height_small_still.url);
				movieImage.attr("data-active", results[i].images.fixed_height_small.url);
				movieDiv.append(p);
				movieDiv.append(movieImage);
				$('#movies').prepend(movieDiv);
			}
			$('img').on('click', function(e) {
				console.log(e);
				var current = e.currentTarget.dataset.still;
				var active = e.currentTarget.dataset.active;
				var still = e.currentTarget.dataset.still;
				if (current == still) {
					$(this).attr('src', active);
					current = active;
				} else {
					$(this).attr('src', still);
					current = still;
				}
			})
		})
	});
};
buttonMaker();