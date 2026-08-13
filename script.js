// Intersection Observer for Reveal Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Ambient Background Animation (Subtle Particle System)
const canvas = document.getElementById('ambient-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.5 + 0.3;
            this.speedX = (Math.random() - 0.5) * 0.25;
            this.speedY = (Math.random() - 0.5) * 0.25;
            this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];
        const count = Math.floor((canvas.width * canvas.height) / 16000);
        for (let i = 0; i < count; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    initParticles();
    animate();
}

// Subtle Mouse Movement for Grid
const gridBg = document.querySelector('.grid-background');
if (gridBg) {
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        gridBg.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Explore Initiatives Smooth Scroll
const exploreBtn = document.getElementById('explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('projects');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Request Briefing Modal Functionality
const briefingModal = document.getElementById('briefing-modal');
const openBriefingBtn = document.getElementById('open-briefing-btn');
const footerContactBtn = document.getElementById('footer-contact-btn');
const closeBriefingBtn = document.getElementById('close-briefing-modal');
const briefingForm = document.getElementById('briefing-form');
const briefingFeedback = document.getElementById('briefing-feedback');

function openModal() {
    if (briefingModal) {
        briefingModal.classList.add('active');
        briefingModal.setAttribute('aria-hidden', 'false');
        const emailInput = document.getElementById('briefing-email');
        if (emailInput) emailInput.focus();
    }
}

function closeModal() {
    if (briefingModal) {
        briefingModal.classList.remove('active');
        briefingModal.setAttribute('aria-hidden', 'true');
        if (briefingFeedback) briefingFeedback.textContent = '';
    }
}

if (openBriefingBtn) openBriefingBtn.addEventListener('click', openModal);
if (footerContactBtn) footerContactBtn.addEventListener('click', openModal);
if (closeBriefingBtn) closeBriefingBtn.addEventListener('click', closeModal);

if (briefingModal) {
    briefingModal.addEventListener('click', (e) => {
        if (e.target === briefingModal) closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && briefingModal && briefingModal.classList.contains('active')) {
        closeModal();
    }
});

if (briefingForm) {
    briefingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('briefing-email');
        const email = emailInput ? emailInput.value : '';

        if (briefingFeedback) {
            briefingFeedback.className = 'form-feedback';
            briefingFeedback.textContent = 'TRANSMITTING INQUIRY...';

            setTimeout(() => {
                briefingFeedback.className = 'form-feedback success';
                briefingFeedback.textContent = `[CONFIRMED] Briefing registered for ${email}.`;
                briefingForm.reset();

                setTimeout(() => {
                    closeModal();
                }, 2200);
            }, 900);
        }
    });
}
