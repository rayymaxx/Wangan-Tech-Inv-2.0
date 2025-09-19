// Simple popup functionality that works with Tailwind classes
document.addEventListener('DOMContentLoaded', function() {
    const openBtn = document.getElementById('openPopup');
    const closeBtn = document.getElementById('closePopup');
    const closeBtn2 = document.getElementById('closePopup2');
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popupContent');

    function showPopup() {
    popup.classList.remove('hidden');
    popup.classList.add('flex');
    // Small delay to allow display change, then animate
    setTimeout(() => {
        popupContent.classList.remove('scale-95', 'opacity-0');
        popupContent.classList.add('scale-100', 'opacity-100');
    }, 10);
    }

    function hidePopup() {
    popupContent.classList.remove('scale-100', 'opacity-100');
    popupContent.classList.add('scale-95', 'opacity-0');
    // Wait for animation to complete
    setTimeout(() => {
        popup.classList.remove('flex');
        popup.classList.add('hidden');
    }, 300);
    }

    if (openBtn) openBtn.addEventListener('click', showPopup);
    if (closeBtn) closeBtn.addEventListener('click', hidePopup);
    if (closeBtn2) closeBtn2.addEventListener('click', hidePopup);

    // Close when clicking outside
    if (popup) {
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
        hidePopup();
        }
    });
    }
});