// URL de los datos JSON
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

// Selección del contenedor donde se agregarán las tarjetas
const cards = document.querySelector('#cards');

// Función asíncrona para obtener los datos usando Fetch API
async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        // Llamada a la función para construir las tarjetas pasando el arreglo de profetas
        displayProphets(data.prophets);
    } catch (error) {
        console.error('Error fetching prophet data:', error);
    }
}

// Función flecha para construir dinámicamente cada tarjeta de profeta
const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        // Creación de elementos HTML
        let card = document.createElement('section');
        let fullName = document.createElement('h2');
        let birthDate = document.createElement('p');
        let birthPlace = document.createElement('p');
        let portrait = document.createElement('img');

        // Asignación de contenido
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

        // Atributos de la imagen
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');

        // Insertar elementos dentro de la tarjeta
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);

        // Insertar la tarjeta terminada en el contenedor principal
        cards.appendChild(card);
    });
};

// Ejecución inicial de la función
getProphetData();