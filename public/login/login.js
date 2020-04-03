import {firebaseConfig} from "../init.js"

firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();

document.getElementById("signUp").addEventListener("click", function(){
    location.assign("../signup/signup.html");
});

document.getElementById("loginBtn").addEventListener("click", e => {
    AUTH.signInWithEmailAndPassword(document.getElementById("username").value, document.getElementById("password").value).then(() => {
        //TODO: CHANGE THIS TO THE RIGHT LOCATION
        window.location.href = "../signup/signup.html";
    }).catch(e => {
        alert("Login failed!");
        document.getElementById("password").value = "";
        console.log(e.message);
    });
});