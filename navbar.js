// ─── navbar.js — منوی مشترک بریجینو ───
// این فایل را در همه صفحات با <script src="navbar.js"></script> include کنید

(function () {
  // ── تشخیص صفحه فعلی برای active کردن لینک مربوطه ──
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  const navItems = [
    { href: 'index.html', label: 'خانه' },
    { href: 'about.html', label: 'درباره ما' },
    { href: 'level-test.html', label: 'تعیین سطح' },
    { href: 'consultation.html', label: 'مشاوره' },
    { href: 'courses.html', label: 'دوره‌ها' },
    { href: 'calendar.html', label: 'تقویم ترمی' },
    { href: 'news.html', label: 'معرفی اساتید' },
    { href: 'social.html', label: 'شبکه‌های اجتماعی' },
    { href: 'contact.html', label: 'تماس با ما' },
  ];

  const isActive = href => href === currentPage ? ' class="active"' : '';

  // ── ساخت HTML منو ──
  const navbarHTML = `
    <nav class="navbar" id="navbar">
      <a href="index.html" class="nav-logo">بریجینو</a>
      <ul class="nav-links">
        ${navItems.map(item => `<li><a href="${item.href}"${isActive(item.href)}>${item.label}</a></li>`).join('')}
      </ul>
      <div class="hamburger" id="hamburger" onclick="toggleBridgeMenu()">
        <span></span><span></span><span></span>
      </div>
    </nav>

    <div class="mobile-menu" id="mobile-menu">
      ${navItems.map(item => `<a href="${item.href}"${isActive(item.href)}>${item.label}</a>`).join('')}
    </div>
  `;

  // ── استایل منو — دقیقاً مثل index.html ──
  const navbarCSS = `
    .navbar {
      position: fixed; top: 0; right: 0; left: 0; z-index: 1000;
      padding: 0 40px;
      height: 70px;
      display: flex; align-items: center; justify-content: space-between;
      background: rgba(255,255,255,0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid rgba(26,58,110,0.08);
      transition: all 0.3s;
      font-family: 'Vazirmatn', sans-serif;
      direction: rtl;
    }
    .navbar.scrolled { background: #fff; box-shadow: 0 2px 20px rgba(26,58,110,0.10); }
    .nav-logo {
      font-family: 'Playfair Display', serif;
      font-size: 24px; font-weight: 700;
      background: linear-gradient(135deg, #1A3A6E, #C0392B);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      text-decoration: none;
    }
    .nav-links { display: flex; align-items: center; gap: 6px; list-style: none; margin: 0; padding: 0; }
    .nav-links a {
      font-size: 14px; font-weight: 500; color: #4A5568; text-decoration: none;
      padding: 8px 12px; border-radius: 8px; transition: all 0.2s;
    }
    .nav-links a:hover { color: #1A3A6E; background: rgba(26,58,110,0.06); }
    .nav-links a.active { color: #1A3A6E; font-weight: 700; }
    .hamburger { display: none; flex-direction: column; gap: 5px; cursor: pointer; padding: 4px; }
    .hamburger span { display: block; width: 24px; height: 2px; background: #1A3A6E; border-radius: 2px; }
    .mobile-menu {
      display: none; position: fixed; top: 70px; right: 0; left: 0; z-index: 999;
      background: #fff; border-bottom: 1px solid #eee; padding: 16px; flex-direction: column; gap: 4px;
      font-family: 'Vazirmatn', sans-serif;
    }
    .mobile-menu a {
      font-size: 15px; font-weight: 500; color: #4A5568; text-decoration: none;
      padding: 12px 16px; border-radius: 10px; transition: all 0.2s; display: block;
    }
    .mobile-menu a:hover { background: #EEF4FF; color: #1A3A6E; }
    .mobile-menu a.active { background: #EEF4FF; color: #1A3A6E; font-weight: 700; }
    .mobile-menu.open { display: flex; }

    @media(max-width:768px){
      .navbar { padding: 0 20px; }
      .nav-links { display: none; }
      .hamburger { display: flex; }
    }
  `;

  // ── تزریق استایل ──
  const styleTag = document.createElement('style');
  styleTag.textContent = navbarCSS;
  document.head.appendChild(styleTag);

  // ── تزریق فونت‌ها (در صورت نبودن) ──
  if (!document.querySelector('link[href*="Vazirmatn"]')) {
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,400&display=swap';
    document.head.appendChild(fontLink);
  }

  // ── تزریق HTML منو در ابتدای body ──
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

  // ── افزودن padding-top به body تا محتوا زیر navbar قایم نشود ──
  document.body.style.paddingTop = document.querySelector('.hero, .page-hero') ? '0' : '70px';

  // ── رفتار اسکرول ──
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ── منوی موبایل ──
  window.toggleBridgeMenu = function () {
    document.getElementById('mobile-menu').classList.toggle('open');
  };
})();