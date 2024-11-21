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

// Handle Form Submission
async function handleFormSubmit() {
    const isLogin = document.getElementById("formTitle").textContent === "Login";
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        if (isLogin) {
            // Login Logic
            const data = await login(email, password);
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            // Sign-Up Logic
            const confirmPassword = document.getElementById("confirmPassword").value;
            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }
            const data = await signUp(email, password, userType);
            alert("Sign-up successful! You are now logged in.");
            window.location.href = "dashboard.html";
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

// try {
//     const token = window.localStorage.getItem('token');
//     const response = await fetch(`${webAPI}/api/countries`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-auth': token
//         },

//         body: JSON.stringify({country: country.value, rank: rank.value, happiness: happiness.value })
//     });
//     if (response.ok) {
//         alert('Country added');
        
//     } else {
//         // Handle the error (you can also show a message to the user)
//         alert(`Failed to add country: ${response.body.error}`);
//     }
// } catch (error) {
//         console.log(`Request failed - ${error}`);
//         alert(`Something has gone terribly wrong: ${error}`);
//     }

// Initialize User Type on Page Load
window.addEventListener("DOMContentLoaded", () => {
    setUserType("Student");
});

