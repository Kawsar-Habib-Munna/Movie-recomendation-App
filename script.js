document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const resultsContainer = document.getElementById('results-container');

    searchBtn.addEventListener('click', searchMovies);

    function searchMovies() {
        const searchTerm = searchInput.value.trim();

        if (searchTerm === '') {
            alert('Please enter a movie title.');
            return;
        }

        // Append the API key to the URL
        const apiKey = 'fdb787a4';
        const apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

        // fetch(apiUrl)
        //     .then(response => response.json())
            
        //     .then(data => {
        //         console.log(data); 
        //         displayResults(data.Search)
        //         }
        //         )
        //     .catch(error => console.error('Error fetching data:', error));
        fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data); // Print the JSON response to the console
        displayResults(data.Search);
    })
    .catch(function(error) {
        console.error('Error fetching data:', error);
    });


    }


    function displayResults(movies) {
        resultsContainer.innerHTML = '';

        if (!movies || movies.length === 0) {
            resultsContainer.innerHTML = '<p>No results found.</p>';
            return;
        }

        movies.forEach(movie => {
            const movieElement = createMovieElement(movie);
            resultsContainer.appendChild(movieElement);
        });
    }

    function createMovieElement(movie) {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        const title = document.createElement('h2');
        title.textContent = movie.Title;

        const year = document.createElement('p');
        year.textContent = `Year: ${movie.Year}`;

        const poster = document.createElement('img');
        poster.src = movie.Poster === 'N/A' ? 'no-poster.jpg' : movie.Poster;
        poster.alt = `${movie.Title} Poster`;

        movieElement.appendChild(title);
        movieElement.appendChild(year);
        movieElement.appendChild(poster);

        return movieElement;
    }
});
