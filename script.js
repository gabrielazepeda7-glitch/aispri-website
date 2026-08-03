// AISPRI — Preliminary website interactions

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("site-ready");

  const splashScreen = document.getElementById("splash-screen");
  const header = document.getElementById("site-header");
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const formNote = document.getElementById("form-note");

  // Keep the navigation highlight synchronized with the section currently visible.
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach(link => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === `#${visible.target.id}`
        );
      });
    },
    {
      rootMargin: `-${header.offsetHeight}px 0px -45% 0px`,
      threshold: [0.1, 0.25, 0.5]
    }
  );

  sections.forEach(section => observer.observe(section));

  if (splashScreen) {
    window.setTimeout(() => {
      splashScreen.classList.add("is-hidden");
      splashScreen.addEventListener("animationend", () => {
        splashScreen.remove();
      }, { once: true });
    }, 1200);
  }

  const menuToggle = document.getElementById("menu-toggle");
  const siteHeader = document.getElementById("site-header");

  menuToggle.addEventListener("click", () => {
    const isOpen = siteHeader.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      siteHeader.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("scroll", () => {
    if (siteHeader.classList.contains("menu-open")) {
      siteHeader.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

});
