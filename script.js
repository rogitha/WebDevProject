// Set default userType to "Student"
let userType = "Student";

// Function to activate the selected button
function activateUserTypeButton() {
    const studentBtn = document.getElementById("studentBtn");
    const instructorBtn = document.getElementById("InstructorBtn");

    // Set Student as the active button initially
    if (userType === "Student") {
        studentBtn.classList.add("active");
        instructorBtn.classList.remove("active");
    } else {
        instructorBtn.classList.add("active");
        studentBtn.classList.remove("active");
    }
}

// Initialize the active button on page load
window.addEventListener('DOMContentLoaded', (event) => {
    activateUserTypeButton();
});

// Event listeners to switch between Student and Instructor
document.getElementById("studentBtn").addEventListener("click", function() {
    userType = "Student";
    activateUserTypeButton();
});

document.getElementById("InstructorBtn").addEventListener("click", function() {
    userType = "Instructor";
    activateUserTypeButton();
});

function signup() {
    document.getElementById("formTitle").textContent = "Sign Up";
    document.getElementById("confirmPasswordGroup").style.display = "block";
}

function login() {
    document.getElementById("formTitle").textContent = "Login";
    document.getElementById("confirmPasswordGroup").style.display = "none";

    // FOR LAYOUT PURPOSES
    window.location.href = "dashboard.html";
}