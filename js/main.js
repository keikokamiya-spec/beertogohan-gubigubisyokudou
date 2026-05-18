const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const revealTargets = document.querySelectorAll(".reveal");
const menuSlider = document.querySelector("[data-menu-slider]");

const updateHeader = () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

if (nav && navToggle) {
  const closeNav = () => {
    nav.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "メニューを開く");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.classList.toggle("is-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeNav();
    });
  });

  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(event.target) || navToggle.contains(event.target)) return;
    closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });
}

if (menuSlider) {
  const menuTrack = menuSlider.querySelector(".menu-grid");
  const prevButton = menuSlider.querySelector("[data-menu-prev]");
  const nextButton = menuSlider.querySelector("[data-menu-next]");

  const slideMenu = (direction) => {
    const activeCard = menuTrack?.querySelector(".menu-card");
    if (!menuTrack || !activeCard) return;

    const gap = parseFloat(window.getComputedStyle(menuTrack).columnGap) || 0;
    const slideWidth = activeCard.getBoundingClientRect().width + gap;
    menuTrack.scrollBy({ left: slideWidth * direction, behavior: "smooth" });
  };

  prevButton?.addEventListener("click", () => slideMenu(-1));
  nextButton?.addEventListener("click", () => slideMenu(1));
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.12,
  }
);

revealTargets.forEach((target) => observer.observe(target));
