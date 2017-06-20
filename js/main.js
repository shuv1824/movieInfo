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
      console.log(response);
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w640/${movie.poster_path}">
              <h3>${movie.title}</h3>
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

  axios.get('https://api.themoviedb.org/3/search/movie/'+movieId+'?api_key=771c671cd8e98c6b1fa8bc36fc4ce71a')
    .then((response) => {
      console.log(response);
      let movies = response.data.results;
      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w640/${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">

          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
