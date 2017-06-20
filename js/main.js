$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let saerchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('');
}
