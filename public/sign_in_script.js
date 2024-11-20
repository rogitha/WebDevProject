// Track the user type (Student or Instructor)
let userType = "Student";

// Set User Type (Student or Instructor) and Activate the Button
function setUserType(type) {
    userType = type;
    document.getElementById("studentBtn").classList.toggle("active", type === "Student");
    document.getElementById("instructorBtn").classList.toggle("active", type === "Instructor");
}

// Toggle between Login and Sign Up Forms
function toggleForm() {
    const isLogin = document.getElementById("formTitle").textContent === "Login";
    document.getElementById("formTitle").textContent = isLogin ? "Sign Up" : "Login";
    document.getElementById("confirmPasswordGroup").style.display = isLogin ? "block" : "none";
    document.querySelector(".action-btn").textContent = isLogin ? "Sign Up" : "Login";
    document.querySelector(".signup-btn").textContent = isLogin ? "Switch to Login" : "Switch to Sign Up";
}

// Login Function (Redirects to Dashboard)
function login() {
    if (document.getElementById("formTitle").textContent === "Login") {
        // Simulate login success by storing login status
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userType', userType); // Store 'Student' or 'Instructor'
        
        // Redirect to dashboard
        window.location.href = "dashboard.html";
    } else {
        alert("Please complete the sign-up process.");
    }
}

// Logout Function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    window.location.href = "index.html";
}

// Initialize User Type on Page Load
window.addEventListener("DOMContentLoaded", () => {
    setUserType("Student");
});
