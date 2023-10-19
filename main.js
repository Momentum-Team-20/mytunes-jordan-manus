let search = document.querySelector('.searchButton');
let userInput = document.querySelector('.userInput');
let searchResults = document.querySelector('.searchResults');

search.addEventListener('click', () => {
    fetch('https://itunes.apple.com/search?term=bless+the+fall&entity=song')
        .then((response) => {
            return response.json();
            // }) .then((response) => {
            //     return response.json;
        }).then((data) => {
            console.log(data)
            let song = data.results[0];
            let songDiv = document.createElement('div');
        })
});
