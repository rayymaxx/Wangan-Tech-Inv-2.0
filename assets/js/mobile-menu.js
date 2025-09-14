document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu')

    if (!menuBtn || !mobileMenu) return;

    menuBtn.setAttribute('aria-controls', mobileMenu.id || 'mobile-menu');
    menuBtn.setAttribute('aria-expanded', 'false');

    const toggleMenu = () => {
        const isHidden = mobileMenu.classList.toggle('hidden');
        menuBtn.setAttribute('aria-expanded', String(!isHidden));
    };

    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close mobile menu by clicking outisde
    document.addEventListener('click', (e) => {
        if (!mobileMenu.classList.contains('hidden')
            && !menuBtn.contains(e.target)
            && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                menuBtn.setAttribute('aria-expanded', 'false');
            }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuBtn.setAttribute('aria-expanded', 'false');
            menuBtn.focus();
        }
    });
});