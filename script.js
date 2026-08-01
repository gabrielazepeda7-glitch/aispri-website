// AISPRI — Preliminary website interactions

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const navLinks = [...document.querySelectorAll(".main-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  const form = document.getElementById("contact-form");
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

  // Close-to-real preliminary contact form behavior.
  // A live email/PHP/Formspree/etc. endpoint can be connected later.
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent =
      "Gracias. Este formulario es una versión preliminar; falta conectar el envío de mensajes.";
  });
});
