const form = document.querySelector('form.login');
const login = document.getElementById('login-id');
const password = document.getElementById('password-id');
const url = 'http://localhost:3000/login';

const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login.value,
                password: password.value
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response != undefined) {
                localStorage.setItem('username', response.login);
                self.location = "tasks";
            } 
        })
        .catch((error) => {
            alert('Logowanie się nie powiodło');
            password.value = '';
            console.log(error);
        });
}

form.addEventListener('submit', loginUser);