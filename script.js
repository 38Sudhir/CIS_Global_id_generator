// ====================================
// ELEMENTS
// ====================================

const photoInput = document.getElementById("photoInput");

const nameInput = document.getElementById("name");
const idInput = document.getElementById("idno");
const designationInput = document.getElementById("designation");
const issueDateInput = document.getElementById("issueDate");
const mobileInput = document.getElementById("mobile");
const addressInput = document.getElementById("address");

const previewPhoto = document.getElementById("previewPhoto");
const previewName = document.getElementById("previewName");
const previewID = document.getElementById("previewID");
const previewDesignation = document.getElementById("previewDesignation");
const previewIssue = document.getElementById("previewIssue");
const previewMobile = document.getElementById("previewMobile");
const previewAddress = document.getElementById("previewAddress");

const printBtn = document.getElementById("printBtn");
const pdfBtn = document.getElementById("pdfBtn");

// ====================================
// IMAGE PREVIEW
// ====================================

photoInput.addEventListener("change", function () {

    if (!this.files.length) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        previewPhoto.src = e.target.result;

    };

    reader.readAsDataURL(this.files[0]);

});

// ====================================
// NAME
// ====================================

nameInput.addEventListener("input", function () {

    let value = this.value.trim();

    if (value === "")
        value = "EMPLOYEE NAME";

    previewName.innerHTML = value.toUpperCase();

    // Auto font resize

    if (value.length > 25)
        previewName.style.fontSize = "13px";
    else if (value.length > 18)
        previewName.style.fontSize = "15px";
    else
        previewName.style.fontSize = "17px";

});

// ====================================
// ID NUMBER
// ====================================

idInput.addEventListener("input", function () {

    let value = this.value.trim();

    if (value === "")
        value = "CIS/001";

    previewID.innerHTML = value.toUpperCase();

});

// ====================================
// DESIGNATION
// ====================================

designationInput.addEventListener("input", function () {

    let value = this.value.trim();

    if (value === "")
        value = "TECHNICIAN";

    previewDesignation.innerHTML = value;

});

// ====================================
// DATE
// ====================================

issueDateInput.addEventListener("change", function () {

    if (this.value === "") {

        previewIssue.innerHTML = "DD-MM-YYYY";

        return;

    }

    const d = new Date(this.value);

    const day = String(d.getDate()).padStart(2, '0');

    const month = String(d.getMonth() + 1).padStart(2, '0');

    const year = d.getFullYear();

    previewIssue.innerHTML = `${day}-${month}-${year}`;

});

// ====================================
// MOBILE
// ====================================

mobileInput.addEventListener("input", function () {

    this.value = this.value.replace(/\D/g, "");

    if (this.value.length > 10)
        this.value = this.value.substring(0, 10);

    previewMobile.innerHTML =
        this.value === "" ? "9876543210" : this.value;

});

// ====================================
// ADDRESS
// ====================================

addressInput.addEventListener("input", function () {

    let value = this.value.trim();

    if (value === "")
        value = "Employee Address";

    previewAddress.innerHTML =
        value.replace(/\n/g, "<br>");

});

// ====================================
// PRINT
// ====================================

printBtn.addEventListener("click", () => {

    window.print();

});

// ====================================
// PDF DOWNLOAD
// ====================================

pdfBtn.addEventListener("click", async () => {

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF("p", "mm", "a4");

    const front = document.getElementById("frontCard");

    const back = document.getElementById("backCard");

    const frontCanvas = await html2canvas(front, {

        scale: 3,

        useCORS: true

    });

    const backCanvas = await html2canvas(back, {

        scale: 3,

        useCORS: true

    });

    const frontImage = frontCanvas.toDataURL("image/png");

    const backImage = backCanvas.toDataURL("image/png");

    pdf.addImage(

        frontImage,

        "PNG",

        15,

        15,

        85,

        136

    );

    pdf.addImage(

        backImage,

        "PNG",

        110,

        15,

        85,

        136

    );

    let filename = previewName.innerText;

    if (filename === "")
        filename = "Employee";

    pdf.save(filename + "_ID_Card.pdf");

});

// ====================================
// DEFAULT VALUES
// ====================================

previewName.innerHTML = "EMPLOYEE NAME";
previewID.innerHTML = "CIS/001";
previewDesignation.innerHTML = "TECHNICIAN";
previewIssue.innerHTML = "DD-MM-YYYY";
previewMobile.innerHTML = "9876543210";
previewAddress.innerHTML = "Employee Address";