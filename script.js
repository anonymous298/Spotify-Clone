// Navbar Search Box Logic
const searchBox = document.querySelector('.search-container');
document.addEventListener('click', (e) => {
    searchBox.classList.toggle('active', searchBox.contains(e.target));
});

// Hamburger Menu Logic
const hamburgerButton = document.querySelector('.hamburger');
const closeButton = document.querySelector('.close');
const aside = document.querySelector('aside');
const asideText = document.querySelector('.aside-inner-text');

hamburgerButton.addEventListener('click', () => {
    aside.classList.toggle('show');
    closeButton.classList.toggle('show');
    asideText.classList.toggle('show');
});

closeButton.addEventListener('click', () => {
    aside.classList.toggle('show');
    closeButton.classList.toggle('show');
    asideText.classList.toggle('show');
});

// Global Variables
let allSongs = [];
let currentAudio = null;
let currentSongIndex = -1;

// Player Elements
const playBtn = document.getElementById('playButton');
const nextBtn = document.getElementById('nextButton');
const prevBtn = document.getElementById('previousButton');
const progressBar = document.getElementById('progressBar');
const volumeBar = document.getElementById('volumeBar');
const currentTimeDisplay = document.getElementById('currentTime');
const totalTimeDisplay = document.getElementById('totalTime');
const playerCover = document.getElementById('playerCover');
const playerTitle = document.getElementById('playerTitle');
const playerDescription = document.getElementById('playerDescription');

// Fetch and render cards
async function fetchSongs() {
    const response = await fetch('info.json');
    return await response.json();
}

async function insertCards() {
    const songAlbums = await fetchSongs();
    const container = document.querySelector('.container-inner-cards-container');

    for (const key in songAlbums) {
        const song = songAlbums[key];
        const cardHTML = `
            <div class="card">
                <div class="image-portion">
                    <img src="${song.cover}" alt="cover">
                    <div class="play-button"><img src="assets/play.png" alt="play"></div>
                </div>
                <h4>${song.title}</h4>
                <p>${song.description}</p>
                <audio src="${song.song}"></audio>
            </div>`;
        container.innerHTML += cardHTML;
    }

    allSongs = document.querySelectorAll('.card audio');
    setupCardListeners();
}

function setupCardListeners() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        const audio = card.querySelector("audio");
        card.addEventListener("click", () => playSelectedSong(card, audio, index));
    });
}

function playSelectedSong(card, audio, index) {
    if (currentAudio && currentAudio !== audio) {
        stopCurrentAudio();
    }

    if (currentAudio === audio && !audio.paused) {
        audio.pause();
    } else {
        currentAudio = audio;
        currentSongIndex = index;
        audio.play();
        setPlayerInfo(card);
        audio.addEventListener("timeupdate", updateSeekBar);
    }
}

function stopCurrentAudio() {
    currentAudio.pause();
    currentAudio.currentTime = 0;
}

function setPlayerInfo(card) {
    playerCover.src = card.querySelector("img").src;
    playerTitle.textContent = card.querySelector("h4").textContent;
    playerDescription.textContent = card.querySelector("p").textContent;
}

function updateSeekBar() {
    if (currentAudio) {
        progressBar.max = currentAudio.duration || 0;
        progressBar.value = currentAudio.currentTime;
        currentTimeDisplay.textContent = formatTime(currentAudio.currentTime);
        totalTimeDisplay.textContent = formatTime(currentAudio.duration || 0);
    }
}

function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

// Control Button Logic
playBtn.addEventListener("click", () => {
    if (!currentAudio && allSongs.length > 0) {
        const card = document.querySelectorAll('.card')[0];
        playSelectedSong(card, allSongs[0], 0);
    } else if (currentAudio.paused) {
        currentAudio.play();
    } else {
        currentAudio.pause();
    }
});

nextBtn.addEventListener("click", () => {
    if (currentSongIndex < allSongs.length - 1) {
        const card = document.querySelectorAll('.card')[currentSongIndex + 1];
        playSelectedSong(card, allSongs[currentSongIndex + 1], currentSongIndex + 1);
    }
});

prevBtn.addEventListener("click", () => {
    if (currentSongIndex > 0) {
        const card = document.querySelectorAll('.card')[currentSongIndex - 1];
        playSelectedSong(card, allSongs[currentSongIndex - 1], currentSongIndex - 1);
    }
});

// Progress and Volume Control
progressBar.addEventListener("input", () => {
    if (currentAudio) currentAudio.currentTime = progressBar.value;
});

volumeBar.addEventListener("input", () => {
    if (currentAudio) currentAudio.volume = volumeBar.value;
});

// Start
insertCards();
