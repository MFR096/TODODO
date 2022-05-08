if (localStorage.getItem('session')) {
    window.location.replace("home.html");
}

function signup_form() {

    //get elements
    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let copassword = document.getElementById('copassword').value;

    //check if all the fields are filled
    if (!username || !email || !password || !copassword) {
        alert("All the fields are requiered!");
        return;
    }

    let users = [];
    let localusers = JSON.parse(localStorage.getItem('users'));
    if (localusers) users = localusers;

    //check if there is a user with same username or email
    users.every(user => {
        if (user.username == username) {
            alert("An account with this username already exists!!");
            return;
        }
        if (user.email == email) {
            alert("An account with this email already exists!!");
            return;
        }
    });

    //if the user is new we will validate the password
    if (password.length < 8) {
        alert("The password can't be less than 8 caracters!");
        return;
    }

    if (password != copassword) {
        alert("The confirmation has failed, confirm you password again!");
        return;
    }

    //add user to localstorage
    let hash = CryptoJS.SHA512(password).toString(CryptoJS.enc.Base64);
    let user = new User(username, email, hash);
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('session', 'valid');
    window.location.href = 'home.html';
}
