async function loadProjects() {
  try {
    // 1. Fetch data from your local projects JSON file
    const response = await fetch("./projects.json");
    const projects = await response.json();

    // 2. Dynamically update the project count display
    const countElement = document.querySelector(".project-count");
    if (countElement) {
      countElement.textContent = `${projects.length} featured`;
    }

    // 3. Target the main content grid container
    const gridContainer = document.getElementById("projects-grid");
    gridContainer.innerHTML = ""; // Clear fallback data

    // 4. Generate markup loops for cards
    projects.forEach((project) => {
      // Build the highlight metric row HTML
      const statsHTML = project.stats
        .map((stat) => {
          const highlightClass = stat.isHighlighted
            ? "stat-highlight"
            : "stat-normal";
          return `<span class="stat-item ${highlightClass}">${stat.value}</span>`;
        })
        .join('<span class="stat-divider">|</span>'); // Inserts vertical visual pipe separators

      // Build the tech stack pills loop
      const tagsHTML = project.tags
        .map((tag) => `<span class="tag-pill">${tag}</span>`)
        .join("");

      // 5. Build full semantic card template matching layout metrics
      const cardHTML = `
        <article class="project-card">
          <div class="card-header">
            <span class="project-number">${project.id}</span>
            <span class="role-badge">${project.badge}</span>
          </div>
          
          <div class="card-body">
            <h3 class="project-title">${project.title}</h3>
            <h4 class="project-subtitle uppercase fs-small">${project.subtitle}</h4>
            <p class="project-desc pad-top-xsm">${project.description}</p>
          </div>
          
          <div class="card-footer">
            <div class="stats-row">
              ${statsHTML}
            </div>
            <div class="tags-row">
              ${tagsHTML}
            </div>
          </div>
        </article>
      `;

      // Append generated card into layout workspace
      gridContainer.innerHTML += cardHTML;
    });
  } catch (error) {
    console.error("Error loading project configurations:", error);
  }
}

// Fire rendering sequences when DOM mapping settles cleanly
document.addEventListener("DOMContentLoaded", loadProjects);
