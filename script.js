// script.js

// Accordion toggle logic
const accordions = document.querySelectorAll(".accordion");
accordions.forEach((acc) => {
  acc.addEventListener("click", function () {
    this.classList.toggle("active");
    const panel = this.nextElementSibling;
    panel.style.display = panel.style.display === "block" ? "none" : "block";
  });
});

// Utility: Get checked protein+flavor combos
function getProteinFlavorCombos() {
  const combos = [];
  document.querySelectorAll("input[data-protein][data-flavor]:checked").forEach((cb) => {
    combos.push({
      protein: cb.getAttribute("data-protein"),
      flavor: cb.getAttribute("data-flavor"),
      desc: cb.getAttribute("data-desc")
    });
  });
  return combos;
}

// Utility: Get all checked values for other groups
function getCheckedValues(group) {
  return Array.from(document.querySelectorAll(`input[data-group='${group}']:checked`)).map(cb => cb.value);
}

// Update live preview field
function updatePreview() {
  const combos = getProteinFlavorCombos();
  const veggies = getCheckedValues("veggies");
  const grains = getCheckedValues("grains");

  const proteins = [...new Set(combos.map(c => c.protein))];

  const previewOutput = `Selected Base Choices:\n${proteins.join(", ") || "[none]"}\n${veggies.join(", ") || "[none]"}\n${grains.join(", ") || "[none]"}`;
  document.getElementById("previewOutput").textContent = previewOutput;
}

// Attach live updates to all checkboxes
document.querySelectorAll("input[type=checkbox]").forEach(cb => {
  cb.addEventListener("change", updatePreview);
});

// Generate grocery list only
function generatePlan() {
  const combos = getProteinFlavorCombos();
  const veggies = getCheckedValues("veggies");
  const grains = getCheckedValues("grains");
  const toppings = getCheckedValues("toppings");

  const grocerySet = new Set();
  combos.forEach(({ protein, flavor }) => {
    grocerySet.add(protein);
    grocerySet.add(flavor);
  });
  veggies.forEach(v => grocerySet.add(v));
  grains.forEach(g => grocerySet.add(g));
  toppings.forEach(t => grocerySet.add(t));

  document.getElementById("groceryListOutput").textContent = Array.from(grocerySet).sort().join("\n") || "Nothing selected.";

  updatePreview();
}