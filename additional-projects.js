async function loadAdditionalProjects() {
  try {
    // 1. Fetch data from the additional projects JSON file
    const response = await fetch("./additional-projects.json");
    const additionalProjects = await response.json();

    // 2. Target the additional projects container in the DOM
    const listContainer = document.querySelector(".additional-projects");
    if (!listContainer) return;

    listContainer.innerHTML = ""; // Clear fallback data

    // 3. Generate markup loop for each additional project
    additionalProjects.forEach((project) => {
      const itemHTML = `
        <div class="additional-project-item">
          <div class="additional-project-info">
            <span class="additional-project-title"><span class="additional-project-title-delimiter">./</span>${project.name}</span>
            <p class="additional-project-desc">${project.description}</p>
          </div>
          <a
            class="additional-project-link hover"
            href="${project.link}"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View ${project.name} (opens in new tab)"
          >
            View project ~/>
          </a>
        </div>
      `;

      // 4. Append generated item into the list container
      listContainer.innerHTML += itemHTML;
    });
  } catch (error) {
    console.error("Error loading additional projects configurations:", error);
  }
}

// Fire rendering sequence when DOM mapping settles cleanly
document.addEventListener("DOMContentLoaded", loadAdditionalProjects);
