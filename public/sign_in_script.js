// Track the user type (Student or Instructor)
let userType = "Student";

// Initialize User Type on Page Load
window.addEventListener("DOMContentLoaded", () => {
    setUserType("Student");
});

// Set User Type (Student or Instructor) and Activate the Button
function setUserType(type) {
    userType = type;
    document.getElementById("studentBtn").classList.toggle("active", type === "Student");
    document.getElementById("instructorBtn").classList.toggle("active", type === "Instructor");
}

// Toggle between Login and Sign Up Forms
function toggleForm() {
    const isLogin = document.getElementById("formTitle").textContent === "Login";
    document.getElementById("formTitle").textContent = isLogin ? "Sign up" : "Login";
    document.getElementById("confirmPassword").style.display = isLogin ? "block" : "none";
    document.getElementById("name").style.display = isLogin ? "block" : "none";
    document.getElementById("login-btn").textContent = isLogin ? "Sign up" : "Login";
    document.getElementById("switch-btn").textContent = isLogin ? "Switch to login" : "Switch to sign up";
}

// Handle Form Submission
async function handleFormSubmit(event) {
    //event.preventDefault(); // Prevent form from submitting

    const isLogin = document.getElementById("formTitle").textContent === "Login";
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();

    // Clear previous error messages
    errorContainer.textContent = '';
    errorContainer.classList.remove('shake');

    try {
        if (isLogin) {
            // Login Logic
            // const data = await login(email, password);
            alert("Login successful!");

        } else {
            const confirmPassword = document.getElementById("confirmPassword").value.trim();

            if (!email || !password || !confirmPassword || !name) {
                throw new Error("Fill in all fields");
            }

            if (password !== confirmPassword) {
                throw new Error("Passwords do not match");
            }

            // Sign-Up Logic
            const data = await signUp(email, password, userType, name);
            alert("Sign-up successful! You are now logged in.");
        }
        window.location.href = "/dashboard.html";
    } catch (error) { // Catch input errors
        errorContainer.textContent = error.message;
        errorContainer.classList.add('shake');
    }
}

// Sign-Up Function
async function signUp(email, password, role, name) {
    try {
        const response = await fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, role, name }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to sign up.");
        }

        return data; // Return the user data on success
    } catch (error) {
        console.error("Sign-up error:", error.message);
    }
}

// Login Function
async function login(email, password) {
    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            throw new Error(data.error || "Invalid email or password.");
        }

        return data; // Return the user data on success
    } catch (error) {
        console.error("Login error:", error.message);
        throw error; 
    }
}

