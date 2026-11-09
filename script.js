const navList = document.querySelector('.nav-list');
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNavigation = window.matchMedia('(max-width: 768px)');

function closeMenu() {
    header.classList.remove('menu-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
}

function updateHeaderOnScroll() {
    const isScrolled = window.scrollY > 0;
    header.classList.toggle('is-scrolled', isScrolled && mobileNavigation.matches);
    navList.classList.toggle('scrolled', isScrolled && !mobileNavigation.matches);
}

menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    header.classList.toggle('menu-open', !isOpen);
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
});

navList.addEventListener('click', (event) => {
    if (mobileNavigation.matches && event.target.closest('li')) {
        closeMenu();
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMenu();
    }
});

mobileNavigation.addEventListener('change', () => {
    closeMenu();
    updateHeaderOnScroll();
});

window.addEventListener('scroll', updateHeaderOnScroll);
updateHeaderOnScroll();
