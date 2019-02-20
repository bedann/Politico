/**
 * This file will contain all app logic
 */


 /**
 * Convinience methods and properties
 */
const BASE_URL = 'https://kurayangu.herokuapp.com/api/v2';

function getToken(){
    token = localStorage.getItem('token');
    if(token)
        return token;
    window.location.replace('signup.html')
    return null
}

function createNode(type, id, clazz){
    const node = document.createElement(type);
    node.classList.add(clazz);
    node.id = id;
    return node;
}

function showModal(modal_id){
    document.getElementById(modal_id).style.display='block';
}

function tokenError(status){
    if(status === 401){
        window.location.replace('signup.html')
        return true;
    }
    return false;
}

/**
 * Login function
 */
function onLogin() {
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
 * Password reset function
 */
function onResetPassword() {
    loader = document.getElementById('load-modal');
    loader.style.display = 'block';

    fetch(`${BASE_URL}/auth/reset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: document.getElementById('login_email').value
        }),
    })
    .then(res => res.json())
    .then((data) => {
        loader.style.display = 'none';

        if (data.status === 200) {

            window.alert(data.data[0].message);

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
 * Signup function
 */
function onSignup() {
    password = document.getElementById('password').value
    confirm_password = document.getElementById('confirm').value

    if (password !== confirm_password){
        window.alert('Passwords do not match');
        return;
    }

    loader = document.getElementById('load-modal');
    loader.style.display = 'block';

    let payload = {
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        othername: document.getElementById('othername').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        passportUrl: document.getElementById('passportUrl').value,
        isAdmin: false,
        email: document.getElementById('email').value,
        password: password,
    }

    fetch(`${BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(res => res.json())
    .then((data) => {
        loader.style.display = 'none';

        console.log(data);
        if (data.status === 201) {
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


/**
 * HOME PAGE
 */
function initHomePage(){
    loadOffices();
}


function loadOffices() {

    fetch(`${BASE_URL}/offices`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getToken()}`
        }
    })
    .then(res => res.json())
    .then((data) => {
        
        if (data.status === 200) {

            offices = document.getElementById('office-list');

            data.data.forEach(function(office){

                let office_node = createNode('div', office.id, 'office');
                office_node.innerText = office.name
                office_node.addEventListener('click', function(){
                    showModal('vote-modal');
                });
                offices.appendChild(office_node);

            });

        }else if(tokenError(data.status)){
            console.log('Expired token')
        }else {
            window.alert(data.error);
            console.log(data.status);
        }

    })
    .catch((error) => {
        window.alert(error);
    });
}



function loadOfficesInPartyDetail() {

    fetch(`${BASE_URL}/offices`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getToken()}`
        }
    })
    .then(res => res.json())
    .then((data) => {
        
        if (data.status === 200) {

            offices = document.getElementById('offices-vert');

            data.data.forEach(function(office){

                let office_node = createNode('div', `office-${office.id}-container`, 'office-row');
                office_node.innerHTML = `
                <div class="office-content">
                    <div class="office-name"> &nbsp; ${office.name}</div>
                    <button id="${office.id}">VIE</button>
                </div>
                <hr>
                `
                office_node.addEventListener('click', function(){
                    showModal('vote-modal');
                });
                offices.appendChild(office_node);

            });

        }else if(tokenError(data.status)){
            console.log('Expired token')
        }else {
            window.alert(data.error);
            console.log(data.status);
        }

    })
    .catch((error) => {
        window.alert(error);
    });
}
