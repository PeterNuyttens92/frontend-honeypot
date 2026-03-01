const API_URL = "http://127.0.0.1:8000";

async function checkConnection() {
    try {
        const response = await fetch(`${API_URL}/`);
        const data = await response.json();
        const statusEl = document.getElementById('status');
        if (statusEl) {
            statusEl.innerText = "Status: Online";
            statusEl.style.color = "green";
        }
    } catch (error) {
        const statusEl = document.getElementById('status');
        if (statusEl) {
            statusEl.innerText = "Status: Backend Offline";
            statusEl.style.color = "red";
        }
    }
}

// Reuseable function for Auth (Login or Register)
async function handleAuth(endpoint, payload) {
    const messageDisplay = document.getElementById('message');
    
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            messageDisplay.innerText = `Success! User: ${data.username}`;
            messageDisplay.className = "success";
        } else {
            messageDisplay.innerText = "Error: " + (data.detail || "Action failed");
            messageDisplay.className = "error";
        }
    } catch (err) {
        messageDisplay.innerText = "Error: Could not reach the server.";
        messageDisplay.className = "error";
    }
}

// Login Event
document.getElementById('loginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleAuth("login", {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    });
});

checkConnection();