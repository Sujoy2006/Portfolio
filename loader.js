// Function to show loader
function showLoader() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'flex';
}

// Function to hide loader
function hideLoader() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
}

// Show loader when page starts loading
document.addEventListener('DOMContentLoaded', () => {
    showLoader();
});

// Hide loader when page is fully loaded
window.addEventListener('load', () => {
    hideLoader();
}); 