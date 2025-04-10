document.addEventListener("DOMContentLoaded", function() {
  const imageInput = document.getElementById("imageInput");
  const analysisSection = document.getElementById("analysisSection");
  const analysisText = document.getElementById("analysisText");
  const recommendationsSection = document.getElementById("recommendationsSection");

  const confirmBtn = document.getElementById("confirmBtn");
  const editBtn = document.getElementById("editBtn");
  const editForm = document.getElementById("editForm");
  const saveEditBtn = document.getElementById("saveEditBtn");
  const skinTypeInput = document.getElementById("skinTypeInput");
  const skinColorInput = document.getElementById("skinColorInput");

  // Brand/Product form
  const brandProductForm = document.getElementById("brandProductForm");
  const submitSelectionBtn = document.getElementById("submitSelectionBtn");

  // Variables to hold 'AI identified' values:
  let identifiedSkinType = "";
  let identifiedSkinColor = "";

  // 1. Listen for file upload:
  imageInput.addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return; // If no file, do nothing

    // Hide everything initially
    analysisSection.classList.add("hidden");
    recommendationsSection.classList.add("hidden");
    editForm.classList.add("hidden");
    brandProductForm.classList.add("hidden");

    const fileName = file.name.toLowerCase();

    // 2. Check file name. Example logic for ID1 vs ID2:
    if (fileName.includes("id1")) {
      identifiedSkinType = "Oily";
      identifiedSkinColor = "Medium";
    } else if (fileName.includes("id2")) {
      identifiedSkinType = "Dry";
      identifiedSkinColor = "Fair";
    } else {
      // Default or unrecognized
      identifiedSkinType = "Mixed";
      identifiedSkinColor = "Light Skin";
    }

    // Show the analysis section
    analysisSection.classList.remove("hidden");
    analysisText.textContent = `Our analysis suggests you have ${identifiedSkinType} skin and a ${identifiedSkinColor} tone. Is that correct?`;
  });

  // 3. If user confirms
  confirmBtn.addEventListener("click", function() {
    // Hide analysis section
    analysisSection.classList.add("hidden");
    // Show the brand/product checkbox form
    brandProductForm.classList.remove("hidden");
  });

  // 4. If user edits
  editBtn.addEventListener("click", function() {
    editForm.classList.remove("hidden");
    // Pre-fill edit fields with our identified values
    skinTypeInput.value = identifiedSkinType;
    skinColorInput.value = identifiedSkinColor;
  });

  // 5. Save the edited values
  saveEditBtn.addEventListener("click", function() {
    identifiedSkinType = skinTypeInput.value.trim() || identifiedSkinType;
    identifiedSkinColor = skinColorInput.value.trim() || identifiedSkinColor;

    // Update the analysis text
    analysisText.textContent = `Updated: you have ${identifiedSkinType} skin and a ${identifiedSkinColor} tone. Is that correct now?`;

    // Hide edit form again
    editForm.classList.add("hidden");
  });

  // 6. When user submits brand & product selection via checkboxes
  submitSelectionBtn.addEventListener("click", function() {
    // Collect checked brands
    const brandInputs = document.querySelectorAll('input[name="brand"]:checked');
    const chosenBrands = Array.from(brandInputs).map(el => el.value);

    // Collect checked products
    const productInputs = document.querySelectorAll('input[name="product"]:checked');
    const chosenProducts = Array.from(productInputs).map(el => el.value);

    // Basic validation: ensure at least one brand and product was checked
    if (chosenBrands.length === 0 || chosenProducts.length === 0) {
      alert("Please select at least one brand and one product.");
      return;
    }

    // For debugging or further logic:
    console.log("Chosen brands:", chosenBrands);
    console.log("Chosen products:", chosenProducts);

    // Example: you might filter or display only the selected brand/product combos
    // For now, we just show all the recommendations

    // Hide the checkbox form and show recommendations
    brandProductForm.classList.add("hidden");
    recommendationsSection.classList.remove("hidden");
  });
});
