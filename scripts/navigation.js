const navButton = document.querySelector('#hamburger-btn');
const primaryNav = document.querySelector('#primary-nav');

navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    primaryNav.classList.toggle('show');
});