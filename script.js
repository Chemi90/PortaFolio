document.documentElement.classList.add("js");

const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const scrollProgress = document.querySelector(".scroll-progress span");

const updateScrollProgress = () => {
  if (!scrollProgress) {
    return;
  }

  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  scrollProgress.style.transform = `scaleX(${Math.min(Math.max(progress, 0), 1)})`;
};

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    body.classList.toggle("nav-open", isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Abrir menú");
      body.classList.remove("nav-open");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const sections = Array.from(document.querySelectorAll("section[id]"));

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-42% 0px -46% 0px", threshold: 0.01 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

const heroVisual = document.querySelector("[data-hero-visual]");
const canUsePointerMotion =
  heroVisual &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canUsePointerMotion) {
  heroVisual.addEventListener("pointermove", (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroVisual.style.setProperty("--tilt-x", `${y * -5}deg`);
    heroVisual.style.setProperty("--tilt-y", `${x * 6}deg`);
  });

  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.setProperty("--tilt-x", "0deg");
    heroVisual.style.setProperty("--tilt-y", "0deg");
  });
}

const contactForm = document.getElementById("contactForm");
const localContactHosts = new Set(["localhost", "127.0.0.1", "::1", "0.0.0.0"]);
const contactSubmitCooldownMs = 90 * 1000;
const contactSubmitStorageKey = "portfolio-contact-last-submit";

const getLastContactSubmitAt = () => {
  try {
    return Number(window.localStorage.getItem(contactSubmitStorageKey)) || 0;
  } catch (error) {
    return 0;
  }
};

const setLastContactSubmitAt = (value) => {
  try {
    window.localStorage.setItem(contactSubmitStorageKey, String(value));
  } catch (error) {
    // Ignore browsers where localStorage is unavailable.
  }
};

if (contactForm) {
  const submitButton = contactForm.querySelector("button[type='submit']");
  const status = contactForm.querySelector(".form-status");
  const formEndpoint = contactForm.getAttribute("action");

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!submitButton || !status) {
      return;
    }

    const formData = new FormData(contactForm);
    const honeypotValue = String(formData.get("_gotcha") || "").trim();
    const isLocalSubmit =
      window.location.protocol === "file:" || localContactHosts.has(window.location.hostname);

    if (honeypotValue) {
      contactForm.reset();
      status.textContent = "Mensaje enviado correctamente. Gracias por escribir.";
      return;
    }

    if (isLocalSubmit) {
      console.info("Formulario simulado en entorno local.", Object.fromEntries(formData));
      contactForm.reset();
      status.textContent = "Modo local: envio simulado. No se ha enviado a Formspree.";
      return;
    }

    const now = Date.now();
    const lastSubmitAt = getLastContactSubmitAt();
    const waitMs = contactSubmitCooldownMs - (now - lastSubmitAt);

    if (waitMs > 0) {
      status.textContent = `Espera ${Math.ceil(waitMs / 1000)} s antes de volver a enviar.`;
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Enviando...";
    status.textContent = "";

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Formspree request failed");
      }

      contactForm.reset();
      setLastContactSubmitAt(now);
      status.textContent = "Mensaje enviado correctamente. Gracias por escribir.";
    } catch (error) {
      console.error(error);
      status.textContent = "No se pudo enviar ahora. Puedes escribirme por email.";
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar mensaje";
    }
  });
}
