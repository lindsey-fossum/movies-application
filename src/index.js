/**
 * es6 modules and imports
 */
import sayHello from './hello';
sayHello('World');

/**
 * require style imports
 */
const $ = require('jquery');
const {getMovies} = require('./api.js');


getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    console.log(`id#${id} - ${title} - rating: ${rating}`);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

$("#add-movie-btn").click("addMovies");
// document.getElementById("add-movie-btn").addEventListener("click", addMovies, false);

function addMovies () {

  console.log("It works!");
  let title = document.getElementById("title").value;
  let ratings = document.getElementById("ratings").value;

  console.log(title);
  console.log(ratings);

  const moviePost = {title: `${title}`, rating: `${ratings}`, id: ""};
  const url = '/api/movies';
  const options = {
    method: "POST",
    body: JSON.stringify(moviePost),
  }
}

// fetch(url, options)
//     .then(console.log("success"))
//     .catch(console.log("failure"));
//
// }






