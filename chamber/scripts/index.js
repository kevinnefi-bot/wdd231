// Menú Hamburguesa
const hamBtn = document.querySelector('#hamburger-btn');
const navMenu = document.querySelector('#nav-menu');

if (hamBtn && navMenu) {
    hamBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        hamBtn.classList.toggle('open');
    });
}

// Configuración de la API OpenWeatherMap con tu API Key (Cochabamba, Bolivia)
const apiKey = '48774869c0cd6081ca7aba542942776a'; 
const lat = '-17.3895'; 
const lon = '-66.1568'; 
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            console.error('Error en la respuesta del clima:', response.status);
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            console.error('Error en la respuesta del pronóstico:', response.status);
        }
    } catch (error) {
        console.error('Error fetching forecast:', error);
    }
}

function displayCurrentWeather(data) {
    const weatherContainer = document.querySelector('#weather-details');
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0].description;
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherContainer.innerHTML = `
        <div class="weather-current">
            <img src="${icon}" alt="${desc}">
            <p><strong>${temp}&deg;C</strong> - ${desc.toUpperCase()}</p>
        </div>
    `;
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('#forecast-details');
    forecastContainer.innerHTML = '';
    
    // Filtrar lecturas cerca del mediodía (12:00:00) para los próximos 3 días
    const dailyForecasts = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        const temp = Math.round(day.main.temp);
        
        const forecastItem = document.createElement('p');
        forecastItem.innerHTML = `<strong>${date}:</strong> ${temp}&deg;C`;
        forecastContainer.appendChild(forecastItem);
    });
}

// Cargar y filtrar los Miembros Destacados (Gold=3 y Silver=2)
const membersUrl = 'data/members.json';

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        }
    } catch (error) {
        console.error('Error fetching members:', error);
    }
}

function displaySpotlights(members) {
    const container = document.querySelector('#spotlight-container');
    container.innerHTML = '';

    // Filtrar solo miembros con membresía Silver (2) y Gold (3)
    const eligibleMembers = members.filter(m => m.membership === 2 || m.membership === 3);

    // Seleccionar aleatoriamente entre 2 y 3 miembros
    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    selected.forEach(member => {
        const levelText = member.membership === 3 ? 'Gold Member' : 'Silver Member';
        const card = document.createElement('section');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="150" height="100" onerror="this.src='images/placeholder.png'">
            <h3>${member.name}</h3>
            <p class="membership-badge">${levelText}</p>
            <p>${member.phone}</p>
            <p>${member.address}</p>
            <a href="${member.website}" target="_blank" rel="noopener">Visit Website</a>
        `;
        container.appendChild(card);
    });
}

// Fechas dinámicas para el Footer
document.querySelector('#currentyear').textContent = new Date().getFullYear();
document.querySelector('#lastModified').textContent = `Last Modified: ${document.lastModified}`;

// Ejecutar funciones al cargar
fetchWeather();
fetchForecast();
fetchSpotlights();