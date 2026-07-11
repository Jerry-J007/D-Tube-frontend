// Central configuration
const API_URL = 'https://d-tube-backend.onrender.com';

// Helper function to decode JWT token in vanilla JS
function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const authLinks = document.getElementById('auth-links');

    if (authLinks) {
        if (token) {
            const decoded = parseJwt(token);
            let adminButton = '';
            
            // If the token says they are an admin, show the secret button!
            if (decoded && decoded.role === 'admin') {
                adminButton = `<a href="control.html" class="btn btn-primary" style="background-color: #555; border: 1px solid #777;">⚙️ Control Panel</a>`;
            }

            authLinks.innerHTML = `
                ${adminButton}
                <a href="upload.html" class="btn btn-outline">⬆ Upload</a>
                <button onclick="logout()" class="btn btn-primary">Sign Out</button>
            `;
        } else {
            authLinks.innerHTML = `
                <a href="auth.html" class="btn btn-outline">Sign In</a>
            `;
        }
    }
});

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
}