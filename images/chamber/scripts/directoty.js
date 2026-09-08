const url = 'data/members.json';
const container = document.querySelector('#members-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const hamBtn = document.querySelector('#hamburger-btn');
const navMenu = document.querySelector('#nav-menu');

// Menú Hamburguesa
if (hamBtn && navMenu) {
    hamBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamBtn.classList.toggle('open');
    });
}

// Función asíncrona para obtener datos JSON
async function getMembersData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

// Función para renderizar tarjetas de miembros
const displayMembers = (members) => {
    container.innerHTML = ''; 
    
    members.forEach((member) => {
        let card = document.createElement('section');
        card.classList.add('member-card');

        let levelText = 'Member';
        if (member.membership === 2) levelText = 'Silver Member';
        if (member.membership === 3) levelText = 'Gold Member';

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="200" height="150">
            <h3>${member.name}</h3>
            <p class="category">${member.category}</p>
            <p class="address">${member.address}</p>
            <p class="phone">${member.phone}</p>
            <p class="membership">Level: ${levelText}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;

        container.appendChild(card);
    });
};

// Alternar vistas (Grid / List)
if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
        container.classList.add('grid-view');
        container.classList.remove('list-view');
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
    });

    listBtn.addEventListener('click', () => {
        container.classList.add('list-view');
        container.classList.remove('grid-view');
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
    });
}

// Fechas dinámicas para el Footer
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Ejecutar carga de datos
getMembersData();