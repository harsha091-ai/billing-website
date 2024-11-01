document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");
  const nextButton = document.querySelector(".next-button");
  const backButton = document.querySelector(".back-button");
  const restoreBackupButton = document.getElementById("restoreBackup");

  // Set default business name
  document.getElementById("businessName").value = "Duzo";

  // Update text elements with data-i18n attributes
  // Example:
  // <h1 data-i18n="register">Register</h1>

  nextButton.addEventListener("click", function (e) {
    e.preventDefault();
    if (form.checkValidity()) {
      // Form is valid, redirect to billsPage.html
      window.location.href = "billsPage.html";
    } else {
      alert("Please fill in all required fields.");
    }
  });

  backButton.addEventListener("click", function () {
    if (
      confirm(
        "Are you sure you want to go back? Your entered data will be lost."
      )
    ) {
      form.reset();
      document.getElementById("businessName").value = "Duzo";
    }
  });

  restoreBackupButton.addEventListener("click", function () {
    if (
      confirm(
        "Are you sure you want to restore from backup? This will overwrite any entered data."
      )
    ) {
      alert("Restore backup functionality not implemented in this demo.");
      // Here you would typically implement the backup restoration logic
    }
  });

  function validateMobileNumber(number) {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(number);
  }

  // Prevent form submission on enter key
  form.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  });
});
