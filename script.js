// Creating logic for our Nav bar search box border effect
const searchBox = document.querySelector('.search-container');

document.addEventListener('click', function (e) {
if (searchBox.contains(e.target)) {
    searchBox.classList.add('active');
} else {
    searchBox.classList.remove('active');
}
});

// Creating logic for hamburger menu 
let hamburgerButton = document.querySelector('.hamburger');
let closeButton = document.querySelector('.close');

hamburgerButton.addEventListener('click', () => {
    document.querySelector('aside').classList.toggle('show');
    document.querySelector('.close').classList.toggle('show')
    document.querySelector('.aside-inner-text').classList.toggle('show')
})


closeButton.addEventListener('click', () => {
    document.querySelector('aside').classList.toggle('show');
    document.querySelector('.close').classList.toggle('show')
    document.querySelector('.aside-inner-text').classList.toggle('show')
})