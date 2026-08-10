const PASSWORD = "Fateme2211";

const loginScreen = document.getElementById("loginScreen");
const mainSite = document.getElementById("mainSite");
const passwordInput = document.getElementById("passwordInput");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

const mainMusic = document.getElementById("mainMusic");
const birthdayMusic = document.getElementById("birthdayMusic");

const surpriseModal = document.getElementById("surpriseModal");
const openSurprise = document.getElementById("openSurprise");
const closeSurprise = document.getElementById("closeSurprise");
const closeSurpriseBottom = document.getElementById("closeSurpriseBottom");
const surpriseIntro = document.getElementById("surpriseIntro");
const surpriseContent = document.getElementById("surpriseContent");

const continueBtn = document.getElementById("continueBtn");
const endingLine = document.getElementById("endingLine");

function login() {
  const value = passwordInput.value.trim();

  if (value === PASSWORD) {
    loginError.classList.remove("show");
    loginScreen.classList.add("hidden");
    mainSite.classList.remove("hidden");

    document.body.classList.remove("modal-open");

    // شروع آهنگ اصلی بعد از کلیک کاربر؛ بنابراین محدودیت autoplay مرورگر مانعش نمی‌شود.
    mainMusic.currentTime = 0;
    mainMusic.play().catch(() => {});

    initReveal();
    window.scrollTo({ top: 0, behavior: "instant" });
  } else {
    loginError.classList.add("show");
    passwordInput.select();
  }
}

loginBtn.addEventListener("click", login);

passwordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") login();
});

function initReveal() {
  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  items.forEach((item) => observer.observe(item));
}

continueBtn.addEventListener("click", () => {
  endingLine.classList.remove("hidden-line");
  endingLine.classList.add("visible");

  setTimeout(() => {
    openModal();
  }, 1700);
});

function openModal() {
  surpriseModal.classList.remove("hidden");
  document.body.classList.add("modal-open");
  surpriseIntro.classList.remove("hidden");
  surpriseContent.classList.add("hidden");
}

function closeModal() {
  surpriseModal.classList.add("hidden");
  document.body.classList.remove("modal-open");

  birthdayMusic.pause();
  birthdayMusic.currentTime = 0;

  mainMusic.play().catch(() => {});
}

openSurprise.addEventListener("click", () => {
  surpriseIntro.classList.add("hidden");
  surpriseContent.classList.remove("hidden");

  mainMusic.pause();
  birthdayMusic.currentTime = 0;
  birthdayMusic.play().catch(() => {});
});

closeSurprise.addEventListener("click", closeModal);
closeSurpriseBottom.addEventListener("click", closeModal);

surpriseModal.addEventListener("click", (event) => {
  if (event.target.classList.contains("modal-backdrop")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !surpriseModal.classList.contains("hidden")) {
    closeModal();
  }
});
