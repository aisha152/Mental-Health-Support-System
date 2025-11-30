// Get all navigation links
const navLinks = document.querySelectorAll('.nav-menu a');

// Add click event listeners to navigation links
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Smooth scroll to target
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Sign in button functionality
const signInBtn = document.querySelector('.sign-in-btn');

signInBtn.addEventListener('click', function() {
    // You can replace this with actual sign-in logic
    alert('Sign in functionality would be implemented here');
    console.log('Sign in button clicked');
});

// Optional: Add animation to stats on page load
window.addEventListener('load', function() {
    const stats = document.querySelectorAll('.stat');
    
    stats.forEach((stat, index) => {
        setTimeout(function() {
            stat.style.opacity = '0';
            stat.style.animation = 'fadeIn 0.6s ease forwards';
        }, index * 100);
    });
});

// Add fade-in animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Optional: Image lazy loading enhancement
const image = document.querySelector('.illustration');
if (image) {
    image.addEventListener('load', function() {
        console.log('Image loaded successfully');
    });
    
    image.addEventListener('error', function() {
        console.error('Failed to load image');
    });
}


// ====== NAVIGATION MENU JS ======
// Hamburger Menu Toggle (mobile)
document.querySelector('.hamburger').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-menu').classList.toggle('active');
});

// Active Link Highlight on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;  // 150px offset (navbar height)
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Navbar shrink on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// LOGOUT FUNCTION
function logout() {
    // 1. LocalStorage ya session clear kar do (agar use kar rahe ho)
    localStorage.clear();
    sessionStorage.clear();
    
    // 2. Alert dikhao
    alert("You have been logged out successfully!");
    
    // 3. Home page pe le jao ya login page pe
    window.location.href = "index.html";  // ya "login.html"
    
    // Agar chaaho to signin page pe bhej do
    // window.location.href = "signin.html";
}
// Check karo user logged in hai ya nahi
window.addEventListener("DOMContentLoaded", function() {
    const logoutBtn = document.querySelector(".logout-btn");
    
    // Agar localStorage mein "loggedin" hai to dikhao
    if (localStorage.getItem("loggedin") === "true") {
        logoutBtn.style.display = "block";
    } else {
        logoutBtn.style.display = "none";
    }
});
// After successful login:
localStorage.setItem("username", userNameValue);
<script>
  const name = localStorage.getItem("username") || "User";
  document.getElementById("userName").innerText = name;
</script>
