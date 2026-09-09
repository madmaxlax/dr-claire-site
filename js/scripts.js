// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

function openNav() {
  sidebar.classList.add('open');
  overlay.classList.add('visible');
  toggle.classList.add('open');
  toggle.setAttribute('aria-expanded', 'true');
}

function closeNav() {
  sidebar.classList.remove('open');
  overlay.classList.remove('visible');
  toggle.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}

toggle?.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeNav() : openNav();
});

overlay?.addEventListener('click', closeNav);

// Close on nav link click (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 900) closeNav();
  });
});

// Active section highlight
const sections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('.nav-link');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));

// Scroll-in animations
const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

sections.forEach(s => fadeObserver.observe(s));
