// Redirect to dashboard if the user is already logged in
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // Redirect logged-in users directly to their dashboard
        window.location.href = "dashboard.html";
    }
});
