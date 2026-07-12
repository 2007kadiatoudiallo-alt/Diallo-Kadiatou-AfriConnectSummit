// ===== TOGGLE DARK/LIGHT MODE =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Appliquer le thème sauvegardé au chargement de la page
const themeSauvegarde = localStorage.getItem('theme');
if (themeSauvegarde === 'dark') {
  body.classList.add('dark-mode');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    themeToggle.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    themeToggle.textContent = '🌙';
  }
});

// ===== NAVBAR AU SCROLL (fond, ombre, shrink) =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-scrolled');
  } else {
    navbar.classList.remove('navbar-scrolled');
  }
});

// ===== BOUTON RETOUR EN HAUT =====
const boutonRetourHaut = document.getElementById('bouton-retour-haut');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    boutonRetourHaut.classList.add('visible');
  } else {
    boutonRetourHaut.classList.remove('visible');
  }
});

boutonRetourHaut.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});