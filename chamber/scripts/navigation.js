document.addEventListener('DOMContentLoaded', () => {
    const hamBtn = document.querySelector('#hamburger-btn');
    const navMenu = document.querySelector('#nav-menu');

    if (hamBtn && navMenu) {
        hamBtn.setAttribute('aria-expanded', 'false');

        hamBtn.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            hamBtn.classList.toggle('open', isOpen);
            hamBtn.setAttribute('aria-expanded', String(isOpen));
        });
    }
});
