/**
 * es6 modules and imports
 */
const $ = require('jquery');

/**
 * require style imports
 */
const {getMovies} = require('./api.js');

import sayHello from './hello';
sayHello('World');

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

$('#edit-movie-btn').on("click", editMovie);
$('#form-select').click(updateForm);
$("#add-movie-btn").click(addMovies);
// document.getElementById("add-movie-btn").addEventListener("click", addMovies, false);

function addMovies () {
  console.log("It works!");
  let title = $('#title').val();
  let ratings = $('#ratings').val();

  alert(title);
  alert(ratings);

  const moviePost = {title: `${title}`, rating: `${ratings}`, id: ""};
  const url = '/api/movies';
  const options = {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(moviePost),
  }
fetch(url, options)
    .then(console.log(url), console.log(options))
    .catch(console.log("failure"));
}

function updateForm(){
  let form = $('#hoobajooba').val();
  if (form === 'edit'){
    makeEditForm()
  }
}

// const editMovieInfo = () => {
//
//   $('#new-movie-title').attr("placeholder", $("#movie-to-edit").val());
//
//
// };

function makeEditForm() {
  let html = '<label for="movie-to-edit">Choose a Movie</label>\n' +
      '        <select name="movies" id="movie-to-edit">\n' +
      '        </select>\n' +
      '        <lable for="new-movie-title">New Movie Title</lable>\n' +
      '        <input id="new-movie-title" type="text">\n' +
      '\n' +
      '\n' +
      '        <label for="new-movie-ratings">Enter Movie Rating: </label>\n' +
      '            <select id="new-movie-ratings">\n' +
      '                <option value="1">1</option>\n' +
      '                <option value="2">2</option>\n' +
      '                <option value="3">3</option>\n' +
      '                <option value="4">4</option>\n' +
      '                <option value="5">5</option>\n' +
      '            </select>\n' +
      '        <button id="edit-movie-btn">Edit Movie Info</button>';

  $('#change-form').html(html);

  getMovies().then((movies) => {
    let options;
    movies.forEach((element) => {
      options = `<option>${element.title}</option>`;
          $('#movie-to-edit').append(options)
    })
  });

}

function editMovie() { //changes from makeEditForm() applied to JSON
  console.log("Hello you have reached editMovie function please fuckk off");
  let movieId = $("#new-movie-title").val();
  getMovies().then((elements) => {
    movies.forEach((element) => {
      if (element.title === movieId) {
        console.log(element);
      }
    })
  })
  // movies[2].title = "Don't Be A Mess...";
  const moviePost = {title: `${title}`, rating: `${ratings}`, id: ""};
  const url = '/api/movies';
  const options = {
    method: "PUT",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(moviePost),
  }
  fetch(url, options)
      .then(console.log(url), console.log(options))
      .catch(console.log("failure"));
}







