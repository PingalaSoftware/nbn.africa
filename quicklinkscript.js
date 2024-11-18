function scrollToElement(eleId) {
    document.getElementById(eleId).scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section'); // All sections
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link'); // Navbar links

    const observerOptions = {
        root: null, // Observes in the viewport
        rootMargin: '0px',
        threshold: 0.6 // 60% of the section needs to be visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get the ID of the section in view
                const activeId = entry.target.id;

                // Update active class on navbar links
                navLinks.forEach((link) => {
                    link.classList.remove('active'); // Remove active class from all
                    if (
                        link.getAttribute('onclick') ===
                        `scrollToElement('${activeId}')`
                    ) {
                        link.classList.add('active'); // Add active class to the matching link
                    }
                });
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach((section) => {
        observer.observe(section);
    });
});
