const sections = document.querySelectorAll(".section");
const sectBtns = document.querySelectorAll(".control");
const allSections = document.querySelector(".main-content");

function PageTransitions() {
  sectBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelector(".active-btn").classList.remove("active-btn");
      this.classList.add("active-btn");

      const sectionId = this.dataset.id;

      sections.forEach((section) => {
        section.classList.remove("active");
      });

      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add("active");
      }
    });
  });
}

PageTransitions();
