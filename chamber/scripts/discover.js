// WDD 231 - Chamber Discover Page Script
// Handles: place card rendering, localStorage visit tracking, navigation

import { places } from '../data/places.mjs';

// ─── Render Place Cards ────────────────────────────────────────────────────
function renderPlaces() {
    const container = document.querySelector('#places-grid');
    if (!container) return;

    places.forEach(place => {
        const card = document.createElement('article');
        card.className = 'place-card';
        card.id = place.id;

        card.innerHTML = `
            <h2>${place.title}</h2>
            <figure>
                <img
                    src="${place.image}"
                    alt="${place.alt}"
                    width="300"
                    height="200"
                    loading="lazy">
            </figure>
            <address>${place.address}</address>
            <p class="place-desc">${place.description}</p>
            <p class="place-details">${place.details}</p>
            <button type="button" class="learn-more-btn" aria-label="Learn more about ${place.title}">Learn More</button>
        `;

        container.appendChild(card);
    });
}

// ─── Learn More Toggle ─────────────────────────────────────────────────────
function initLearnMoreButtons() {
    document.addEventListener('click', e => {
        if (!e.target.matches('.learn-more-btn')) return;
        const details = e.target.closest('.place-card').querySelector('.place-details');
        const isVisible = details.style.display === 'block';
        details.style.display = isVisible ? 'none' : 'block';
        e.target.textContent = isVisible ? 'Learn More' : 'Show Less';
    });
}

// ─── localStorage Visit Message ────────────────────────────────────────────
function updateVisitMessage() {
    const msgEl = document.querySelector('#visit-message');
    if (!msgEl) return;

    const STORAGE_KEY = 'chamberDiscoverLastVisit';
    const now = Date.now();
    const last = localStorage.getItem(STORAGE_KEY);

    let message = '';

    if (!last) {
        message = 'Welcome! Let us know if you have any questions.';
    } else {
        const diffMs   = now - parseInt(last, 10);
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

        if (diffMs < 1000 * 60 * 60 * 24) {
            message = 'Back so soon! Awesome!';
        } else if (diffDays === 1) {
            message = 'You last visited 1 day ago.';
        } else {
            message = `You last visited ${diffDays} days ago.`;
        }
    }

    localStorage.setItem(STORAGE_KEY, String(now));
    msgEl.textContent = message;
}

// ─── Footer: Year and Last Modified ────────────────────────────────────────
function updateFooterDates() {
    const yearEl = document.querySelector('#currentyear');
    const modEl  = document.querySelector('#lastModified');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
    if (modEl)  modEl.textContent  = `Last Modified: ${document.lastModified}`;
}

// ─── Hamburger Navigation ──────────────────────────────────────────────────
function initNavigation() {
    const btn = document.querySelector('#hamburger-btn');
    const nav = document.querySelector('#nav-menu');
    if (!btn || !nav) return;

    btn.setAttribute('aria-expanded', 'false');
    btn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        btn.classList.toggle('open', isOpen);
        btn.setAttribute('aria-expanded', String(isOpen));
    });
}

// ─── Init ──────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    renderPlaces();
    initLearnMoreButtons();
    updateVisitMessage();
    updateFooterDates();
    initNavigation();
});
