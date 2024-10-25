let userType = "student";

function showSignup() {
    document.getElementById("formTitle").textContent = "Sign Up";
    document.getElementById("confirmPasswordGroup").style.display = "block";
}

function showLogin() {
    document.getElementById("formTitle").textContent = "Login";
    document.getElementById("confirmPasswordGroup").style.display = "none";
}