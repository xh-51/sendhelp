// js/projects.js

document.addEventListener('DOMContentLoaded', function() {
    // Animate cards in on scroll
    const slideEls = document.querySelectorAll('.slide-in-up');
    const observer = new window.IntersectionObserver(
        (entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );
    slideEls.forEach(el => {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
    });

    // Project modal logic
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalTechStack = document.getElementById('modal-tech-stack');
    const modalDetails = document.getElementById('modal-details');
    const modalSliderContainer = document.querySelector('.modal-slider-container');
    const modalDots = document.querySelector('.modal-slider-dots');
    const modalPrevBtn = document.querySelector('.modal-slider-btn.prev-btn');
    const modalNextBtn = document.querySelector('.modal-slider-btn.next-btn');

    // Placeholder project data
    const projectData = {
        'bandori': {
            title: 'Bandori Static Website',
            description: 'A fan site for an anime rhythm game. Responsive, animated, and built to sharpen my front-end foundations.',
            techStack: ['HTML', 'CSS', 'JavaScript'],
            details: `<b>Project Overview</b><br>Developed a fully responsive website for a music band featuring modern design principles and smooth animations.<br><br><b>Key Features</b><ul><li>Responsive design</li><li>Interactive navigation</li><li>Image galleries</li></ul>`,
            images: [
                'https://placehold.co/400x240?text=Bandori+Slide+1',
                'https://placehold.co/400x240?text=Bandori+Slide+2',
                'https://placehold.co/400x240?text=Bandori+Slide+3'
            ]
        },
        'smart-cart': {
            title: 'Smart Cart Prototype',
            description: 'A smart cart checkout concept using RFID. Prototyped in Figma to show seamless in-cart payment.',
            techStack: ['Figma', 'UI Prototyping', 'Tech Research'],
            details: `<b>Project Overview</b><br>Smart cart solution for retail with real-time inventory and analytics.<br><br><b>Key Features</b><ul><li>Inventory tracking</li><li>User analytics</li><li>Mobile app integration</li></ul>`,
            images: [
                'https://placehold.co/400x240?text=Smart+Cart+Slide+1',
                'https://placehold.co/400x240?text=Smart+Cart+Slide+2',
                'https://placehold.co/400x240?text=Smart+Cart+Slide+3'
            ]
        },
        'tableau': {
            title: 'Tableau Dashboard Project',
            description: 'A KPI dashboard with interactive charts for business analytics, built with Tableau Prep and Desktop.',
            techStack: ['Tableau', 'Data Analytics', 'DAV Module'],
            details: `<b>Project Overview</b><br>Created dashboards for business intelligence and performance monitoring.<br><br><b>Key Features</b><ul><li>Interactive charts</li><li>KPI tracking</li><li>Custom filtering</li></ul>`,
            images: [
                'https://placehold.co/400x240?text=Tableau+Slide+1',
                'https://placehold.co/400x240?text=Tableau+Slide+2',
                'https://placehold.co/400x240?text=Tableau+Slide+3'
            ]
        }
    };

    let currentModalSlide = 0;
    let currentModalImages = [];

    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalTechStack.innerHTML = '';
        project.techStack.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            modalTechStack.appendChild(tag);
        });
        modalDetails.innerHTML = project.details;
        // Images
        modalSliderContainer.innerHTML = '';
        currentModalImages = project.images;
        currentModalImages.forEach((src, i) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = project.title + ' Slide ' + (i+1);
            img.className = 'modal-slider-image' + (i === 0 ? ' active' : '');
            modalSliderContainer.appendChild(img);
        });
        // Dots
        modalDots.innerHTML = '';
        currentModalImages.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'modal-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-slide', i);
            dot.addEventListener('click', () => showModalSlide(i));
            modalDots.appendChild(dot);
        });
        currentModalSlide = 0;
        showModalSlide(0);
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
    function showModalSlide(idx) {
        const imgs = modalSliderContainer.querySelectorAll('.modal-slider-image');
        const dots = modalDots.querySelectorAll('.modal-dot');
        imgs.forEach((img, i) => img.classList.toggle('active', i === idx));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
        currentModalSlide = idx;
    }
    function nextModalSlide() {
        showModalSlide((currentModalSlide + 1) % currentModalImages.length);
    }
    function prevModalSlide() {
        showModalSlide((currentModalSlide - 1 + currentModalImages.length) % currentModalImages.length);
    }
    // Event listeners
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.getAttribute('data-project')));
    });
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalNextBtn) modalNextBtn.addEventListener('click', nextModalSlide);
    if (modalPrevBtn) modalPrevBtn.addEventListener('click', prevModalSlide);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

    // --- Card Image Sliders ---
    document.querySelectorAll('.image-slider').forEach(function(slider) {
        const images = slider.querySelectorAll('.slider-image');
        const prevBtn = slider.querySelector('.prev-btn');
        const nextBtn = slider.querySelector('.next-btn');
        const dots = slider.querySelectorAll('.dot');
        let current = 0;
        function show(idx) {
            images.forEach((img, i) => img.classList.toggle('active', i === idx));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
            current = idx;
        }
        if (nextBtn) nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            show((current + 1) % images.length);
        });
        if (prevBtn) prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            show((current - 1 + images.length) % images.length);
        });
        dots.forEach((dot, i) => {
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                show(i);
            });
        });
        show(0);
    });
}); 