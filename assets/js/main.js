/* Smooth scroll for in-page links (плавный скролл по якорям) */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }
});

/* Reveal on scroll (появление элементов при прокрутке) */
(() => {
  const targets = document.querySelectorAll('.reveal');
  if (reduceMotion) {
    targets.forEach(el => el.classList.add('show'));
    return;
  }
  if (!('IntersectionObserver' in window) || !targets.length) {
    targets.forEach(el => el.classList.add('show'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target); // после появления перестаем наблюдать
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  targets.forEach(el => io.observe(el));
})();

/* Current year in footer (текущий год в футере) */
(() => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

/* Sticky-stack: отслеживание карточек услуг для эффекта стопки */
(() => {
  const container = document.querySelector('.cards--stack');
  if (!container) return;

  const cards = [...container.querySelectorAll('.card')];

  // Устанавливаем увеличенный z-index для каждой карточки по порядку 
  cards.forEach((card, i) => {
    card.style.zIndex = 10 + i;
  });

  // Наблюдатель за достижением карточкой позиции ~80px от верха
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const top = entry.boundingClientRect.top;
      // Если карточка находится в диапазоне 60–86px от верха, считаем, что она "почти прилипла"
      if (top <= 86 && top >= 60) {
        el.classList.add('is-stuck');
      } else {
        el.classList.remove('is-stuck');
      }
    });
  }, { threshold: [0, 1] });
  
  // Подключаем observer к каждой карточке
  cards.forEach(card => observer.observe(card));
})();
