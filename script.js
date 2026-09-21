document.getElementById('year').textContent = new Date().getFullYear();

const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
const revealItems = document.querySelectorAll('.hero > div, .portrait, .about > div, .section-heading, .project-copy, .visual, .moderation > div, .contact-grid > div, .skills li');
let observer;

function configureMotion() {
  observer?.disconnect();
  if (motionPreference.matches || !('IntersectionObserver' in window)) {
    revealItems.forEach(item => item.classList.remove('motion-ready', 'is-visible'));
    return;
  }
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  revealItems.forEach(item => {
    // Only conceal elements below the viewport; visible content stays available.
    if (item.getBoundingClientRect().top >= window.innerHeight) {
      item.classList.add('motion-ready');
      observer.observe(item);
    }
  });
}
configureMotion();
motionPreference.addEventListener('change', configureMotion);
