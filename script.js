const API_URL = "http://127.0.0.1:8000";

// Unified Auth Function
async function handleAuth(endpoint, payload) {
    const msg = document.getElementById('message');
    try {
        const res = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        msg.innerText = res.ok ? `Success! Welcome ${data.username}` : `Error: ${data.detail}`;
        msg.className = res.ok ? "success" : "error";
        if (res.ok && endpoint === "register") setTimeout(() => window.location.href = "login.html", 1500);
    } catch (e) { msg.innerText = "Server Unreachable"; }
}

// Global Listener for both Login and Register
document.addEventListener('submit', (e) => {
    e.preventDefault();
    const isReg = e.target.id === 'registerForm';
    if (e.target.id === 'loginForm' || isReg) {
        const payload = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        if (isReg) payload.email = document.getElementById('email').value || null;
        
        handleAuth(isReg ? "register" : "login", payload);
    }
});

// Simple Status Check
(async () => {
    const status = document.getElementById('status');
    if (!status) return;
    try {
        const res = await fetch(`${API_URL}/`);
        status.innerText = res.ok ? "Status: Online" : "Status: Error";
        status.style.color = res.ok ? "green" : "red";
    } catch (e) { status.innerText = "Status: Offline"; status.style.color = "red"; }
})();