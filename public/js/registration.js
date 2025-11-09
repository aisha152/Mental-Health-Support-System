// Handle form submission for sign-up
document
  .getElementById("signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const role_name = document.querySelector('select[name="role_name"]').value;

    const signUpData = { name, email, password, role_name };

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });

      const result = await response.json();

      if (response.status === 201) {
        alert("Registration successful! Please log in.");
      } else {
        showError(result.message); // Display error message dynamically
      }
    } catch (error) {
      console.error("Registration failed:", error);
      showError("Registration failed. Please try again."); // Display a generic error message
    }
  });

// Login Form
// Login Form
document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(document.getElementById("login-form"));

    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    const email = formObject.email || "";
    const password = formObject.password || "";

    if (!email.trim() || !password.trim()) {
      showError("Please fill out both fields.");
      return;
    }

    const loginData = { email, password };

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      console.log("Login response:", result);

      if (response.status === 200) {
        alert("Login successful!");
        console.log("JWT Token stored in localStorage:", result.token);
        localStorage.setItem("jwtToken", result.token);

        // Normalize role and map to dashboard
        const normalizedRole = (result.role || "").trim().toLowerCase();
        const roleRoutes = {
          "admin": "/adminDashboard",
          "therapist": "/adminDashboard",
          "user": "/adminDashboard",
        };

        // Decode token to access email for special-case admin if needed
        let emailFromToken = "";
        try {
          const decoded = jwt_decode(result.token);
          emailFromToken = decoded?.email || "";
        } catch (e) {
          console.warn("Failed to decode token for email:", e);
        }

        const targetRoute = roleRoutes[normalizedRole]
          || (emailFromToken.toLowerCase() === "admin@gmail.com" ? "/adminDashboard" : null);

        if (targetRoute) {
          window.location.href = targetRoute;
        } else {
          // Fallback if role is unknown
          showError(`Logged in but unknown role: ${result.role || "N/A"}`);
        }
      } else {
        showError(result.message); // Show error dynamically
      }
    } catch (error) {
      console.error("Error during login:", error);
      showError("Login failed. Please try again.");
    }
  });
