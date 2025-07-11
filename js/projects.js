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

    // --- Modal Project Details Data (Updated 2024-06-09) ---
    const projectDetails = {
      tableau: {
        title: 'Tableau Dashboard Project',
        description: 'A business intelligence dashboard built with Tableau Prep and Desktop to visualize banking channel trends and performance KPIs.',
        tech: ['Tableau', 'Data Analytics', 'Tableau Prep Builder'],
        overview: 'Created an interactive dashboard using Tableau for Quantum Vault Bank Ltd, a fictional bank used in a data analysis assignment. The project involved cleaning and preparing a simulated dataset with Tableau Prep Builder to examine shifts in customer transaction behavior across ATM, internet banking, OTC, and CDM channels.',
        features: [
          'Interactive visualizations and KPI tracking',
          'Custom filters by channel and year',
          'Insights into user preferences and digital vs. physical banking trends'
        ],
        impact: 'Enabled data-driven decisions on improving branch services, enhancing digital security, and scaling self-service tools based on customer behavior.',
        images: [
          '../images/tableau1.jpg',
          '../images/tableau2.jpg'
        ]
      },
      'smart-cart': {
        title: 'Smart Cart Prototype',
        description: 'A conceptual smart shopping cart designed in Figma to streamline in-store checkout using RFID and weight sensors.',
        tech: ['Figma', 'UI Prototyping', 'Tech Research'],
        overview: 'Prototyped a smart cart interface that detects products in real time, enabling automatic payment and reducing queue times.',
        features: [
          'RFID and sensor-based item recognition',
          'Real-time cart total display',
          'Seamless checkout via cart interface'
        ],
        impact: 'Demonstrated innovation in retail tech by improving user convenience, reducing friction at checkout, and reimagining future store experiences.',
        images: [
          '../images/smartcart1.jpg',
          '../images/smartcart2.jpg'
        ]
      },
      bandori: {
        title: 'Bandori Fan Website',
        description: 'A static website built to showcase game content for the anime rhythm game BanG Dream! Girls Band Party!',
        tech: ['HTML', 'CSS', 'JavaScript'],
        overview: 'Created as one of my first front-end development projects, this fan site displays character bios, band info, and song highlights in a clean and interactive layout.',
        features: [
          'Responsive layout with themed styling',
          'Interactive tabs for exploring band members',
          'Scroll-based animations and visual enhancements'
        ],
        impact: 'Helped build foundational skills in layout structuring, styling, and basic interactivity — and nurtured my interest in aesthetic, user-friendly web design.',
        images: [
          '../images/bandori1.jpg',
          '../images/bandori2.jpg',
          '../images/bandori3.jpg',
          '../images/bandori4.jpg',
          '../images/bandori5.jpg'
        ]
      }
    };

    let currentModalSlide = 0;
    let currentModalImages = [];

    function openModal(projectId) {
        const project = projectDetails[projectId];
        if (!project) return;
        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalTechStack.innerHTML = '';
        project.tech.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            modalTechStack.appendChild(tag);
        });
        modalDetails.innerHTML = `
            <b>Project Overview</b><br>${project.overview}<br><br>
            <b>Key Features</b>
            <ul style="margin-left: 1.5em; padding-left: 1em;">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div style="margin-top: 1.5em;"></div>
            <b>Impact</b><br>${project.impact}
        `;
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
        const dotsContainer = slider.querySelector('.slider-dots');
        let current = 0;
        // Generate dots dynamically
        dotsContainer.innerHTML = '';
        images.forEach((_, i) => {
            const dot = document.createElement('span');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-slide', i);
            dot.addEventListener('click', function(e) {
                e.preventDefault();
                show(i);
            });
            dotsContainer.appendChild(dot);
        });
        const dots = dotsContainer.querySelectorAll('.dot');
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
        show(0);
    });

    // Featured project image hover swap
    document.querySelectorAll('.project-thumbnail[data-hover-src]').forEach(img => {
        const originalSrc = img.src;
        const hoverSrc = img.getAttribute('data-hover-src');
        img.addEventListener('mouseenter', () => {
            img.src = hoverSrc;
        });
        img.addEventListener('mouseleave', () => {
            img.src = originalSrc;
        });
    });

    // --- Modal image zoom ---
    const modalImgZoom = document.getElementById('modal-img-zoom');
    const modalImgZoomImg = document.getElementById('modal-img-zoom-img');
    const modalImgZoomClose = document.querySelector('.modal-img-zoom-close');
    // Delegate click to modal slider images
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-slider-image')) {
            modalImgZoomImg.src = e.target.src;
            modalImgZoom.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });
    if (modalImgZoomClose) modalImgZoomClose.addEventListener('click', function() {
        modalImgZoom.style.display = 'none';
        modalImgZoomImg.src = '';
        document.body.style.overflow = '';
    });
    if (modalImgZoom) modalImgZoom.addEventListener('click', function(e) {
        if (e.target === modalImgZoom) {
            modalImgZoom.style.display = 'none';
            modalImgZoomImg.src = '';
            document.body.style.overflow = '';
        }
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalImgZoom.style.display === 'flex') {
            modalImgZoom.style.display = 'none';
            modalImgZoomImg.src = '';
            document.body.style.overflow = '';
        }
    });

    // --- Slide-in-up Animation for Project Rows ---
    (function() {
      const rows = document.querySelectorAll('.project-row.slide-in-up');
      if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5, rootMargin: '0px 0px -80px 0px' });
        rows.forEach(row => observer.observe(row));
      } else {
        // Fallback for old browsers
        rows.forEach(row => row.classList.add('visible'));
      }
    })();
}); 