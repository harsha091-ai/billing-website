document.addEventListener("DOMContentLoaded", function () {
  const generateBillButton = document.querySelector(".generate-bill");
  const colorToggle = document.getElementById("colorToggle");
  const colorPalette = document.querySelector(".color-palette");
  const colorOptions = document.querySelectorAll(".color-option");
  const toggleSwitches = document.querySelectorAll(
    '.switch input[type="checkbox"]'
  );
  const sendBackupButton = document.querySelector(".send-backup");
  const facebookButton = document.querySelector(".facebook-button");
  const whatsappButton = document.querySelector(".whatsapp-button");
  const whatsappQueryButton = document.querySelector(".whatsapp-query");

  // Update text elements with data-i18n attributes
  // Example:
  // <h1 data-i18n="salesBill">Sales Bill (0)</h1>

  generateBillButton.addEventListener("click", function () {
    const selectedBillType = document.querySelector(
      'input[name="billType"]:checked'
    ).value;

    if (["sales", "purchase", "quotation"].includes(selectedBillType)) {
      // Redirect to Form.html with the selected bill type as a query parameter
      window.location.href = `./Form/Form.html?type=${selectedBillType}`;
    } else {
      alert("Generating bill...");
    }
  });

  colorToggle.addEventListener("change", function () {
    colorPalette.style.display = this.checked ? "flex" : "none";
  });

  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      document.documentElement.style.setProperty(
        "--primary-color",
        this.style.backgroundColor
      );
    });
  });

  toggleSwitches.forEach((toggle) => {
    toggle.addEventListener("change", function () {
      console.log(`${this.id} is now ${this.checked ? "on" : "off"}`);
    });
  });

  sendBackupButton.addEventListener("click", function () {
    alert("Sending backup...");
  });

  facebookButton.addEventListener("click", function () {
    alert("Sending Facebook request...");
  });

  whatsappButton.addEventListener("click", function () {
    alert("Sharing app to WhatsApp groups...");
  });

  whatsappQueryButton.addEventListener("click", function () {
    alert("Opening WhatsApp to send query...");
  });
});
