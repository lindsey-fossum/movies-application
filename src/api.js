module.exports = {
  getMovies: () => {
    return fetch('/api/movies')
      .then(response => response.json());
  },
  movieInfo: () => {
    return fetch(`http://www.omdbapi.com/?apikey=e2d23a7a&t=${titlePlus}`).then(res => res.json()).then(data => {
      console.log(data);
    })
  }
};





