// main.js
// Add your JavaScript here. For example, smooth scrolling or navigation logic.

console.log('Portfolio site loaded.');

// Robust nav bar: full at top, minimal on scroll up, hidden on scroll down, never flickers at top
let lastScrollY = window.scrollY;
const header = document.querySelector('header');
let ticking = false;
const buffer = 30;
let navState = 'full'; // 'full', 'minimal', 'hidden'

function handleHeaderScroll() {
    if (!header) return;
    const scrollY = window.scrollY;
    if (scrollY === 0) {
        // Only at the very top, show full nav
        header.classList.remove('nav-hidden', 'nav-minimal');
        navState = 'full';
    } else {
        // At any scroll position, show minimal nav
        header.classList.remove('nav-hidden');
        header.classList.add('nav-minimal');
        navState = 'minimal';
    }
    lastScrollY = scrollY;
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(handleHeaderScroll);
        ticking = true;
    }
});

// Highlight current page in nav
const navLinks = document.querySelectorAll('nav a');
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === 'index.html' && href.endsWith('index.html'))) {
        link.classList.add('nav-active');
    }
});

// Image zoom modal logic

document.addEventListener('DOMContentLoaded', function() {
  const imgZoomLinks = document.querySelectorAll('.img-zoom-link');
  const imgZoomModal = document.getElementById('img-zoom-modal');
  const imgZoomModalImg = document.getElementById('img-zoom-modal-img');
  const imgZoomClose = document.querySelector('.img-zoom-close');

  if (imgZoomLinks.length && imgZoomModal && imgZoomModalImg && imgZoomClose) {
    imgZoomLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const img = link.querySelector('img');
        imgZoomModalImg.src = img.src;
        imgZoomModal.style.display = 'flex';
        imgZoomModal.classList.remove('hidden');
        document.body.classList.add('img-zoom-open');
      });
    });
    imgZoomClose.addEventListener('click', function() {
      imgZoomModal.style.display = 'none';
      imgZoomModal.classList.add('hidden');
      imgZoomModalImg.src = '';
      document.body.classList.remove('img-zoom-open');
    });
    imgZoomModal.addEventListener('click', function(e) {
      if (e.target === imgZoomModal) {
        imgZoomModal.style.display = 'none';
        imgZoomModal.classList.add('hidden');
        imgZoomModalImg.src = '';
        document.body.classList.remove('img-zoom-open');
      }
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        imgZoomModal.style.display = 'none';
        imgZoomModal.classList.add('hidden');
        imgZoomModalImg.src = '';
        document.body.classList.remove('img-zoom-open');
      }
    });
  }
});

// Multi-line typewriter effect for intro
function runTypewriterIntro() {
    const lines = [
        "Hi, I’m Ong Xin Hui —",
        "a front-end developer passionate about",
        "crafting engaging, accessible web experiences."
    ];
    const el = document.getElementById('typewriter-intro');
    let line = 0, char = 0;
    function typeLine() {
        if (line < lines.length) {
            if (char < lines[line].length) {
                el.innerHTML = lines.slice(0, line).join('<br>') + (line > 0 ? '<br>' : '') + lines[line].slice(0, char + 1) + '<span class="caret">|</span>';
                char++;
                setTimeout(typeLine, 32);
            } else {
                char = 0;
                line++;
                setTimeout(typeLine, 400);
            }
        } else {
            el.innerHTML = lines.join('<br>');
        }
    }
    typeLine();
}
document.addEventListener('DOMContentLoaded', runTypewriterIntro);

// --- Scroll-triggered slide-in for hero-section only ---
function triggerSlideInOnScroll() {
  const heroSection = document.querySelector('.hero-section');
  if (!heroSection) return;
  const observer = new window.IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          heroSection.classList.add('slide-in-up');
          observer.unobserve(heroSection);
        }
      });
    },
    { threshold: 0.2 }
  );
  observer.observe(heroSection);
}

document.addEventListener('DOMContentLoaded', triggerSlideInOnScroll);

// --- Global scroll-triggered slide-in for all .slide-in-up elements ---
function globalSlideInOnScroll() {
  const slideEls = document.querySelectorAll('.slide-in-up');
  if (!slideEls.length) return;
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
}
document.addEventListener('DOMContentLoaded', globalSlideInOnScroll); 