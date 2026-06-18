// Function to fetch and render the experience timeline
async function loadExperience() {
  try {
    // 1. Fetch the data from your JSON file
    const response = await fetch("./experience.json");
    const data = await response.json();

    // 2. Target the container element in your HTML
    const container = document.getElementById("experience-container");

    // 3. Clear any existing placeholders
    container.innerHTML = "";

    // 4. Loop through each entry in the JSON array
    data.forEach((item) => {
      // Check if this specific item should be expanded by default
      const openAttribute = item.isOpen ? "open" : "";

      // Map through the bullet points array to generate <li> strings
      const highlightsHTML = item.highlights
        .map((bullet) => `<li>${bullet}</li>`)
        .join("");

      // 5. Construct the single accordion item template dynamically
      const accordionHTML = `
        <details class="accordion-item" ${openAttribute}>
          <summary class="accordion-header">
            <div class="header-left">
              <i class="fa-solid fa-briefcase icon-main"></i>
              <div class="title-group">
                <h3>${item.company}</h3>
                <p class="subtitle">${item.role}</p>
              </div>
            </div>
            <div class="header-right">
              <span class="date-range">${item.dateRange}</span>
              <i class="fa-solid fa-caret-right toggle-arrow"></i>
            </div>
          </summary>
          
          <div class="accordion-content">
            <ul class="bullet-list">
              ${highlightsHTML}
            </ul>
          </div>
        </details>
      `;

      // 6. Append the fresh component into the main wrapper
      container.innerHTML += accordionHTML;
    });
  } catch (error) {
    console.error("Error loading the experience JSON file:", error);
  }
}

// Initialize the render loop on page load
document.addEventListener("DOMContentLoaded", loadExperience);
