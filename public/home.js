// DEFAULT: Show home section
window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("home").classList.add("active");
});

// Function to switch sections from dashboard sidebar
function showSection(sectionId) {
    // Hide all content sections
    document.querySelectorAll(".content-section")
        .forEach(sec => sec.classList.remove("active"));

    // Show selected section
    const target = document.getElementById(sectionId);
    if (target) target.classList.add("active");
}

//date
// Show today's date
const today = new Date();

const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};

document.getElementById("todayDate").innerText = today.toLocaleDateString("en-US", options);
