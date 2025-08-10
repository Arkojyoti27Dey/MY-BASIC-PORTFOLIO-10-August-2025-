document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Move the dot directly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Animate the outline to follow the cursor
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    // Add hover effects for links and other interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = '#fff'; // Change color on hover
        });
        el.addEventListener('mouseout', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--accent-color)';
        });
    });

    // --- NEW: Date Time Update Logic ---
    function updateDateTime() {
        const now = new Date();
        const dateTimeElement = document.getElementById('datetime');

        if (dateTimeElement) {
            // Format the date (e.g., "Sunday, August 10, 2025")
            const date = now.toLocaleDateString(undefined, {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Format the time (e.g., "08:42:55 PM")
            const time = now.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });

            // Get milliseconds and pad with leading zeros
            const milliseconds = String(now.getMilliseconds()).padStart(3, '0');

            // Update the HTML content
            dateTimeElement.innerHTML = `${date} <br> ${time}:${milliseconds}`;
        }
    }

    // Call it once immediately to avoid a delay, then set an interval
    updateDateTime();
    setInterval(updateDateTime, 100); // Update frequently for smooth milliseconds

    // --- Scroll Animation Logic ---
    const scrollSections = document.querySelectorAll('.scroll-section');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it's visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    scrollSections.forEach(section => {
        observer.observe(section);
    });


    // --- Smooth Scrolling for Nav Links ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let targetId = this.getAttribute('href');
            let targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});
