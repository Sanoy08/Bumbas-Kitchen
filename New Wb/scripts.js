document.addEventListener('DOMContentLoaded', () => {
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');
    const bestsellersItems = document.querySelector('.bestsellers-items');
    const allItems = document.querySelectorAll('.bestseller-item');
    let currentIndex = 0;
    const totalItems = allItems.length;

    // Helper function to determine how many items should be visible
    function getVisibleItemsCount() {
        if (window.innerWidth <= 480) return 1; // Show 1 item on phones
        if (window.innerWidth <= 768) return 2; // Show 2 items on tablets
        return 4; // Show 4 items on desktops
    }

    // Function to update the carousel based on the current index
    function updateCarousel() {
        const visibleItemsCount = getVisibleItemsCount();
        const offset = -currentIndex * (100 / visibleItemsCount);
        bestsellersItems.style.transform = `translateX(${offset}%)`;
        // Update dots or any other UI elements if needed
        // updateDots();
    }

    // Function to move to the next set of items
    function moveNext() {
        const visibleItemsCount = getVisibleItemsCount();
        if (currentIndex < totalItems - visibleItemsCount) {
            currentIndex++;
        } else {
            currentIndex = 0; // Loop back to the beginning
        }
        updateCarousel();
    }

    // Function to move to the previous set of items
    function movePrev() {
        const visibleItemsCount = getVisibleItemsCount();
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalItems - visibleItemsCount; // Loop to the last set
        }
        updateCarousel();
    }

    // Event listeners for the arrows
    rightArrow.addEventListener('click', moveNext);
    leftArrow.addEventListener('click', movePrev);

    // Update carousel on window resize to adapt to different screen sizes
    window.addEventListener('resize', updateCarousel);

    // Initialize the carousel on page load
    updateCarousel();

    // Touch functionality for mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Minimum distance for swipe detection

    function handleSwipe() {
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            moveNext();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            movePrev();
        }
    }

    // Add touch event listeners
    bestsellersItems.addEventListener('touchstart', (event) => {
        touchStartX = event.touches[0].clientX;
    });

    bestsellersItems.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].clientX;
        handleSwipe();
    });
});
