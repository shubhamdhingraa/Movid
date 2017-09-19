 $(document).ready(()=>{
$('#searchForm').on('submit',(e)=>{
let searchText=$('#searchText').val();
getMovies(searchText);
e.preventDefault();
});
});
//https://api.themoviedb.org/3/search/movie?query=wolf&api_key=2e633d8e558ca65e18c9c8c93aad4207
function getMovies(searchText)
{
  axios.get('https://api.themoviedb.org/3/search/movie?query='+searchText+'&api_key=2e633d8e558ca65e18c9c8c93aad4207')
  .then((response)=>{
      console.log(response);
      let movies=response.data.results;
      let output='';
      $.each(movies,(index,movie)=>{
        output +=`
        <div class="col-md-4">
        <div class="well text-center">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class=".img-fluid">
        <h5>${movie.title}</h5>
        <ul class="list-group">

        <li class="list-group-item"><stong>Genre : </strong>${movie.overview}</li>
        <li class="list-group-item"><stong>Released : </strong>${movie.release_date}</li>

        <li class="list-group-item"><stong>Popularity : </strong>${movie.popularity}</li>

        </ul>
        <a class="btn btn-primary" target="_blank" href="https://www.themoviedb.org/search?query=${movie.title}">More Info.</a>

        </div>
        </div>
        `;
      });

      $('#movies').html(output);
  })

  .catch((err)=>{
    console.log(err);
  });
}

function movieSelected(id)
{
  sessionStorage.setItem('movieId',id);
  window.location='movie.html';
  return false;
}

function getMovie()
{
  let movieId=sessionStorage.getItem('movieId');
  axios.get('https://api.themoviedb.org/3/search/movie?query='+movieId+'&api_key=2e633d8e558ca65e18c9c8c93aad4207')
  .then((response)=>{
      console.log(response);
      let movie=response.data;
      let output=`
        <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail">
            </div>
        <div class="col-md-8"><h2>${movie.title}</h2>
          <ul class="list-group">

          <li class="list-group-item"><stong>Genre:</strong>${movie.Genre}</li>
          <li class="list-group-item"><stong>Released:</strong>${movie.Released}</li>

          <li class="list-group-item"><stong>IMDB:</strong>${movie.imdbRating}</li>
          <li class="list-group-item"><stong>Director:</strong>${movie.Director}</li>
          <li class="list-group-item"><stong>Writer:</strong>${movie.Writer}</li>
          <li class="list-group-item"><stong>Actors:</strong>${movie.Actors}</li>
          <li class="list-group-item"><stong>Year:</strong>${movie.Year}</li>
          </ul>
        </div>
        </div>
          <div class="row">
          <div class="well">
          <h3>Plot</h3>
          ${movie.Plot}
          <br>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
          <a href="index.html" class="btn btn-default">Search another Movie</a>
      `;

      $('#movie').html(output);
  })

  .catch((err)=>{
    console.log(err);
  });
}
