let currentLanguage = localStorage.getItem("selectedLanguage") || "en";
let translations = {};

async function loadTranslations() {
  try {
    const response = await fetch("translations.json");
    translations = await response.json();
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

function translate(key) {
  return translations[currentLanguage][key] || key;
}

function updatePageLanguage() {
  // Update language switcher
  const languageSwitcher = document.getElementById("languageSwitcher");
  if (languageSwitcher) {
    languageSwitcher.value = currentLanguage;
  }

  // Translate text content
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = translate(key);
  });

  // Translate placeholders
  document.querySelectorAll("input[placeholder]").forEach((input) => {
    const key = input.getAttribute("data-i18n-placeholder");
    if (key) {
      input.setAttribute("placeholder", translate(key));
    }
  });

  // Translate button texts
  document.querySelectorAll("button").forEach((button) => {
    const key = button.getAttribute("data-i18n");
    if (key) {
      button.textContent = translate(key);
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadTranslations();

  const languageSwitcher = document.getElementById("languageSwitcher");
  if (languageSwitcher) {
    languageSwitcher.addEventListener("change", (event) => {
      currentLanguage = event.target.value;
      localStorage.setItem("selectedLanguage", currentLanguage);
      updatePageLanguage();
    });
  }

  updatePageLanguage();
});
