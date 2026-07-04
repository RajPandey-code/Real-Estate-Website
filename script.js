/* ============================================================
   REAL ESTATE – script.js
   Features:
     • Sticky navbar with scroll-triggered style change
     • Mobile hamburger menu toggle
     • Scroll-reveal for service cards
     • Smooth active nav link on scroll
     • Property card enter animation
   ============================================================ */

(function () {
  'use strict';

  /* ── Elements ──────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const allNavLinks = navLinks ? navLinks.querySelectorAll('a') : [];
  const sections = document.querySelectorAll('section[id]');
  const serviceCards = document.querySelectorAll('.service-card');
  const propertyCards = document.querySelectorAll('.property-card');

  /* ── Navbar scroll behaviour ───────────────────────────── */
  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    highlightActiveLink();
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  // Whatsapp float=====================

  document.querySelector(".whatsapp-float")
.addEventListener("click", function(){

    gtag('event', 'whatsapp_click');

});

// call btn=====================

document.querySelector(".btn.btn-primary")
.addEventListener("click", function(){

    gtag('event', 'phone_click');

});

// contact form=====================  

document.getElementById("contactForm")
.addEventListener("submit", function(){

    gtag('event', 'form_submit');

});

  /* ── Hamburger menu ─────────────────────────────────────── */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close when a link is tapped
    allNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Active nav link on scroll ─────────────────────────── */
  function highlightActiveLink() {
    let current = '';
    const offset = 120;

    sections.forEach(section => {
      const top = section.offsetTop - offset;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    allNavLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + current || (current === 'home' && href === '#')) {
        link.classList.add('active');
      }
    });
  }

  /* ── Scroll-reveal with IntersectionObserver ────────────── */
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  };

  // Service cards
  if ('IntersectionObserver' in window) {
    const serviceObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          serviceObserver.unobserve(entry.target);
        }
      });
    }, revealOptions);

    serviceCards.forEach(card => serviceObserver.observe(card));

    // Property cards — add a generic fade-up class via JS so CSS handles it
    propertyCards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(28px)';
      card.style.transition = `opacity 0.55s ease ${i * 0.12}s, transform 0.55s ease ${i * 0.12}s`;
    });

    const propObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          propObserver.unobserve(entry.target);
        }
      });
    }, revealOptions);

    propertyCards.forEach(card => propObserver.observe(card));

    // Testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateX(24px)';
      card.style.transition = `opacity 0.5s ease ${i * 0.15}s, transform 0.5s ease ${i * 0.15}s`;
    });

    const testObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'none';
          testObserver.unobserve(entry.target);
        }
      });
    }, revealOptions);

    testimonialCards.forEach(card => testObserver.observe(card));

  } else {
    // Fallback: show everything immediately
    serviceCards.forEach(card => card.classList.add('visible'));
    propertyCards.forEach(card => { card.style.opacity = '1'; card.style.transform = 'none'; });
  }

  /* ── Smooth anchor scroll (for browsers that don't support CSS scroll-behavior) */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--nav-h')) || 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Footer search ──────────────────────────────────────── */
  // const footerSearchBtn = document.querySelector('.footer-search button');
  // const footerSearchInput = document.querySelector('.footer-search input');

  // if (footerSearchBtn && footerSearchInput) {
  //   footerSearchBtn.addEventListener('click', () => {
  //     const query = footerSearchInput.value.trim();
  //     if (query) {
  //       // Scroll to properties section as a demo action
  //       const propSection = document.getElementById('properties');
  //       if (propSection) {
  //         propSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //       }
  //       footerSearchInput.value = '';
  //     }
  //   });

  //   footerSearchInput.addEventListener('keydown', e => {
  //     if (e.key === 'Enter') footerSearchBtn.click();
  //   });
  // }

  const successMessage = document.getElementById("successMessage");

  document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const sendBtn = document.getElementById("sendButton");
    sendBtn.textContent = "Sending...";
    sendBtn.disabled = true;

    try {
      const formData = new FormData(this);

      const response = await fetch("https://formspree.io/f/xbdvqdpo", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      sendBtn.textContent = "YOUR MESSAGE HAS BEEN SENT SUCCESSFULLY. WE WILL GET BACK TO YOU SOON.";

      setTimeout(() => {
        sendBtn.textContent = "Send Message";
        sendBtn.disabled = false;
      }, 3000);

      document.getElementById("contactForm").reset();

    } catch (error) {
      successMessage.style.display = "block";
      successMessage.style.color = "red";
      successMessage.textContent = "Failed to send message. Please try again.";

      sendBtn.textContent = "Send Message";
      sendBtn.disabled = false;
    }
  });
})();
