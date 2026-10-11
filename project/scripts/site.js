const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-menu');

if (menuButton && menu) {
  menuButton.addEventListener('click', () => {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    menuButton.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    menu.classList.toggle('is-open', !expanded);
  });
}

document.querySelectorAll('[data-current-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

const membershipForm = document.querySelector('#plan');
const pageParameters = new URLSearchParams(window.location.search);
const selectedPlan = pageParameters.get('plan');
if (membershipForm && ['standard', 'pro', 'elite'].includes(selectedPlan)) {
  membershipForm.value = selectedPlan;
}

const classInterest = document.querySelector('#class-interest');
if (classInterest) classInterest.value = pageParameters.get('class') || '';

document.querySelectorAll('[data-plan]').forEach((link) => {
  link.addEventListener('click', () => {
    if (membershipForm) membershipForm.value = link.dataset.plan;
  });
});

const classContainer = document.querySelector('#class-list');
if (classContainer) initializeClasses();

async function initializeClasses() {
  const searchInput = document.querySelector('#class-search');
  const dayFilter = document.querySelector('#day-filter');
  const categoryFilter = document.querySelector('#category-filter');
  const savedOnly = document.querySelector('#saved-only');
  const count = document.querySelector('#class-count');
  const error = document.querySelector('#class-error');
  const dialog = document.querySelector('#class-dialog');
  let classes = [];
  let saved = loadSavedClasses();

  try {
    const response = await fetch('data/classes.json');
    if (!response.ok) throw new Error(`Class data request failed: ${response.status}`);
    classes = await response.json();
    renderClasses();
  } catch (requestError) {
    error.hidden = false;
    error.textContent = 'The class schedule could not be loaded. Please refresh the page or try again later.';
    count.textContent = 'Schedule unavailable';
    console.error(requestError);
    return;
  }

  [searchInput, dayFilter, categoryFilter, savedOnly].forEach((control) => {
    control.addEventListener('input', renderClasses);
    control.addEventListener('change', renderClasses);
  });

  classContainer.addEventListener('click', (event) => {
    const favoriteButton = event.target.closest('[data-favorite]');
    if (favoriteButton) {
      const classId = favoriteButton.dataset.favorite;
      if (saved.has(classId)) saved.delete(classId);
      else saved.add(classId);
      localStorage.setItem('peak-gym-saved-classes', JSON.stringify([...saved]));
      renderClasses();
      return;
    }

    const detailsButton = event.target.closest('[data-details]');
    if (detailsButton) showClassDetails(classes.find((item) => item.id === detailsButton.dataset.details));
  });

  function renderClasses() {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = classes.filter((item) => {
      const matchesQuery = `${item.name} ${item.category} ${item.instructor} ${item.level}`.toLowerCase().includes(query);
      const matchesDay = dayFilter.value === 'all' || item.day === dayFilter.value;
      const matchesCategory = categoryFilter.value === 'all' || item.category === categoryFilter.value;
      return matchesQuery && matchesDay && matchesCategory && (!savedOnly.checked || saved.has(item.id));
    });

    count.textContent = `${filtered.length} ${filtered.length === 1 ? 'class' : 'classes'}`;
    classContainer.innerHTML = filtered.length ? filtered.map((item) => `
      <article class="class-card">
        <div class="class-card-top"><span class="class-category">${item.category}</span><button class="save-class" type="button" data-favorite="${item.id}" aria-label="${saved.has(item.id) ? 'Remove saved class' : 'Save class'}: ${item.name}" aria-pressed="${saved.has(item.id)}"><span aria-hidden="true">${saved.has(item.id) ? '&#9733;' : '&#9734;'}</span></button></div>
        <h3>${item.name}</h3>
        <p class="class-time">${item.day} <span aria-hidden="true">/</span> ${item.time}</p>
        <dl class="class-facts"><div><dt>Coach</dt><dd>${item.instructor}</dd></div><div><dt>Level</dt><dd>${item.level}</dd></div><div><dt>Duration</dt><dd>${item.duration} min</dd></div><div><dt>Studio</dt><dd>${item.studio}</dd></div></dl>
        <button class="text-link details-button" type="button" data-details="${item.id}">Class details <span aria-hidden="true">&#8594;</span></button>
      </article>`).join('') : '<p class="empty-state">No classes match those filters. Try a different day or search.</p>';
  }

  function showClassDetails(item) {
    if (!item) return;
    document.querySelector('#dialog-category').textContent = `${item.category} / ${item.level}`;
    document.querySelector('#dialog-title').textContent = item.name;
    document.querySelector('#dialog-description').textContent = item.description;
    document.querySelector('#dialog-facts').innerHTML = `<div><dt>When</dt><dd>${item.day} at ${item.time}</dd></div><div><dt>Coach</dt><dd>${item.instructor}</dd></div><div><dt>Where</dt><dd>${item.studio}</dd></div><div><dt>Duration</dt><dd>${item.duration} minutes</dd></div>`;
    document.querySelector('#reserve-link').href = `membership.html?class=${encodeURIComponent(item.name)}`;
    dialog.showModal();
  }
}

function loadSavedClasses() {
  try {
    const savedItems = JSON.parse(localStorage.getItem('peak-gym-saved-classes') || '[]');
    return new Set(Array.isArray(savedItems) ? savedItems : []);
  } catch {
    return new Set();
  }
}

const submissionDetails = document.querySelector('#submission-details');
if (submissionDetails) {
  const values = new URLSearchParams(window.location.search);
  const labels = {name: 'Name', email: 'Email', phone: 'Phone', plan: 'Membership interest', visitDate: 'Preferred first visit', goal: 'Training goal', class: 'Class interest'};
  const entries = Object.entries(labels).filter(([key]) => values.has(key) && values.get(key).trim());
  if (!entries.length) {
    document.querySelector('#confirmation-message').textContent = 'No request details were found. You can return to the membership page to submit a guest pass request.';
  } else {
    const name = values.get('name');
    if (name) document.querySelector('#confirmation-title').textContent = `Thanks, ${name}.`;
    entries.forEach(([key, label]) => {
      const row = document.createElement('div');
      const term = document.createElement('dt');
      const definition = document.createElement('dd');
      term.textContent = label;
      definition.textContent = values.get(key);
      row.append(term, definition);
      submissionDetails.append(row);
    });
  }
}