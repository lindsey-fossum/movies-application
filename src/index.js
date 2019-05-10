/**
 * es6 modules and imports
 */
const $ = require('jquery');

const key = require('./keys');


/**
 * require style imports
 */
const {getMovies, movieInfo} = require('./api.js');

import sayHello from './hello';

sayHello('World');

var films;
getMovies().then((movies) => {
    let options;
    movies.forEach((element) => {
        options = `<option>${element.title}</option>`;
        $('#movie-to-edit').append(options)
        $('#movie-to-delete').append(options)
    })
    console.log('Here are all the movies:');
    movies.forEach(({title, rating, id}) => {

        omdbApi(title, id);
        console.log(`id#${id} - ${title} - rating: ${rating}`);
    })
    films = movies;

}).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);


});

$('#edit-movie-btn').on("click", editMovie);
/*$('#form-select-btn').click(updateForm);*/
$("#add-movie-btn").click(addMovies);
$('#delete-movie-btn').click(deleteFilmForm);

// document.getElementById("add-movie-btn").addEventListener("click", addMovies, false);

function addMovies() {
    console.log("It works!");
    let title = $('#title').val();
    let ratings = $('#ratings').val();
    let titlePlus = title.split(' ');
    titlePlus = titlePlus.join('+');
    console.log(titlePlus);
    alert(title);
    alert(ratings);
    /*fetch(`http://www.omdbapi.com/?apikey=e2d23a7a&t=${titlePlus}`).then(res =>{
     res.json()
    })
        .then(data => {
            console.log(data);
        }).catch(console.log('you have meddled with the primal forces of nature'))
*/

    const moviePost = {title: `${title}`, rating: `${ratings}`, id: ""};
    const url = '/api/movies';
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(moviePost),
    };
    fetch(url, options)
        .then(console.log(url), console.log(options))
        .catch(console.log("failure"));

    getMovies();
}

function updateForm() {
    let form = $('#update-options').val();
    if (form === 'edit') {
        makeEditForm()
    } else if (form === 'remove') {
        deleteFilmForm();
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
        // '        <button id="edit-movie-btn">Edit Movie Info</button>';

        $('#change-form').html(html);

    getMovies().then((movies) => {
        let options;
        movies.forEach((element) => {
            options = `<option>${element.title}</option>`;
            $('#movie-to-edit').append(options)
            $('#movies-to-delete').append(options)
        })
    });

}

function deleteFilmForm () {
    getMovies().then((elements) => {
        console.log(elements);
        let movieDeletion = $("#movie-to-delete").val();

        elements.forEach((element) => {
            if (element.title === movieDeletion) {
                // console.log(jsonMovieId);
                jsonMovieId = element.id;
                return fetchRequestThree(jsonMovieId);
            }
        });
    });
    function fetchRequestThree(jsonMovieId) {
        /*const moviePost = {title: `${newTitle}`, rating: `${newRating}`, id: ""};*/
        const url = `/api/movies/${jsonMovieId}`;
        const options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
            },
            /*body: JSON.stringify(moviePost),*/
        };
        fetch(url, options)
            .then(console.log(url), console.log(options))
            .catch(console.log("failure"), console.log(url), console.log(options));
    }
}

let jsonMovieId;

function editMovie() { //changes from makeEditForm() applied to JSON
    let newRating = $("#new-movie-ratings").val();
    let newTitle = $("#new-movie-title").val();
    let movieId = $("#movie-to-edit").val();

    console.log("Hello you have reached editMovie function please fuck off");
    console.log(movieId);

    getMovies().then((elements) => {
        console.log(elements);
        elements.forEach((element) => {
            if (element.title === movieId) {
                // console.log(jsonMovieId);
                jsonMovieId = element.id;
                return fetchRequestTwo(jsonMovieId);
            }
        })
    });

    function fetchRequestTwo(jsonMovieId) {
        const moviePost = {title: `${newTitle}`, rating: `${newRating}`, id: ""};
        const url = `/api/movies/${jsonMovieId}`;
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(moviePost),
        }
        fetch(url, options)
            .then(console.log(url), console.log(options))
            .catch(console.log("failure"), console.log(url), console.log(options));
    }
}
function renderFilms(data, id) {
    let html='';
    html += `<div class="card m-2 mx-auto" id="${id}" style="width: 18rem;" >`;
    html += `<img src="${data.Poster}" class="card-img-top" alt="...">`;
    html += `<div class="card-body">`;
    html += `<h5>${data.Title}</h5>`;
    html += `<p>${data.Plot}</p>`;
    html += `</div>`;
    html += `</div>`;
    $('.loader').css('display', 'none');
    console.log("FUCKING HTML " + html);
    $('#add-movie-content').append(html);
}

function omdbApi(title, id){

    let titlePlus = title.split(' ');
    titlePlus = titlePlus.join('+');
    console.log(titlePlus);

    fetch(`http://www.omdbapi.com/?apikey=e2d23a7a&t=${titlePlus}`).then(res => res.json()).then(data => {
        console.log(data);
        renderFilms(data, id)
    }).catch(err => console.log('you have meddled with the primal forces of nature'));


}


/*
movieInfo().then(data => console.log(data));*/

// HIDING SHIT

$(function () {
    $(".card-container").hide();
});
$("#logo-movie").on("click", function(e) {
    $(".card-container").toggle("slow", function() {

    });
});

$(function () {
    $("#movie-add").css('display', 'none');
});
$("#add-movie").on("click", function(e) {
    $("#movie-add").toggle("slow", function() {

    });
});

$(function () {
    $("#change-form").hide();
});
$("#edit-movie").on("click", function(e) {
    $("#change-form").toggle("slow", function() {

    });
});

$(function () {
    $("#delete-form").hide();
});
$("#delete-movie").on("click", function(e) {
    $("#delete-form").toggle("slow", function() {

    });
});

// $(document).ready(function () {
//     alert("CHEATER CHEATER");
// });

$(function () {
    $("#add-movie-btn").on("click", function() {
        location.reload(); //Change so we're not cheaters
    });
    $("#delete-movie-btn").on("click", function() {
        location.reload(); //Change so we're not cheaters
    });
});












