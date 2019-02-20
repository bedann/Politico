/**
 * This file will contain all app logic
 */


 /**
 * Convinience methods and properties
 */
const BASE_URL = 'http://127.0.0.1:5000/api/v2';

function get_token(){
    token = localStorage.getItem('token');
    if(token)
        return token;
    window.location.replace('signup.html')
    return null
}



/**
 * Login function
 */
function on_login() {
    fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: document.getElementById('login_email').value,
            password: document.getElementById('login_password').value,
        }),
    })
    .then(res => res.json())
    .then((data) => {

        if (data.status === 200) {

            localStorage.setItem('token', data.data[0].token);
            localStorage.setItem('logged_in', true);
            // Redirect to homepage after successful login
            window.location.replace('index.html');

        }else {
            window.alert(data.error);
        }

    })
    .catch((error) => {
        window.alert(error);
    });
}

