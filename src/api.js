const key = require('./keys');


module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },

  movieInfo: () => {
    return fetch(`http://www.omdbapi.com/?apikey=e2d23a7a&t=Star+Wars`).then(res => res.json())
  }
};



