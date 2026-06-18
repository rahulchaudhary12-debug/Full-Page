// â”€â”€ NAVBAR SCROLL â”€â”€
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
  });

  // â”€â”€ PARTICLES â”€â”€
  const pContainer = document.getElementById('particles');
  if (pContainer) {
    for (let i = 0; i < 30; i++) {
      const d = document.createElement('div');
      d.className = 'p-dot';
      const size = Math.random() * 4 + 1;
      d.style.cssText = `
        width:${size}px; height:${size}px;
        left:${Math.random()*100}%;
        bottom:${Math.random()*10}%;
        animation-duration:${Math.random()*15+10}s;
        animation-delay:${Math.random()*15}s;
        background:${['#55f7d2','#8b5cf6','#ff4f87','#ffd166'][Math.floor(Math.random()*4)]};
      `;
      pContainer.appendChild(d);
    }
  }

  // â”€â”€ PAGE ROUTING â”€â”€
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById('page-' + id).classList.add('active');
    const lnk = document.getElementById('link-' + id);
    if (lnk) lnk.classList.add('active');
    window.scrollTo(0, 0);
    setTimeout(initReveal, 100);
    return false;
  }

  // â”€â”€ MOBILE NAV â”€â”€
  function toggleMobileNav() {
    document.getElementById('mobileNav').classList.toggle('open');
  }

  // â”€â”€ SCROLL REVEAL â”€â”€
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }
  initReveal();

  // â”€â”€ COUNT UP â”€â”€
  function countUp() {
    document.querySelectorAll('[data-target]').forEach(el => {
      const target = parseInt(el.dataset.target);
      const suffix = el.querySelector('span').textContent;
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.innerHTML = Math.floor(current).toLocaleString() + '<span>' + suffix + '</span>';
        if (current >= target) clearInterval(timer);
      }, 25);
    });
  }
  setTimeout(countUp, 800);

  // â”€â”€ LOGIN TABS â”€â”€
  function switchTab(tab) {
    document.querySelectorAll('.login-tab').forEach((t,i) => {
      t.classList.toggle('active', (tab === 'login' && i === 0) || (tab === 'register' && i === 1));
    });
    document.querySelectorAll('.login-form-section').forEach(s => s.classList.remove('active'));
    document.getElementById('tab-' + tab).classList.add('active');
  }

  // â”€â”€ TOAST â”€â”€
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
  }

  function submitContact() {
    const fields = ['cf-fname','cf-lname','cf-email','cf-course'];
    for (const id of fields) {
      if (!document.getElementById(id).value.trim()) {
        showToast('âš ï¸ Please fill all required fields');
        return;
      }
    }
    showToast('âœ“ Message sent! We\'ll reach out soon.');
    ['cf-fname','cf-lname','cf-email','cf-phone','cf-course','cf-msg'].forEach(id => {
      document.getElementById(id).value = '';
    });
  }

  function submitLogin()    { showToast('âœ“ Welcome back!'); }
  function submitRegister() { showToast('âœ“ Account created! Check your email.'); }
