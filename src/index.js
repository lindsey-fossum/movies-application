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
function loadMovies() {
    getMovies().then((movies) => {
        let options='';
        movies.forEach((element) => {
            options += `<option>${element.title}</option>`;
           return options
        });
        $('#movie-to-edit').html(options);
        $('#movie-to-delete').html(options);
        console.log('Here are all the movies:');
        movies.forEach(({title, rating, id}) => {

            omdbApi(title, id, rating);
            console.log(`id#${id} - ${title} - rating: ${rating}`);
        });
        films = movies;

    }).catch((error) => {
        // alert('Oh no! Something went wrong.\nCheck the console for details.');
        console.log(error);


    });
}

$('#edit-movie-btn').on("click", editMovie);
/*$('#form-select-btn').click(updateForm);*/
$("#add-movie-btn").click(addMovies);
$('#delete-movie-btn').click(deleteFilmForm);



function addMovies() {
    console.log("It works!");
    let title = $('#title').val();
    let ratings = $('#ratings').val();
    let titlePlus = title.split(' ');
    titlePlus = titlePlus.join('+');
    console.log(titlePlus);


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
    $('.card').remove();
    $('.loader').css('display', 'block');
    loadMovies();
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
        let options = "";
        movies.forEach((element) => {
            options += `<option>${element.title}</option>`;
        })
        $('#movie-to-edit').html(options)
        $('#movies-to-delete').html(options)
    });

}

function deleteFilmForm () {

        let movieDeletion = $("#movie-to-delete").val();
        // alert('this is the movieDeletion ' + movieDeletion);
    getMovies().then((elements) => {
        console.log(elements);
        elements.forEach((element) => {
            if (element.title === movieDeletion) {
                // console.log(jsonMovieId);
                jsonMovieId = element.id;
                // alert('this is the movie to delete ' + jsonMovieId);
                 fetchRequestThree(jsonMovieId);
            }
        })
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
        $(`#${jsonMovieId}`).addClass('d-none');
        loadMovies();
        $('.loader').css('display', 'block');
        $('.card').remove();

    }
}

let jsonMovieId;

function editMovie() { //changes from makeEditForm() applied to JSON
    let newRating = $("#new-movie-ratings").val();
    let movieId = $("#movie-to-edit").val();

    console.log(movieId);

    getMovies().then((elements) => {
        console.log(elements);
        elements.forEach((element) => {
            if (element.title === movieId) {
                // console.log(jsonMovieId);
                jsonMovieId = element.id;
                console.log('this is the jsonmovieid' + jsonMovieId);
                 fetchRequestTwo(jsonMovieId, element.title);
            }
        });$('.card').remove();
        $('.loader').css('display', 'block');
        loadMovies();

    });

    function fetchRequestTwo(jsonMovieId, element) {
        const moviePost = {title: `${element}`, rating: `${newRating}`, id: ""};
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
function renderFilms(data, id, rating) {
    console.log(data);
    let html='';
    html += `<div class="card col-lg-3 col-md-3 col-sm-6 m-2 mx-2" id="${id}" style="width: 18rem;" >`;
    html += `<img src="${data.Poster}" class="card-img-top" alt="...">`;
    html += `<div class="card-body">`;
    html += `<h5>${data.Title}</h5>`;
    html += `<p>Genre: ${data.Genre}</p>`;
    html += `<hr>`
    html += `<p>${data.Plot}</p>`;
    html += `<p>User Rating: ${rating}/5</p>`;
    html += `</div>`;
    html += `</div>`;
    $('.loader').css('display', 'none');
    $('#add-movie-content').append(html);
}

function omdbApi(title, id, rating){

    let titlePlus = title.split(' ');
    titlePlus = titlePlus.join('+');
    console.log(titlePlus);

    fetch(`http://www.omdbapi.com/?apikey=e2d23a7a&t=${titlePlus}`).then(res => res.json()).then(data => {
        console.log(data);
        renderFilms(data, id, rating)
    }).catch(err => console.log('you have meddled with the primal forces of nature'));


}


$(function () {
    // $("#movie-add").css('display', 'none');
    $("#movie-add").hide();
});
$("#add-movie").on("click", function(e) {
    $("#movie-add").toggle("slow", function() {
    });
    $("#change-form").hide();
    $("#delete-form").hide();
});


//click 'Edit' to display edit form and HIDE 'Removie' and 'Add Movie'

$(function () {
    $("#change-form").hide();
});
$("#edit-movie").on("click", function(e) {
    $("#change-form").toggle("slow", function () {
    });
    $("#delete-form").hide();
    $("#movie-add").hide();
});


//click 'Removie' to show remove form and HIDE 'Add Movie' and 'Edit'

$(function () {
    $("#delete-form").hide();
});
$("#delete-movie").on("click", function(e) {
    $("#delete-form").toggle("slow", function() {
    });
    $("#change-form").hide();
    $("#movie-add").hide();
});


$(document).ready(function(){
   loadMovies();
});












