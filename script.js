const API_URL = "http://127.0.0.1:8000";

// 1. Check if Backend is alive when page loads
async function checkConnection() {
    try {
        const response = await fetch(`${API_URL}/`);
        const data = await response.json();
        document.getElementById('status').innerText = "Status: Online";
        document.getElementById('status').style.color = "green";
    } catch (error) {
        document.getElementById('status').innerText = "Status: Backend Offline";
        document.getElementById('status').style.color = "red";
    }
}

// 2. Handle the Login Submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Stop page refresh
    
    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const messageDisplay = document.getElementById('message');

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: usernameInput,
                password: passwordInput
            })
        });

        if (response.ok) {
            const user = await response.json();
            messageDisplay.innerText = `Welcome, ${user.username}!`;
            messageDisplay.className = "success";
        } else {
            const errorData = await response.json();
            messageDisplay.innerText = "Login Failed: " + (errorData.detail || "Unauthorized");
            messageDisplay.className = "error";
        }
    } catch (err) {
        messageDisplay.innerText = "Error: Could not reach the server.";
    }
});

// Run connection check immediately
checkConnection();