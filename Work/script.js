document.addEventListener('DOMContentLoaded', () => {
    // Image loading optimization
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Gallery functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    const viewMoreBtn = document.querySelector('.view-more-btn');
    let isExpanded = false;

    // Initially hide items after the first 8
    galleryItems.forEach((item, index) => {
        if (index >= 8) {
            item.classList.add('hidden');
        }
    });

    // View More functionality
    viewMoreBtn?.addEventListener('click', () => {
        isExpanded = !isExpanded;
        galleryItems.forEach((item, index) => {
            if (index >= 8) {
                item.classList.toggle('hidden');
            }
        });
        viewMoreBtn.textContent = isExpanded ? 'View Less' : 'View More';
        
        // Smooth scroll to newly visible items if expanding
        if (isExpanded && galleryItems[8]) {
            galleryItems[8].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => sectionObserver.observe(section));
});
