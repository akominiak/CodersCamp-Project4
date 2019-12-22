const form = document.querySelector('form.register');
const login = document.getElementById('login-id');
const password = document.getElementById('password-id');
const email = document.getElementById('email-id');

const url = 'http://localhost:3000/registration';

const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login.value,
                password: password.value,
                email: email.value
            })
        })
        .then((resp) => {
            console.log(resp);
            if (resp.status == 200) {
                self.location = "login";
            } else {
                alert('Rejestracja się nie powiodła');
                password.value = '';
                login.value = '';
                email.value = '';
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

form.addEventListener('submit', registerUser);

