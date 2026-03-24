const menuToggle = document.getElementById("menuToggle");
const globalNav = document.getElementById("globalNav");

if (menuToggle && globalNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = globalNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  globalNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      globalNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

const fadeItems = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

fadeItems.forEach((item) => observer.observe(item));

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");

if (lightbox && lightboxImage && lightboxCaption && lightboxClose) {
  document.querySelectorAll("[data-lightbox]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      lightboxImage.src = link.getAttribute("href") || "";
      lightboxImage.alt = link.dataset.lightbox || "拡大画像";
      lightboxCaption.textContent = link.dataset.lightbox || "";
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImage.src = "";
    document.body.style.overflow = "";
  };

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

// Gallery Auto Slideshow
const galleryGrid = document.querySelector(".gallery-grid");
if (galleryGrid) {
  let scrollAmount = 0;
  const slideStep = 300; // Approximate width of one item
  const interval = 4000;

  const autoScroll = () => {
    const maxScroll = galleryGrid.scrollWidth - galleryGrid.clientWidth;
    if (galleryGrid.scrollLeft >= maxScroll - 10) {
      galleryGrid.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      galleryGrid.scrollBy({ left: slideStep, behavior: "smooth" });
    }
  };

  let scrollInterval = setInterval(autoScroll, interval);

  // Pause on hover
  galleryGrid.addEventListener("mouseenter", () => clearInterval(scrollInterval));
  galleryGrid.addEventListener("mouseleave", () => {
    scrollInterval = setInterval(autoScroll, interval);
  });
}
