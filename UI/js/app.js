/**
 * This file will contain all app logic
 */


 /**
 * Convinience methods and properties
 */
const BASE_URL = 'https://kurayangu.herokuapp.com/api/v2';

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
    loader = document.getElementById('load-modal');
    loader.style.display = 'block';

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
        loader.style.display = 'none';

        if (data.status === 200) {
            var user = data.data[0].user

            // Save user profile to local storage
            localStorage.setItem('token', data.data[0].token);
            localStorage.setItem('firstname', user.firstname);
            localStorage.setItem('lastname', user.lastname);
            localStorage.setItem('email', user.email);
            localStorage.setItem('phone', user.phonenumber);
            // Redirect to homepage after successful login
            window.location.replace('index.html');

        }else {
            window.alert(data.error);
            console.log(data.status);
        }

    })
    .catch((error) => {
        loader.style.display = 'none';
        window.alert(error);
    });
}



/** 
* PROFILE PAGE
*/
function loadUserProfile(){
    fname = localStorage.getItem('firstname');
    lname = localStorage.getItem('lastname');
    document.getElementById('username').innerText = `${fname} ${lname}`
    document.getElementById('email').innerText = localStorage.getItem('email')
    document.getElementById('phone').innerText = localStorage.getItem('phone')
}

function on_logout(){
    localStorage.clear();
    window.location.replace('signup.html')
}