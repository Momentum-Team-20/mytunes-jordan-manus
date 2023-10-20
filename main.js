let search = document.querySelector('.searchButton');
let searchForm = document.querySelector('#searchForm');
let searchResults = document.querySelector('.searchResults');
let userInput = document.querySelector('#userInput');
let radioButtons = document.querySelectorAll('#music, #musicVideo, #podcast');
let playButton = document.querySelectorAll('.imageButton');
let audioPlayer = document.querySelector('.audioPlayer');
let audioSection = document.querySelector('.audioSection');



//  get this to reset page between each search
function clearResults() {
    console.log("i'm in reset");
    searchResults.innerHTML = [];
}


searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearResults();
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
            return data.results;
        })

});

// playButton.addEventListener('click', (event) => {
//     audioInterface(data.results);
// })

// function audioInterface(songArray) {
//     console.log('inside of audio interface function');
//     for (let song of songArray) {
//         let playbackButtons = document.querySelectorAll('.musicButton', '.videoButton', 'podcastButton');
//         for (let playbackButton of playbackButtons) {
//             switch (playbackButton) {
//                 case 'musicButton': //play music with audio tag
//                     audioPlayer.src = song.previewUrl;
//                     break;
//                 case 'videoButton': //play video with video tag
//                     let videoPlayer = document.createElement('video');
//                     let videoSource = document.createElement('source');
//                     videoSource.src = song.previewUrl;
//                     videoPlayer.appendChild(videoSource);
//                     audioSection.appendChild(videoPlayer);
//                     break;
//                 case 'podcastButton': //take user to apple podcast page
//                     let podcastPage = document.createElement('a');
//                     podcastPage.href = song.trackViewUrl;
//                     podcastPage.target = '_blank';
//             }
//         }
//     }
//     return 'hello';
// }




// builds display for HTML
function buildDisplay(songArray) {
    for (let song of songArray) {
        let displayBox = document.createElement('div');
        displayBox.classList.add('music');

        // establishes that podcast button should take user to podcast page
        let podcastPage = document.createElement('a');
        podcastPage.href = song.trackViewUrl;

        let artworkDiv = document.createElement('div');
        artworkDiv.classList.add('imageContainer');
        let artwork = document.createElement('img');
        artwork.classList.add('image');
        artwork.src = song.artworkUrl100;
        artwork.alt = 'album cover';
        let playButton = document.createElement('button');
        playButton.classList.add('playButton');
        playButton.innerText = 'Play';
        // artwork.appendChild(playButton);
        // artworkDiv.appendChild(artwork);
        playButton.appendChild(artwork);
        artworkDiv.appendChild(playButton);
        displayBox.appendChild(artworkDiv);


        let songName = document.createElement('p');
        songName.classList.add('songName');
        songName.innerText = song.trackName;
        displayBox.appendChild(songName);


        let name = document.createElement('h4');
        name.classList.add('artistName');
        name.innerText = song.artistName;
        displayBox.appendChild(name);

        searchResults.appendChild(displayBox);


        playButton.addEventListener('click', () => {
            audioPlayer.src = song.previewUrl;
        })
    }
}

// builds url for api
function urlBuilder(userArtist) {
    // radioButtons = document.querySelectorAll('#music, #musicVideo, #podcast');
    let url = 'https://itunes.apple.com/search?term=';
    let selectedButton = checkRadioButton();
    switch (selectedButton) {
        case 'musicArtist': url += userArtist + '&media=music';
            break;
        case 'musicVideo': url += userArtist + '&media=musicVideo';
            break;
        case 'podcast': url += userArtist + '&media=podcast';
            break;

    }
    //     }
    // }
    console.log(url);
    return url;
}


// checks which radio button is checked
function checkRadioButton() {
    let radioButtons = document.querySelectorAll('#music, #musicVideo, #podcast');
    let selectedButton;
    for (let radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedButton = radioButton.value;
            console.log(`checked button: ${selectedButton}`)
        }
    }
    return selectedButton
}
