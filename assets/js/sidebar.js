document.addEventListener("DOMContentLoaded", async () => {
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const sidebarContainer = document.getElementById("sidebar-cont");

  try {
    // Fetch sidebar content
    const response = await fetch("/sidebar.html");
    const data = await response.text();
    sidebarContainer.innerHTML = data;

    // Sidebar toggle functionality
    sidebarToggle.addEventListener("click", function () {
      const sidebar = document.querySelector(".sidebar");
      sidebar.classList.toggle("active");
      sidebarToggle.classList.toggle("toggle-active");
    });
  } catch (error) {
    console.error("Error loading sidebar:", error);
  }

  // Function to handle the sidebar visibility based on window width
  function handleWindowResize() {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      if (window.innerWidth >= 590) {
        sidebar.classList.add("active");
        sidebarToggle.style.display = "none";
      } else {
        sidebar.classList.remove("active");
        sidebarToggle.style.display = "block";
      }
    }
  }

  // Function to hide the sidebar when scrolling on small screens
  function handleWindowScroll() {
    const sidebar = document.querySelector(".sidebar");
    if (window.innerWidth < 590) {
      sidebar.classList.remove("active");
      sidebarToggle.classList.remove("toggle-active");
    }
  }

  // Initial call to set sidebar state
  handleWindowResize();

  // Attach resize and scroll event listeners
  window.addEventListener("resize", handleWindowResize);
  window.addEventListener("scroll", handleWindowScroll);
});
