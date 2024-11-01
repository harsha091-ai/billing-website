document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("customerForm");
  const formTitle = document.getElementById("formTitle"); // New selector
  const servicesDropdown = document.getElementById("servicesDropdown");
  const servicesContent = document.getElementById("servicesContent");
  const acDetails = document.getElementById("acDetails");
  const diagnosisDropdown = document.getElementById("diagnosisDropdown");
  const diagnosisContent = document.getElementById("diagnosisContent");
  const initialDiagnosis = document.getElementById("initialDiagnosis");
  const sparePartsDropdown = document.getElementById("sparePartsDropdown");
  const sparePartsContent = document.getElementById("sparePartsContent");
  const spareParts = document.getElementById("spareParts");
  const backButton = document.getElementById("backButton");
  const wmDiagnosisDropdown = document.getElementById("wmDiagnosisDropdown");
  const wmDiagnosisContent = document.getElementById("wmDiagnosisContent");
  const wmSparePartsDropdown = document.getElementById("wmSparePartsDropdown");
  const wmSparePartsContent = document.getElementById("wmSparePartsContent");

  function toggleDropdown(dropdown, content) {
    content.style.display =
      content.style.display === "block" ? "none" : "block";
    dropdown.querySelector(".arrow").classList.toggle("up");
  }

  function closeDropdown(dropdown, content) {
    content.style.display = "none";
    dropdown.querySelector(".arrow").classList.remove("up");
  }

  function handleDropdownSelection(dropdown, content, callback) {
    content.addEventListener("click", function (e) {
      if (e.target.tagName === "BUTTON") {
        dropdown.querySelector("span").textContent = e.target.textContent;
        closeDropdown(dropdown, content);
        if (callback) callback(e.target);
      }
    });
  }

  // Services dropdown
  servicesDropdown.addEventListener("click", () =>
    toggleDropdown(servicesDropdown, servicesContent)
  );
  handleDropdownSelection(servicesDropdown, servicesContent, (target) => {
    acDetails.classList.add("hidden");
    wmDetails.classList.add("hidden");
    fridgeDetails.classList.add("hidden");
    autoDetails.classList.add("hidden");

    switch (target.dataset.service) {
      case "ac":
        acDetails.classList.remove("hidden");
        break;
      case "washing":
        wmDetails.classList.remove("hidden");
        break;
      case "fridge":
        fridgeDetails.classList.remove("hidden");
        break;
      case "automobile":
        autoDetails.classList.remove("hidden");
        break;
    }
  });

  // Diagnosis dropdown
  diagnosisDropdown.addEventListener("click", () =>
    toggleDropdown(diagnosisDropdown, diagnosisContent)
  );
  handleDropdownSelection(diagnosisDropdown, diagnosisContent, (target) => {
    initialDiagnosis.value = target.textContent;
  });

  // Spare Parts dropdown
  sparePartsDropdown.addEventListener("click", () =>
    toggleDropdown(sparePartsDropdown, sparePartsContent)
  );
  handleDropdownSelection(sparePartsDropdown, sparePartsContent, (target) => {
    spareParts.value = target.textContent;
  });

  // Close dropdowns when clicking outside
  window.addEventListener("click", function (e) {
    if (!servicesDropdown.contains(e.target)) {
      closeDropdown(servicesDropdown, servicesContent);
    }
    if (!diagnosisDropdown.contains(e.target)) {
      closeDropdown(diagnosisDropdown, diagnosisContent);
    }
    if (!sparePartsDropdown.contains(e.target)) {
      closeDropdown(sparePartsDropdown, sparePartsContent);
    }
  });

  // Add back button functionality
  backButton.addEventListener("click", function () {
    window.location.href = "../billsPage.html";
  });

  // Function to convert number to words
  function numberToWords(num) {
    const ones = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
    ];
    const tens = [
      "",
      "",
      "Twenty",
      "Thirty",
      "Forty",
      "Fifty",
      "Sixty",
      "Seventy",
      "Eighty",
      "Ninety",
    ];
    const teens = [
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ];

    function convertLessThanOneThousand(n) {
      if (n >= 100) {
        return (
          ones[Math.floor(n / 100)] +
          " Hundred " +
          convertLessThanOneThousand(n % 100)
        );
      }
      if (n >= 20) {
        return tens[Math.floor(n / 10)] + " " + ones[n % 10];
      }
      if (n >= 10) {
        return teens[n - 10];
      }
      return ones[n];
    }

    if (num === 0) return "Zero";

    let result = "";
    if (num >= 1000000) {
      result +=
        convertLessThanOneThousand(Math.floor(num / 1000000)) + " Million ";
      num %= 1000000;
    }
    if (num >= 1000) {
      result +=
        convertLessThanOneThousand(Math.floor(num / 1000)) + " Thousand ";
      num %= 1000;
    }
    result += convertLessThanOneThousand(num);

    return result.trim();
  }

  // Function to parse query parameters from the URL
  function getQueryParams() {
    const params = {};
    window.location.search
      .substring(1)
      .split("&")
      .forEach((pair) => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || "");
      });
    return params;
  }

  const queryParams = getQueryParams();
  const billType = queryParams.type
    ? queryParams.type.toLowerCase()
    : "quotation"; // Default to 'quotation' if not specified

  // Update the form title based on billType
  switch (billType) {
    case "sales":
      formTitle.textContent = "Sales Customer Details";
      break;
    case "purchase":
      formTitle.textContent = "Purchase Customer Details";
      break;
    case "quotation":
    default:
      formTitle.textContent = "Quotation Customer Details";
      break;
  }

  // Modify the PDF generation to use billType
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.service = servicesDropdown.querySelector("span").textContent;

    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add content to PDF based on billType
    let pdfTitle = "";
    switch (billType) {
      case "sales":
        pdfTitle = "Sales Bill";
        break;
      case "purchase":
        pdfTitle = "Purchase Bill";
        break;
      case "quotation":
      default:
        pdfTitle = "Quotation";
        break;
    }

    doc.setFontSize(16);
    doc.text(pdfTitle, 105, 15, null, null, "center");

    doc.setFontSize(12);
    doc.text("Duzo Kriston Pvt Ltd", 10, 25);
    doc.text("Krishna layout hullimavu", 10, 31);
    doc.text("City: Bengaluru, Karnataka", 10, 37);
    doc.text("State: Karnataka", 10, 43);
    doc.text("Code: 560082", 10, 49);

    doc.text("PURCHASER", 10, 60);
    doc.text(`Address: ${data.location}`, 10, 66);
    doc.text(`Name: ${data.name}`, 10, 72);
    doc.text(`Phone no: ${data.phone}`, 10, 78);

    // Create table
    doc.line(10, 85, 200, 85);
    doc.text("Sr", 12, 91);
    doc.text("Description of Goods", 25, 91);
    doc.text("Qty", 120, 91);
    doc.text("Rate", 140, 91);
    doc.text("Per", 160, 91);
    doc.text("Total", 180, 91);
    doc.line(10, 93, 200, 93);

    // Add service and spare parts details
    doc.text("1.", 12, 100);
    doc.text(`${data.service} - ${data.sparePartName}`, 25, 100);
    doc.text("1", 120, 100);
    doc.text(`${data.sparePartPrice}`, 140, 100);
    doc.text("Pc", 160, 100);
    doc.text(`${data.sparePartPrice}`, 180, 100);

    // Total line
    doc.line(10, 180, 200, 180);
    doc.text("Total", 25, 186);
    doc.text(`${data.sparePartPrice}`, 180, 186);

    // Amount in words
    const amountInWords =
      numberToWords(parseFloat(data.sparePartPrice)) + " Rupees Only";
    doc.text("Amount in words:", 10, 200);
    doc.text(amountInWords, 10, 206);

    // Bank details and signature
    doc.text("Our Bank:", 10, 220);
    doc.text("Account number:", 10, 226);
    doc.text("IFSC Code:", 10, 232);

    doc.text("For Duzo Kriston Pvt Ltd", 150, 220);
    doc.text("Authorised Sign", 150, 240);

    // Example: Adjust some content based on billType
    // You can customize further as needed
    if (billType === "sales") {
      // Add sales-specific content
    } else if (billType === "purchase") {
      // Add purchase-specific content
    }

    // Save the PDF
    doc.save(`${pdfTitle}.pdf`);

    // Optional: Alert the user
    alert(`Form submitted and ${pdfTitle} downloaded successfully!`);
  });

  // Add event listeners for new dropdowns
  wmDiagnosisDropdown.addEventListener("click", () =>
    toggleDropdown(wmDiagnosisDropdown, wmDiagnosisContent)
  );
  wmSparePartsDropdown.addEventListener("click", () =>
    toggleDropdown(wmSparePartsDropdown, wmSparePartsContent)
  );
});
