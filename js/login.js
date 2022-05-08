if (localStorage.getItem('session')) {
    window.location.replace("home.html");
}

function login_form() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    if (!username || !password) {
        alert("All fields are requiered!");
        return;
    }

    let users = [];
    let localusers = JSON.parse(localStorage.getItem('users'));
    if (localusers) users = localusers;

    let crt_user = null;
    let hash = CryptoJS.SHA512(password).toString(CryptoJS.enc.Base64);

    //check if there is a user with the username and password
    for (const user of users) {
        if ((user.username == username) && (user.pswrd == hash)) {
            crt_user = user;
            break;
        }
    }

    if (crt_user) {
        localStorage.setItem('session', 'valid');
        localStorage.setItem('user', JSON.stringify(crt_user));
        window.location.replace("home.html");
    } else {
        alert("The username or password is incorrect, try again!");
        return;
    }

}
