// Creating logic for our Nav bar search box border effect
const searchBox = document.querySelector('.search-container');

document.addEventListener('click', function (e) {
if (searchBox.contains(e.target)) {
    searchBox.classList.add('active');
} else {
    searchBox.classList.remove('active');
}
});

