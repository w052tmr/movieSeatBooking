// GLOBAL VARIABLES
const movieList = document.getElementById('movieList');
const seatCountDisp = document.getElementById('seatCountDisp');
const totalCostDisp = document.getElementById('totalCostDisp');

const seatsContainer = document.querySelector('.container');
const seats = seatsContainer.querySelectorAll('.row .seat:not(.occupied)');

//FUNCTIONS

//updates display
const updateDisplay = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    seatCountDisp.textContent = selectedSeats.length;

    totalCostDisp.textContent = `$${+movieList.value * selectedSeats.length}`;

    storeData(selectedSeats);
};

const storeData = (selectedSeats) => {
    let selectedSeatsSet = new Set([...selectedSeats]);

    let selectedSeatsIndices = [];
    seats.forEach((seat, index) => {
        if (selectedSeatsSet.has(seat)) {
            selectedSeatsIndices.push(index);
        }
    });

    localStorage.setItem(
        'selectedSeatsIndices',
        JSON.stringify(selectedSeatsIndices)
    );

    localStorage.setItem('movieIndex', movieList.selectedIndex);
};

const populateUI = () => {
    const selectedSeatsIndices = new Set(
        JSON.parse(localStorage.getItem('selectedSeatsIndices'))
    );

    seats.forEach((seat, index) => {
        if (selectedSeatsIndices.has(index)) {
            seat.classList.toggle('selected');
        }
    });

    const movieIndex = localStorage.getItem('movieIndex');
    movieList.selectedIndex = movieIndex;
};

//EVENT LISTENERS

// changes seat color when clicked (selected)
seatsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat')) {
        e.target.classList.toggle('selected');
    }

    updateDisplay();
});

//updates display when movie is changed
movieList.addEventListener('change', (e) => {
    updateDisplay();
});

//Initialize

populateUI();
updateDisplay();
