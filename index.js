//This will fetch data from th json file.
fetch('db.json')
.then(response => response.json())
.then(data => {
    const movieTitle = document.getElementById('movietitle');
    const moviePoster = document.getElementById('movieposter');
    const runtime = document.getElementById('runtime');
    const showtime = document.getElementById('showtime');
    const availableTickets = document.getElementById('availabletickets');
    const movieSynopsis = document.getElementById('moviesynopsis');
    const buyTicketBtn = document.getElementById('buyticketBtn');


    function updateMovieDescription(movie) {
        movieTitle.textContent = movie.title;
        moviePoster.src = movie.poster;
        runtime.textContent = movie.runtime;
        showtime.textContent = movie.showtime;
        availableTickets.textContent = movie.capacity - movie.tickets_sold;
        movieSynopsis.textContent = movie.description;

        buyTicketBtn.disabled = movie.capacity <= movie.tickets_sold;
        
    }

    function createMovieListItem(movie) {
        const listItem = document.createElement('li');
        listItem.textContent = movie.title;
        listItem.addEventListener('click', () => {
            updateMovieDescription(movie);
        });
        return listItem;
        
    }

    function buyTicket(){
      const selectedMovie =data.films.find(movie => movie.title === movieTitle.textContent);
      if(selectedMovie){
        if(selectedMovie.tickets_sold < selectedMovie.capacity){
          selectedMovie.tickets_sold++;
          updateMovieDescription(selectedMovie);
          alert('Ticket purchase successful!');
        } else {
          alert('Sorry, All the tickets have been sold out.');
        }
    }
}

    buyTicketBtn.addEventListener('click', buyTicket);

    const filmsList = document.getElementById('Filmslist');

    data.films.forEach(movie => {
      const listItem = createMovieListItem(movie);
      filmsList.appendChild(listItem);
    });

    updateMovieDescription(data.films[0]);
})
  .catch(error => console.error(error));
