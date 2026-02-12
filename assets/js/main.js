// Smooth scroll for in-page links
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href").slice(1);
  const el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }
});

// Reveal on scroll
(() => {
  const targets = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    targets.forEach((el) => el.classList.add("show"));
    return;
  }

  if (!("IntersectionObserver" in window) || !targets.length) {
    targets.forEach((el) => el.classList.add("show"));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          io.unobserve(entry.target);
        }
      });
    },
    {
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1,
    },
  );

  targets.forEach((el) => io.observe(el));
})();

// Current year in footer
(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
