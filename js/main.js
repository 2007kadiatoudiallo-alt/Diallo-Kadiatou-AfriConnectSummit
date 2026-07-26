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


// ===== FILTRAGE DYNAMIQUE DES INTERVENANTS =====
const filtreBoutons = document.querySelectorAll('.filtre-btn');
const cartesIntervenants = document.querySelectorAll('.carte-intervenant');

if (filtreBoutons.length > 0) {
  filtreBoutons.forEach(bouton => {
    bouton.addEventListener('click', () => {
      // Retirer "actif" de tous les boutons
      filtreBoutons.forEach(b => b.classList.remove('actif'));
      bouton.classList.add('actif');

      const filtre = bouton.getAttribute('data-filtre');

      cartesIntervenants.forEach(carte => {
        const categorie = carte.getAttribute('data-categorie');

        if (filtre === 'tous' || categorie === filtre) {
          carte.classList.remove('cachee');
        } else {
          carte.classList.add('cachee');
        }
      });
    });
  });
}


// ===== VALIDATION DU FORMULAIRE D'INSCRIPTION =====
const formulaire = document.getElementById('formulaire-inscription');

if (formulaire) {
  const champs = {
    nom: document.getElementById('nom-complet'),
    email: document.getElementById('email'),
    telephone: document.getElementById('telephone'),
    participation: document.getElementById('type-participation'),
    pays: document.getElementById('pays'),
    message: document.getElementById('message')
  };

  const erreurs = {
    nom: document.getElementById('erreur-nom'),
    email: document.getElementById('erreur-email'),
    telephone: document.getElementById('erreur-telephone'),
    participation: document.getElementById('erreur-participation'),
    pays: document.getElementById('erreur-pays'),
    message: document.getElementById('erreur-message')
  };

  function validerChamp(champ, condition, erreurElement, messageErreur) {
    if (condition) {
      champ.classList.remove('invalide');
      champ.classList.add('valide');
      erreurElement.textContent = '';
      return true;
    } else {
      champ.classList.remove('valide');
      champ.classList.add('invalide');
      erreurElement.textContent = messageErreur;
      return false;
    }
  }

  formulaire.addEventListener('submit', (e) => {
    e.preventDefault();

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telephoneChiffres = champs.telephone.value.replace(/\D/g, '');

    const nomValide = validerChamp(
      champs.nom,
      champs.nom.value.trim().length > 0,
      erreurs.nom,
      'Le nom complet est requis.'
    );

    const emailValide = validerChamp(
      champs.email,
      regexEmail.test(champs.email.value.trim()),
      erreurs.email,
      'Veuillez entrer un email valide.'
    );

    const telephoneValide = validerChamp(
      champs.telephone,
      telephoneChiffres.length >= 8,
      erreurs.telephone,
      'Le téléphone doit contenir au moins 8 chiffres.'
    );

    const participationValide = validerChamp(
      champs.participation,
      champs.participation.value !== '',
      erreurs.participation,
      'Veuillez choisir un type de participation.'
    );

    const paysValide = validerChamp(
      champs.pays,
      champs.pays.value !== '',
      erreurs.pays,
      'Veuillez choisir un pays.'
    );

    const messageValide = validerChamp(
      champs.message,
      champs.message.value.trim().length >= 20,
      erreurs.message,
      'Le message doit contenir au moins 20 caractères.'
    );

    const formulaireValide = nomValide && emailValide && telephoneValide &&
                              participationValide && paysValide && messageValide;

    const messageSucces = document.getElementById('message-succes');

    if (formulaireValide) {
      messageSucces.classList.add('visible');

      setTimeout(() => {
        formulaire.reset();
        Object.values(champs).forEach(champ => {
          champ.classList.remove('valide', 'invalide');
        });
        messageSucces.classList.remove('visible');
      }, 3000);
    } else {
      messageSucces.classList.remove('visible');
    }
  });
}


// ===== COMPTE À REBOURS =====
const dateEvenement = new Date('2026-11-12T09:00:00').getTime();

function majCountdown() {
  const elementDays = document.getElementById('days');
  const elementHours = document.getElementById('hours');
  const elementMinutes = document.getElementById('minutes');
  const elementSeconds = document.getElementById('seconds');

  if (!elementDays || !elementHours || !elementMinutes || !elementSeconds) {
    return;
  }

  const maintenant = new Date().getTime();
  const difference = dateEvenement - maintenant;

  if (difference <= 0) {
    elementDays.textContent = '00';
    elementHours.textContent = '00';
    elementMinutes.textContent = '00';
    elementSeconds.textContent = '00';
    return;
  }

  const jours = Math.floor(difference / (1000 * 60 * 60 * 24));
  const heures = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const secondes = Math.floor((difference % (1000 * 60)) / 1000);

  elementDays.textContent = String(jours).padStart(2, '0');
  elementHours.textContent = String(heures).padStart(2, '0');
  elementMinutes.textContent = String(minutes).padStart(2, '0');
  elementSeconds.textContent = String(secondes).padStart(2, '0');
}

majCountdown();
setInterval(majCountdown, 1000);



// ===== GESTION DES ONGLETS JOUR 1/2/3 - PAGE PROGRAMME =====
const ongletsBoutons = document.querySelectorAll('.onglet-btn');
const ongletsContenus = document.querySelectorAll('.onglet-contenu');

if (ongletsBoutons.length > 0) {
  ongletsBoutons.forEach(bouton => {
    bouton.addEventListener('click', () => {
      ongletsBoutons.forEach(b => b.classList.remove('actif'));
      ongletsContenus.forEach(c => c.classList.remove('actif'));

      bouton.classList.add('actif');

      const jour = bouton.getAttribute('data-jour');
      const contenu = document.getElementById(jour);
      if (contenu) {
        contenu.classList.add('actif');
      }
    });
  });
}

// ===== FADE IN AU SCROLL - GÉNÉRAL (TOUTES SECTIONS) =====
const elementsFadeIn = document.querySelectorAll('.fade-in');

if (elementsFadeIn.length > 0) {
  const fadeInObserver = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
      if (entree.isIntersecting) {
        entree.target.classList.add('visible');
        fadeInObserver.unobserve(entree.target);
      }
    });
  }, { threshold: 0.15 });

  elementsFadeIn.forEach(element => {
    fadeInObserver.observe(element);
  });
}


// ===== MENU BURGER (MOBILE) =====
const burger = document.getElementById('burger');
const navbarLinks = document.getElementById('navbar-links');

if (burger && navbarLinks) {
  burger.addEventListener('click', () => {
    navbarLinks.classList.toggle('ouvert');
    burger.classList.toggle('actif');
  });

  // Fermer le menu quand on clique sur un lien
  const liens = navbarLinks.querySelectorAll('.nav-link');
  liens.forEach(lien => {
    lien.addEventListener('click', () => {
      navbarLinks.classList.remove('ouvert');
      burger.classList.remove('actif');
    });
  });
}

// ===== COMPTEURS ANIMÉS AU SCROLL - CHIFFRES CLÉS =====
const statNumbers = document.querySelectorAll('.stat-number');

function animerCompteur(element) {
  const cible = parseInt(element.getAttribute('data-target'));
  const avecSigne = element.textContent.trim().startsWith('+');
  const duree = 2000;
  const etapes = 60;
  const increment = cible / etapes;
  let valeurActuelle = 0;
  let etapeActuelle = 0;

  const intervalle = setInterval(() => {
    etapeActuelle++;
    valeurActuelle += increment;

    if (etapeActuelle >= etapes) {
      element.textContent = (avecSigne ? '+' : '') + cible;
      clearInterval(intervalle);
    } else {
      element.textContent = (avecSigne ? '+' : '') + Math.floor(valeurActuelle);
    }
  }, duree / etapes);
}

if (statNumbers.length > 0) {
  const statsObserver = new IntersectionObserver((entrees) => {
    entrees.forEach(entree => {
      if (entree.isIntersecting) {
        animerCompteur(entree.target);
        statsObserver.unobserve(entree.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => {
    statsObserver.observe(stat);
  });
}