const wrapper = document.querySelector('.wrapper')
const registerLink = document.querySelector('.register-link')
const loginLink = document.querySelector('.login-link')

registerLink.onclick = () => {
    wrapper.classList.add('active')
}

loginLink.onclick = () => {
    wrapper.classList.remove('active')
}

// Password validation and navigation
document.getElementById('loginButton').addEventListener('click', () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
        
    // Retrieve user data from local storage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
        alert('Login successful!');
        window.location.href = '/Dashboard/dashboard.html';
    } else {
        alert('Invalid login credentials. Password must be at least 6 characters.');
    }
});

document.getElementById('registerButton').addEventListener('click', () => {
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    if (username && email && password.length >= 6) { // Example validation
        // Store user data in local storage
        const userData = { username, email, password };
        localStorage.setItem('user', JSON.stringify(userData));

        alert('Registration successful! You can now log in.');
        wrapper.classList.remove('active');
    } else {
        alert('Invalid registration details. Password must be at least 6 characters.');
    }
});
