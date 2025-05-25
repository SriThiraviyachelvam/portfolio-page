/*———————————————————————————————*/
/* 1) Page Transitions */
/*———————————————————————————————*/
function PageTransitions() {
  const sections = document.querySelectorAll(".section");
  const sectBtns = document.querySelectorAll(".control");

  sectBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");

      const sectionId = this.dataset.id;
      sections.forEach((section) => section.classList.remove("active"));
      const targetSection = document.getElementById(sectionId);
      if (targetSection) targetSection.classList.add("active");
    });
  });
}

/*———————————————————————————————*/
/* 2) Countdowns */
/*———————————————————————————————*/
const countdownData = {
  bachelor: "2026-07-05",
  military: "2026-09-15",
  master: "2027-09-15",
  startup: "2030-10-20",
};
function initCountdowns() {
  document.querySelectorAll(".zukunft-item").forEach((item) => {
    const key = item.dataset.key;
    const targetDate = countdownData[key];
    if (!targetDate) return;

    let c = item.querySelector(".countdown");
    if (!c) {
      c = document.createElement("div");
      c.className = "countdown";
      item.querySelector(".zukunft-text").prepend(c);
    }
    updateCountdown(targetDate, c);
    setInterval(() => updateCountdown(targetDate, c), 1000);
  });
}
function updateCountdown(targetDateStr, el) {
  let icon = el.querySelector(".countdown-icon");
  let textSpan = el.querySelector(".countdown-text");

  if (!icon || !textSpan) {
    el.innerHTML = "";
    icon = document.createElement("span");
    textSpan = document.createElement("span");
    icon.className = "countdown-icon";
    textSpan.className = "countdown-text";
    icon.textContent = "⏳";
    el.append(icon, textSpan);
  }

  const now = new Date();
  const diff = new Date(targetDateStr) - now;
  if (diff <= 0) {
    textSpan.textContent = "Abgeschlossen 🎉";
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  const secStr = String(seconds).padStart(2, "0");
  textSpan.textContent = `${days} Tage ${hours}h ${minutes}m ${secStr}s`;
}

/*———————————————————————————————*/
/* 3) Formular-Validierung */
/*———————————————————————————————*/

// Hilfsfunktionen
function isValidEmail(val) {
  return /\S+@\S+\.\S+/.test(val);
}
function hasMinLength(val, min) {
  return val.trim().length >= min;
}
function setError(input, msg) {
  const err = input.nextElementSibling;
  if (err) err.textContent = msg;
  input.classList.add("invalid");
}
function clearError(input) {
  const err = input.nextElementSibling;
  if (err) err.textContent = "";
  input.classList.remove("invalid");
}
function showSuccess(msg) {
  const div = document.querySelector(".success-message");
  if (div) div.textContent = msg;
}

function initContactForm() {
  const form = document.querySelector(".kontakt-form");
  if (!form) return;
  form.setAttribute("novalidate", "");

  const fields = [
    { el: form.elements.name, min: 2, msg: "Bitte min. 2 Zeichen." },
    { el: form.elements.email, email: true, msg: "Ungültige E-Mail." },
    { el: form.elements.subject, min: 5, msg: "Betreff min. 5 Zeichen." },
    { el: form.elements.message, min: 15, msg: "Nachricht min. 15 Zeichen." },
  ];

  // Validierungsfunktion für ein einzelnes Feld
  function validateField({ el, min, email, msg }) {
    const span = el.nextElementSibling;
    let ok = true;

    if (email) {
      ok = /\S+@\S+\.\S+/.test(el.value);
    } else if (min) {
      ok = el.value.trim().length >= min;
    }

    // Reset
    el.classList.remove("invalid");
    span.classList.remove("valid");
    span.textContent = "";

    if (!ok) {
      el.classList.add("invalid");
      span.textContent = msg;
    } else {
      span.textContent = "✓";
      span.classList.add("valid");
    }

    return ok;
  }

  // 1) Live-Validation: bei jedem Tippen
  fields.forEach((field) => {
    field.el.addEventListener("input", () => validateField(field));
  });

  // 2) Final-Check beim Absenden
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let allValid = true;

    fields.forEach((field) => {
      const ok = validateField(field);
      if (!ok) allValid = false;
    });

    if (allValid) {
      form.reset();
      showSuccess("Danke, ich melde mich bei dir! 🎉");

      // Grüne Häkchen nach 3s wieder ausblenden
      setTimeout(() => {
        fields.forEach(({ el }) => {
          const span = el.nextElementSibling;
          span.textContent = "";
          span.classList.remove("valid");
        });
      }, 3000);
    }
  });
}

/*———————————————————————————————*/
/* 4) DOM ready */
/*———————————————————————————————*/
document.addEventListener("DOMContentLoaded", () => {
  PageTransitions();
  initCountdowns();
  initContactForm();
});
