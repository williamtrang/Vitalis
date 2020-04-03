import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();

document.getElementById("signIn").addEventListener("click", function(){
    location.assign("../login/login.html");
});