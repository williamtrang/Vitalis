import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();

//btn to navigate to sign up page
document.getElementById("signUp").addEventListener("click", function(){
    document.getElementById("signUp").style.color = "blue";
    location.assign("../signup/signup.html");
});

//btn to navigate to forgot password page
document.getElementById("forgotPass").addEventListener("click", function(){
    document.getElementById("forgotPass").style.color = "blue";
    location.assign("../forgotpass/forgotpass.html");
});

//btn to login. once btn is pressed, verify username and password in database then navigate to account page if user exists
document.getElementById("loginBtn").addEventListener("click", e => {
    AUTH.signInWithEmailAndPassword(document.getElementById("username").value, document.getElementById("password").value).then(() => {
        window.location.href = "../account/account.html";
    }).catch(e => {
        alert("Login failed!");
        document.getElementById("password").value = "";
        console.log(e.message);
    });
});