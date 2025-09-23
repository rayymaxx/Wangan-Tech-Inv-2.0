(function () {
const btn = document.getElementById('scrollTopBtn');
if (!btn) return;

const SHOW_AFTER = 300; // px scrolled before showing button (adjust to taste)
let lastScroll = window.scrollY;

// Utility: show / hide with class toggles
function show() {
    btn.classList.remove('hide');
    btn.classList.add('show');
    btn.style.display = 'flex';
}
function hide() {
    btn.classList.remove('show');
    btn.classList.add('hide');
    // keep it in DOM but non-interactive while fading out
    // after fade completes, set display none to remove from flow (optional)
    setTimeout(() => {
    if (btn.classList.contains('hide')) btn.style.display = 'none';
    }, 300); // match transition duration
}

// Initial state: hidden
btn.style.display = 'none';
btn.classList.add('hide');

// Toggle visibility on scroll
function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (y > SHOW_AFTER) {
    // show when past threshold
    show();
    } else {
    hide();
    }
    lastScroll = y;
}

// Smooth scroll to top when clicked
btn.addEventListener('click', (e) => {
    // If user prefers reduced motion, jump to top
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery && mediaQuery.matches) {
    window.scrollTo(0, 0);
    } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // optional: hide after click
    hide();
});

// keyboard accessibility: Enter/Space triggers click automatically for button element

// show/hide on scroll (throttle using requestAnimationFrame)
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
    window.requestAnimationFrame(() => {
        onScroll();
        ticking = false;
    });
    ticking = true;
    }
}, { passive: true });

// also evaluate on load (in case user already scrolled or landed deep-linked)
window.addEventListener('load', onScroll);
// handle hash navigation or manual jumps
window.addEventListener('hashchange', onScroll);
})();
