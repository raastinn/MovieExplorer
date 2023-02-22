

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function importMovies() {
  $(".showAllMovies").html("");
  let baseURL = "https://api.themoviedb.org/3/search/multi?api_key=";
  let key = "a81ec4ce1aadcaa531191563db5a40f6";
  let title = "&query=" + $("#movieInput").val();
  let url = baseURL + key + title;
  $.get(url, function(data) {
    // $("#raw").html(JSON.stringify(data));
    for (let i = 0; i < data.results.length; i++) {
      if (data.results[i].poster_path != null) {
        showAllMovies(data, i);
      }
    }
  });
  $("#desc").html("");
  $(".container").html("");
  $(".error").html("");
  $(".sim").html("");
  $(".displaySimilar").html("");
}

function showAllMovies(data, i) {
  let title = data.results[i].original_title;
  let year = data.results[i].release_date;
  let poster_path = data.results[i].poster_path;
  let id = data.results[i].id;
  let img = "https://image.tmdb.org/t/p/original" + poster_path;
  let html = "<a onclick='displayMovie(\""+ title + "\", \""+ img + "\", \""+ id + "\"); topFunction();'><img src='" + img + "'></a>";
	$(".showAllMovies").append(html);
}

function displayMovie(title, img, id) {
  $(".showAllMovies").html("");
	let baseURL = "https://www.omdbapi.com/?";
	let key = "apikey=" + "fcec8b60";
	let theTitle = "&t=" + title;
	let url = baseURL + key + theTitle;

	$.get(url, function(data) {
		// $("#raw").html(JSON.stringify(data));
		analyze(data, img, id);
	});
  displaySimilar(id);
  $(".sim").css('display', 'flex');
  $(".container").css('display', 'block');
  $(".displaySimilar").css('display', 'flex');
  $("#desc").html("");
  $(".container").html("");
  $(".error").html("");
	$(".sim").html("");
	$(".displaySimilar").html("");
}

function analyze(data, img) {
	let title = data.Title;
	let genre = data.Genre;
	let duration = data.Runtime;
	let director = data.Director;
	let cast = data.Actors;
	let summary = data.Plot;
	let year = data.Year;
	let rated = data.Rated;
	let released = data.Released
	let response = data.Response;

	if (response != "False") {
		let html = "<p><img src='" + img + "'>";
		html += "<h2>" + title + "</h2>";
		html += duration + " | " + year + " | " + rated + "<br>";
		html += "<br>Cast: " + cast;
		html += "<br>Director: " + director;
		html += "<br>Released: " + released;
		html += "<br>"+genre;
		html += "<br><br><a id='summary'>" + summary + "</a></p>";
		$(".container").append(html);
    $(".sim").html("<h2>Similar movies</h2>");
	} else {
		  $(".error").html("Movie not found. Please search again.");
			$(".sim").css('display', 'none');
		  $(".container").css('display', 'none');
		  $(".displaySimilar").css('display', 'none');
	}
}

function displaySimilar(id) {
  let baseURL = "https://api.themoviedb.org/3/movie/" + id + "/similar?api_key=";
	let key = "a81ec4ce1aadcaa531191563db5a40f6";
	let rest = "&language=en-US&page=1";
	let url = baseURL + key + rest;
  $.get(url, function(data) {
		// $("#raw").html(JSON.stringify(data));
    if (data.results.length <= 12) {
      for (let i = 0; i < data.results.length; i++) {
        similarMovies(data, i);
      }
    } else {
      for (let i = 0; i < 12; i++) {
        similarMovies(data, i);
      }
    }
	});
}


function similarMovies(data, i) {
  let title = data.results[i].original_title;
  let year = data.results[i].release_date;
  let poster_path = data.results[i].poster_path;
  let id = data.results[i].id;
  let img = "https://image.tmdb.org/t/p/original" + poster_path;
  let html = "<a onclick='displayMovie(\""+ title + "\", \""+ img + "\", \""+ id + "\"); topFunction();'><img src='" + img + "'></a>";
	$(".displaySimilar").append(html);
}
