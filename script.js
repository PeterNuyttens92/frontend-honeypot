const API_URL = "http://127.0.0.1:8000";

async function handleAuth(endpoint, payload) {
    const msg = document.getElementById('message');
    try {
        const res = await fetch(`${API_URL}/${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (!res.ok) {
            msg.innerText = `Error: ${data.detail}`;
            msg.className = "error";
            return;
        }

    if (endpoint === "login") {
    localStorage.setItem('userId', data.id);
    localStorage.setItem('username', data.username);
    
    // No leading slash means "relative to current folder"
    setTimeout(() => { 
        window.location.href = "dashboard.html"; 
    }, 800);
}
    } catch (e) { msg.innerText = "Server Unreachable"; }
}

document.addEventListener('submit', (e) => {
    const isReg = e.target.id === 'registerForm';
    if (e.target.id === 'loginForm' || isReg) {
        e.preventDefault();
        const payload = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };
        if (isReg) payload.email = document.getElementById('email').value || null;
        handleAuth(isReg ? "register" : "login", payload);
    }
});
function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}