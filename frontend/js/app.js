document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;
    
    const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
        alert(`User registered as ${data.role}`);
        // Redirect or show additional options
    } else {
        alert(`Error: ${data.message}`);
    }
});
