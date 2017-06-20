$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('https://api.themoviedb.org/3/search/movie?api_key=771c671cd8e98c6b1fa8bc36fc4ce71a&query='+searchText)
    .then((response) => {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w640/${movie.poster_path}">
              <p><strong>${movie.title}</strong></p>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary btn-xs">Movie Details</a>
            </div>
          </div>
        `
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('https://api.themoviedb.org/3/movie/'+movieId+'?api_key=771c671cd8e98c6b1fa8bc36fc4ce71a')
    .then((response) => {
      let movie = response.data;
      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w640/${movie.poster_path}" class="thumbnail" style="margin-top:40px">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Tagline: </strong>${movie.tagline}</li>
              <li class="list-group-item"><strong>Release Date: </strong>${movie.release_date}</li>
              <li class="list-group-item"><strong>Language: </strong>${movie.original_language}</li>
              <li class="list-group-item"><strong>Rating: </strong>${movie.vote_average}</li>
            </ul>
            <div class="jumbotron">
              <h3>Overview</h3>
              <p>${movie.overview}</p>
              <a href="http://www.imdb.com/title/${movie.imdb_id}" target=_blank class="btn btn-success">View on IMDb</a>
            </div>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
