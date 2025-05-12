const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");

function PageTransitions() {
  // Navigation Buttons
  sectBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // Remove active-btn from previous
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");

      // Get target section id
      const sectionId = this.dataset.id;

      // Hide all sections
      sections.forEach((section) => {
        section.classList.remove("active");
      });

      // Show selected section
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add("active");
      }
    });
  });
}

PageTransitions();
