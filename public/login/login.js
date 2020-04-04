import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();

document.getElementById("signUp").addEventListener("click", function(){
    document.getElementById("signUp").style.color = "blue";
    location.assign("../signup/signup.html");
});

document.getElementById("forgotPass").addEventListener("click", function(){
    document.getElementById("forgotPass").style.color = "blue";
    location.assign("../forgotpass/forgotpass.html");
});

document.getElementById("loginBtn").addEventListener("click", e => {
    document.getElementById("loginBtn").style.color = "darkorange";
    AUTH.signInWithEmailAndPassword(document.getElementById("username").value, document.getElementById("password").value).then(() => {
        //TODO: CHANGE THIS TO THE RIGHT LOCATION
        window.location.href = "../tempPostLogin.html";
    }).catch(e => {
        alert("Login failed!");
        document.getElementById("password").value = "";
        console.log(e.message);
    });
});