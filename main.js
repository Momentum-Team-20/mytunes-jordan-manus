let search = document.querySelector('.searchButton');
let userInput = document.querySelector('.userInput');
let searchResults = document.querySelector('.searchResults');

//  get this to reset page between each search
function reset() {
    searchResults.innerHTML = "";
    return searchResults;
}


search.addEventListener('click', (event) => {
    // userInput.addEventListener('submit', (event) => {
    // searchResults.reset();
    event.preventDefault();
    console.log(`this is user input: ${userInput.value}`);
    let url = urlBuilder(userInput.value);
    fetch(url)
        .then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data)
            let song = data.results[0];
            let songDiv = document.createElement('div');
            buildDisplay(data.results);
        })
});

// builds display for HTML
function buildDisplay(songArray) {
    for (let song of songArray) {
        let displayBox = document.createElement('div');
        displayBox.classList.add('music');

        let artwork = document.createElement('img');
        artwork.src = song.artworkUrl100;
        artwork.alt = 'album cover';
        displayBox.appendChild(artwork);


        let songName = document.createElement('p');
        songName.innerText = song.trackName;
        displayBox.appendChild(songName);


        let name = document.createElement('h4');
        name.innerText = song.artistName;
        displayBox.appendChild(name);
        searchResults.appendChild(displayBox);
    }
}

// builds url for api
function urlBuilder(userArtist) {
    let radioButtons = document.querySelectorAll('#music, #musicVideo, #podcast');
    let url;
    for (let radioButton of radioButtons) {
        if (radioButton.checked) {
            // let selectedButton = 'music';
            let selectedButton = radioButton.value;
            console.log(`checked button: ${selectedButton}`)
            // return selectedButton;
            switch (selectedButton) {
                case 'musicArtist': url = 'https://itunes.apple.com/search?term=' + userArtist + '&media=music'; break;
                case 'musicVideo': url = 'https://itunes.apple.com/search?term=' + userArtist + '&media=musicVideo'; break;
                case 'podcast': url = 'https://itunes.apple.com/search?term=' + userArtist + '&media=podcast'; break;

            }
        }
    }
    console.log(url);
    return url;
}

