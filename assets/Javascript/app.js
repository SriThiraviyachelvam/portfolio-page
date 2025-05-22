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

const countdownData = {
  bachelor: "2026-07-05",
  military: "2026-08-15",
  master: "2027-09-15",
  startup: "2030-10-20",
};

function initCountdowns() {
  const items = document.querySelectorAll(".zukunft-item");
  items.forEach((item) => {
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
  const now = new Date();
  const target = new Date(targetDateStr);
  const diff = target - now;

  if (diff <= 0) {
    el.textContent = "Abgeschlossen 🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  el.textContent = `${days} Tage ${hours}h ${minutes}m ${seconds}s`;
}

document.addEventListener("DOMContentLoaded", () => {
  PageTransitions();
  initCountdowns();
});
