document.addEventListener("DOMContentLoaded", function () {
  const sidebarItems = document.querySelectorAll(".sidebar li.nav-link");

  sidebarItems.forEach((item) => {
    let clickTimeout;

    item.addEventListener("click", function () {
      const submenu = item.querySelector(".submenu");
      // Guard: only submenu-bearing items get the hover/show behavior
      if (!submenu) return;

      submenu.style.display = "block";
      setTimeout(function () {
        submenu.style.opacity = 1;
      }, 0);

      clickTimeout = setTimeout(() => {
        submenu.style.opacity = 0;
        setTimeout(() => {
          submenu.style.display = "none";
        }, 300);
      }, 2000);

      submenu.addEventListener("mouseenter", function () {
        clearTimeout(clickTimeout);
      });

      submenu.addEventListener("mouseleave", function () {
        clickTimeout = setTimeout(() => {
          submenu.style.opacity = 0;
          setTimeout(() => {
            submenu.style.display = "none";
          }, 300);
        }, 5000);
      });
    });
  });

  // Logout: clear token and redirect to registration
  const logoutLink = document.querySelector("#logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", function (e) {
      e.preventDefault();
      try {
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
      } catch (_) {}
      window.location.href = "/registration";
    });
  }
});
