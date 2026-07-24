(function () {
  // Intro overlay — fade out once loaded
  function reveal() { document.body.classList.add("loaded"); }
  window.addEventListener("load", function () { setTimeout(reveal, 500); });
  setTimeout(reveal, 2600); // safety net

  // Nav background on scroll
  var nav = document.querySelector("header.nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Mobile menu
  var burger = document.querySelector(".hamburger");
  var menu = document.querySelector(".mobile-menu");
  var closeBtn = document.querySelector(".mm-close");
  function closeMenu() { if (menu) menu.classList.remove("open"); }
  if (burger && menu) burger.addEventListener("click", function () { menu.classList.add("open"); });
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  if (menu) menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });

  // Hero crossfade
  var slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      var i = 0;
      setInterval(function () {
        slides[i].classList.remove("active");
        i = (i + 1) % slides.length;
        slides[i].classList.add("active");
      }, 6000);
    }
  }

  // Reveal on scroll
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // Build Gmail compose links from split parts (avoids Cloudflare email obfuscation)
  document.querySelectorAll("a[data-gmail]").forEach(function (a) {
    var to = a.getAttribute("data-user") + "@" + a.getAttribute("data-domain");
    a.href = "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(to) +
      "&su=" + (a.getAttribute("data-su") || "") +
      "&body=" + (a.getAttribute("data-body") || "");
    a.target = "_blank";
    a.rel = "noopener";
  });
})();
