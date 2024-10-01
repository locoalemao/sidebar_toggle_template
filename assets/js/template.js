function loadTemplate() {
  const currentPage = window.location.pathname.split("/")[1];

  const headerContainer = document.getElementById("header");
  let headerPath = "header.html";

  if (currentPage === "recipes") {
    headerPath = "../header.html";
  }

  fetch(headerPath)
    .then((response) => response.text())
    .then((data) => {
      headerContainer.innerHTML = data;

      addNavigationListeners();
      initSearchFunctionality();

      // Load and execute cookie_banner.js only after the header
      const script = document.createElement("script");
      script.src = "/assets/js/cookie_banner.js";
      document.body.appendChild(script);
    });

  const footerContainer = document.getElementById("footer");
  let footerPath = "footer.html";

  if (currentPage === "recipes") {
    footerPath = "/footer.html";
  }

  fetch(footerPath)
    .then((response) => response.text())
    .then((data) => {
      footerContainer.innerHTML = data;
    });

  const sidebarContainer = document.getElementById("sidebar-cont");
  if (currentPage === "recipes") {
    fetch("/sidebar.html")
      .then((response) => response.text())
      .then((data) => {
        sidebarContainer.innerHTML = data;
      });
  }
}

function addNavigationListeners() {
  const navLinks = document.querySelectorAll(".nav__link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetSectionId = this.getAttribute("href").split("#")[1];
      window.location.href = "index.html#" + targetSectionId;
    });
  });
}

function initSearchFunctionality() {
  const searchButton = document.querySelector(".search-button");
  const searchInput = document.querySelector("#searchInput");

  if (searchButton) {
    searchButton.addEventListener("click", function () {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        // Determine if the current path is in /recipes/
        let searchPagePath = '/search.html';
        if (window.location.pathname.includes('/recipes/')) {
          searchPagePath = '/search.html'; // Absolute path if needed
        }
        
        window.location.href = `${searchPagePath}?query=${encodeURIComponent(searchTerm)}`;
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        searchButton.click();
      }
    });
  }
}

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function performSearch() {
  const queryParams = new URLSearchParams(window.location.search);
  const searchTerm = queryParams.get("query");

  if (searchTerm) {
    const searchTitle = `Resultados de busca para "${searchTerm}"`;
    
    // Update the search title in the body
    document.getElementById("search-title").innerText = searchTitle;
    
    // Update the tab title (in the head)
    document.title = `${searchTitle} | Jucilene Santana`;

    loadSearchResults(searchTerm);
  }
}

function loadSearchResults(searchTerm) {
  const recipeContainer = document.getElementById("recipe-container");
  recipeContainer.innerHTML = "";

  const normalizedSearchTerm = normalizeText(searchTerm);
  const searchTerms = normalizedSearchTerm.split(" ").filter((word) => word.length > 0);

  const filteredRecipes = window.recipes.filter((recipe) => {
    const normalizedTitle = normalizeText(recipe.title);
    const normalizedTags = recipe.tags.map((tag) => normalizeText(tag));
    const normalizedCategories = recipe.category.map((cat) => normalizeText(cat)); // Normalize categories

    return searchTerms.some(
      (term) =>
        normalizedTitle.includes(term) ||
        normalizedTags.some((tag) => tag.includes(term)) ||
        normalizedCategories.some((cat) => cat.includes(term)) // Check against categories
    );
  });

  displayRecipes(filteredRecipes);
}

function displayRecipes(recipes) {
  const recipeContainer = document.getElementById("recipe-container");
  if (recipes.length === 0) {
    recipeContainer.innerHTML = `
    <p style="margin: 5rem 2rem 5rem 2rem; text-align: center;">
      <img src="/assets/icons/icons8-no-food-96.png" alt="Nenhum resultado encontrado" style="width: 96px; height: 96px;">
    </p>`;
    return;
  }

  const videoGrid = document.createElement("div");
  videoGrid.classList.add("video__grid");

  recipes.forEach((recipe) => {
    const recipeElement = document.createElement("div");
    recipeElement.classList.add("video__preview");

    recipeElement.innerHTML = `
      <div class="thumbnail__row">
        <a href="${recipe.link}">
          <img src="${recipe.image}" alt="${recipe.title}" class="thumbnail">
          <div>
            <h3 class="fav-recipes__title">${recipe.title}</h3>
          </div>
        </a>
      </div>
    `;

    videoGrid.appendChild(recipeElement);
  });

  recipeContainer.appendChild(videoGrid);

  const videoPreviews = document.querySelectorAll(".video__preview");

  videoPreviews.forEach((preview) => {
    const thumbnailRow = preview.querySelector(".thumbnail__row");

    preview.addEventListener("mouseenter", () => {
      thumbnailRow.style.transition = "transform 0.4s";
      thumbnailRow.style.transform = "scale(1.05) translateY(-5px)";
    });

    preview.addEventListener("mouseleave", () => {
      thumbnailRow.style.transition = "transform 0.4s";
      thumbnailRow.style.transform = "none";
    });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initSearchFunctionality();
  if (window.location.pathname.includes("search.html")) {
    performSearch();
  }
});

document.addEventListener("DOMContentLoaded", loadTemplate);