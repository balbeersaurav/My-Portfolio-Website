/* =========================================================
   BALBEER KUMAR SAURAV — PORTFOLIO SCRIPT
   Vanilla JS only — no frameworks/libraries
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Page Loader ---------- */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 250);
    });
    // fallback in case 'load' already fired
    setTimeout(() => loader.classList.add('hidden'), 1800);
  }

  /* ---------- Sticky Navbar ---------- */
  const navbar = document.querySelector('.navbar');
  function handleNavScroll() {
    if (!navbar) return;
    if (window.scrollY > 12) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  }
  handleNavScroll();
  window.addEventListener('scroll', handleNavScroll);

  /* ---------- Active Nav Link ---------- */
  const currentPage = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---------- Mobile Hamburger Menu ---------- */
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
    navMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  /* ---------- Dark Mode Toggle ---------- */
  const themeToggle = document.querySelector('.theme-toggle');
  const root = document.body;
  const savedTheme = localStorage.getItem('bks-theme');
  if (savedTheme === 'dark') root.classList.add('dark-mode');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      root.classList.toggle('dark-mode');
      localStorage.setItem('bks-theme', root.classList.contains('dark-mode') ? 'dark' : 'light');
    });
  }

  /* ---------- Smooth Scroll for in-page anchors ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = (document.querySelector('.navbar')?.offsetHeight || 0) + 10;
          window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
        }
      }
    });
  });

  /* ---------- Typing Effect (Hero role line) ---------- */
  const typedEl = document.querySelector('.typed-text');
  if (typedEl) {
    const roles = JSON.parse(typedEl.getAttribute('data-roles') || '[]');
    let roleIndex = 0, charIndex = 0, deleting = false;

    function typeLoop() {
      const current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1400);
          return;
        }
        setTimeout(typeLoop, 78);
      } else {
        charIndex--;
        typedEl.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(typeLoop, 350);
          return;
        }
        setTimeout(typeLoop, 38);
      }
    }
    if (roles.length) typeLoop();
  }

  /* ---------- Scroll Reveal Animations ---------- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ---------- Counter Animation ---------- */
  const counters = document.querySelectorAll('[data-counter]');
  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1600;
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if (counters.length) {
    if ('IntersectionObserver' in window) {
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(c => counterObserver.observe(c));
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* ---------- Progress Bar Animation (Skills page) ---------- */
  const progressBars = document.querySelectorAll('.progress-fill');
  if (progressBars.length) {
    const pbObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fill = entry.target;
          const pct = fill.getAttribute('data-pct') || '0';
          requestAnimationFrame(() => { fill.style.width = pct + '%'; });
          pbObserver.unobserve(fill);
        }
      });
    }, { threshold: 0.3 });
    progressBars.forEach(bar => pbObserver.observe(bar));
  }

  /* ---------- Circular Skill Indicators ---------- */
  const circles = document.querySelectorAll('.circle-fg');
  if (circles.length) {
    const circleObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const circle = entry.target;
          const pct = parseFloat(circle.getAttribute('data-pct') || '0');
          const radius = circle.r.baseVal.value;
          const circumference = 2 * Math.PI * radius;
          const offset = circumference - (pct / 100) * circumference;
          circle.style.strokeDasharray = circumference;
          requestAnimationFrame(() => { circle.style.strokeDashoffset = offset; });
          circleObserver.unobserve(circle);
        }
      });
    }, { threshold: 0.4 });
    circles.forEach(c => circleObserver.observe(c));
  }

  /* ---------- Back To Top ---------- */
  const backToTop = document.querySelector('.back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 480) backToTop.classList.add('show');
      else backToTop.classList.remove('show');
    });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ---------- Floating Labels (Contact form) ---------- */
  document.querySelectorAll('.field input, .field textarea').forEach(input => {
    const field = input.closest('.field');
    const sync = () => field.classList.toggle('filled', input.value.trim() !== '');
    input.addEventListener('input', sync);
    sync();
  });

  /* ---------- Contact Form Validation ---------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const status = document.getElementById('form-status');

    function setError(field, message) {
      const wrapper = field.closest('.field');
      wrapper.classList.add('invalid');
      const err = wrapper.querySelector('.err');
      if (err) err.textContent = message;
    }
    function clearError(field) {
      field.closest('.field').classList.remove('invalid');
    }

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const name = contactForm.querySelector('#name');
      const email = contactForm.querySelector('#email');
      const phone = contactForm.querySelector('#phone');
      const message = contactForm.querySelector('#message');

      [name, email, phone, message].forEach(clearError);

      if (!name.value.trim() || name.value.trim().length < 2) {
        setError(name, 'Please enter your full name.'); valid = false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        setError(email, 'Please enter a valid email address.'); valid = false;
      }
      const phonePattern = /^[0-9+\-\s]{8,15}$/;
      if (!phonePattern.test(phone.value.trim())) {
        setError(phone, 'Please enter a valid phone number.'); valid = false;
      }
      if (!message.value.trim() || message.value.trim().length < 8) {
        setError(message, 'Message should be at least 8 characters.'); valid = false;
      }

      if (!valid) {
        if (status) {
          status.textContent = 'Please fix the highlighted fields above.';
          status.className = 'form-status show';
        }
        return;
      }

      // All fields are valid — actually send the email via FormSubmit (no backend needed).
      const submitBtn = document.getElementById('submit-btn');
      const btnLabel = submitBtn ? submitBtn.querySelector('.btn-label') : null;
      const endpoint = 'https://formsubmit.co/ajax/balbeerkumarsaurav@gmail.com';

      const payload = {
        name: name.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        message: message.value.trim(),
        _subject: 'New message from your portfolio website',
        _template: 'table',
        _captcha: 'false'
      };

      if (submitBtn) { submitBtn.disabled = true; }
      if (btnLabel) { btnLabel.textContent = 'Sending...'; }

      fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(res => res.json())
        .then(() => {
          if (status) {
            status.textContent = 'Thank you! Your message has been sent — Balbeer will get back to you soon.';
            status.className = 'form-status show success';
          }
          contactForm.reset();
          contactForm.querySelectorAll('.field').forEach(f => f.classList.remove('filled'));
        })
        .catch(() => {
          if (status) {
            status.textContent = 'Something went wrong sending your message. Please email balbeerkumarsaurav@gmail.com directly.';
            status.className = 'form-status show';
          }
        })
        .finally(() => {
          if (submitBtn) { submitBtn.disabled = false; }
          if (btnLabel) { btnLabel.textContent = 'Send Message'; }
        });
    });
  }

  /* ---------- Skills Tabs Filter (Skills page) ---------- */
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');
  if (skillTabs.length) {
    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        skillTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const cat = tab.getAttribute('data-cat');
        skillCards.forEach(card => {
          const show = cat === 'all' || card.getAttribute('data-cat') === cat;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }

});
