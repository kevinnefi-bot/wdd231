// Peak Performance Gym - Individual Project Site Plan JavaScript
// Dynamic Year and Last Modified Date (WDD 231 Requirement)

document.addEventListener('DOMContentLoaded', () => {
    // Current Copyright Year
    const yearElement = document.querySelector('#current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Document Last Modified
    const lastModifiedElement = document.querySelector('#last-modified');
    if (lastModifiedElement) {
        lastModifiedElement.textContent = document.lastModified;
    }

    // Interactive Wireframe View Toggle
    const viewButtons = document.querySelectorAll('.wireframe-toggle-btn');
    const wireframeContainers = document.querySelectorAll('.wireframe-view');

    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetView = button.getAttribute('data-view');

            viewButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            });

            button.classList.add('active');
            button.setAttribute('aria-pressed', 'true');

            wireframeContainers.forEach(container => {
                if (targetView === 'all') {
                    container.style.display = 'block';
                } else if (container.id === `wireframe-${targetView}`) {
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
            });
        });
    });
});
