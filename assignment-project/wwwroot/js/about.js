// About page JavaScript functionality
document.addEventListener('DOMContentLoaded', function () {
    // Set default background
    document.getElementById('default-bg').classList.add('active');
    
    // Get all cards with data-bg-image attribute
    const cards = document.querySelectorAll('.card[data-bg-image]');
    
    // Add event listeners to each card
    cards.forEach(card => {
        const bgImageId = card.getAttribute('data-bg-image');
        
        card.addEventListener('mouseenter', function() {
            // Remove active class from all cards
            document.querySelectorAll('.card').forEach(c => {
                c.classList.remove('active');
            });
            
            // Add active class to current card
            card.classList.add('active');
            
            // Hide all backgrounds
            document.querySelectorAll('.bg-image').forEach(bg => {
                bg.classList.remove('active');
            });
            
            // Show the background for this card
            const bgElement = document.getElementById(bgImageId + '-bg');
            if (bgElement) {
                bgElement.classList.add('active');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // When mouse leaves, check if any other card is being hovered
            const hoveredCard = document.querySelector('.card:hover[data-bg-image]');
            
            if (!hoveredCard) {
                // If no other card is hovered, return to default background
                document.querySelectorAll('.bg-image').forEach(bg => {
                    bg.classList.remove('active');
                });
                document.getElementById('default-bg').classList.add('active');
                
                // Remove active class from this card
                card.classList.remove('active');
            }
        });
    });
    
    // Initialize section indicator functionality
    initSectionIndicators();
    
    // Initial visibility check for fade elements
    checkVisibility();
});

// Initialize section indicators
function initSectionIndicators() {
    const scrollContainer = document.getElementById('unified-scroll');
    const indicators = document.querySelectorAll('.section-indicators .indicator');
    const sections = document.querySelectorAll('.section-group');
    
    // Add click event to indicators
    indicators.forEach(indicator => {
        indicator.addEventListener('click', function() {
            const targetSection = document.getElementById(this.getAttribute('data-section'));
            if (targetSection) {
                scrollContainer.scrollTo({
                    left: targetSection.offsetLeft - 20,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update indicators based on scroll position
    scrollContainer.addEventListener('scroll', function() {
        const scrollLeft = this.scrollLeft;
        const containerWidth = this.clientWidth;
        
        sections.forEach((section, index) => {
            const sectionLeft = section.offsetLeft - this.offsetLeft;
            const sectionRight = sectionLeft + section.clientWidth;
            
            // Section is in view
            if ((sectionLeft <= containerWidth / 2 && sectionRight >= containerWidth / 2) ||
                (index === 0 && scrollLeft === 0) ||
                (index === sections.length - 1 && scrollLeft + containerWidth >= this.scrollWidth - 10)) {
                
                // Update indicators
                indicators.forEach(ind => ind.classList.remove('active'));
                indicators[index].classList.add('active');
            }
        });
    });
}

// Improved scroll behavior function
function scrollCards(containerId, direction) {
    const container = document.getElementById(containerId);
    const scrollAmount = container.clientWidth * 0.75; // Scroll by 75% of container width
    
    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// Enhanced fade on scroll effect
function checkVisibility() {
    const fadeElements = document.querySelectorAll('.fade-on-scroll');
    const viewportHeight = window.innerHeight;
    
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        
        // Element is partially visible
        if (elementTop < viewportHeight && elementBottom > 0) {
            el.style.opacity = 1;
            el.style.transform = 'translateY(0)';
        } else {
            el.style.opacity = 0;
            el.style.transform = 'translateY(30px)';
        }
    });
}

// Improved scroll event handler with throttling
let isScrolling;
window.addEventListener('scroll', function() {
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling);
    
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(function() {
        checkVisibility();
    }, 60);
});

// Also check on resize
window.addEventListener('resize', checkVisibility);

// Initial check
checkVisibility();