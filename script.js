document.documentElement.classList.add("js");

const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const scrollLine = document.querySelector("[data-scroll-line]");

const closeNavigation = () => {
  if (!navToggle || !siteNav) return;
  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menú");
  body.classList.remove("nav-open");
};

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    body.classList.toggle("nav-open", isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeNavigation));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();
  });
}

let scrollTicking = false;

const paintScrollProgress = () => {
  if (scrollLine) {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = height > 0 ? window.scrollY / height : 0;
    scrollLine.style.transform = `scaleX(${Math.min(Math.max(ratio, 0), 1)})`;
  }
  scrollTicking = false;
};

const requestScrollPaint = () => {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(paintScrollProgress);
};

paintScrollProgress();
window.addEventListener("scroll", requestScrollPaint, { passive: true });
window.addEventListener("resize", requestScrollPaint);

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sections = Array.from(document.querySelectorAll("main section[id]"));

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const target = `#${entry.target.id}`;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute("href") === target;
          link.classList.toggle("active", isActive);
          if (isActive) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    },
    { rootMargin: "-42% 0px -48% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const contactForm = document.getElementById("contactForm");
const localHosts = new Set(["localhost", "127.0.0.1", "::1", "0.0.0.0"]);
const cooldownMs = 90 * 1000;
const storageKey = "portfolio-contact-last-submit";

const readLastSubmit = () => {
  try {
    return Number(window.localStorage.getItem(storageKey)) || 0;
  } catch {
    return 0;
  }
};

const saveLastSubmit = (value) => {
  try {
    window.localStorage.setItem(storageKey, String(value));
  } catch {
    // El formulario también funciona si el navegador bloquea localStorage.
  }
};

if (contactForm) {
  const button = contactForm.querySelector("button[type='submit']");
  const status = contactForm.querySelector(".form-status");
  const endpoint = contactForm.getAttribute("action");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!button || !status || !endpoint) return;

    const data = new FormData(contactForm);
    const honeypot = String(data.get("_gotcha") || "").trim();
    const isLocal =
      window.location.protocol === "file:" || localHosts.has(window.location.hostname);

    if (honeypot) {
      contactForm.reset();
      status.textContent = "Mensaje enviado. Gracias por escribir.";
      return;
    }

    if (isLocal) {
      contactForm.reset();
      status.textContent = "Prueba local completada: no se ha enviado ningún dato.";
      return;
    }

    const now = Date.now();
    const waitMs = cooldownMs - (now - readLastSubmit());

    if (waitMs > 0) {
      status.textContent = `Espera ${Math.ceil(waitMs / 1000)} s antes de volver a enviar.`;
      return;
    }

    button.disabled = true;
    button.firstChild.textContent = "Enviando… ";
    status.textContent = "";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Formspree respondió ${response.status}`);

      contactForm.reset();
      saveLastSubmit(now);
      status.textContent = "Mensaje enviado. Gracias por escribir.";
    } catch (error) {
      console.error(error);
      status.textContent = "No se pudo enviar. También puedes escribirme por email.";
    } finally {
      button.disabled = false;
      button.firstChild.textContent = "Enviar mensaje ";
    }
  });
}
