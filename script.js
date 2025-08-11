document.addEventListener('DOMContentLoaded', () => {

    // --- Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: 'forwards' });
    });

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .grid-tile');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursorOutline.style.borderColor = 'var(--accent-color)';
        });
        el.addEventListener('mouseout', () => {
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.borderColor = 'var(--accent-color)'; // Keep it the accent color
        });
    });

    // --- Digital Clock Logic ---
    function updateDateTime() {
        const dateLineElement = document.getElementById('date-line');
        const timeLineElement = document.getElementById('time-line');

        if (dateLineElement && timeLineElement) {
            const now = new Date();
            const padZero = (num) => String(num).padStart(2, '0');

            const year = now.getFullYear();
            const month = padZero(now.getMonth() + 1);
            const day = padZero(now.getDate());
            const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][now.getDay()];
            dateLineElement.textContent = `${year}-${month}-${day} ${dayOfWeek}`;

            let hours = now.getHours();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const minutes = padZero(now.getMinutes());
            const seconds = padZero(now.getSeconds());
            timeLineElement.textContent = `${padZero(hours)}:${minutes}:${seconds} ${ampm}`;
        }
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);

    // --- Scroll Animation Logic ---
    const scrollSections = document.querySelectorAll('.scroll-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
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