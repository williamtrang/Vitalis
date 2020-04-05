import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
let logoutBtn = document.getElementById("logoutBtn"); //btn to logout

//logs user out when logout btn is pressed
logoutBtn.addEventListener("click", function(){
    AUTH.signOut();
    location.assign("../login/login.html");
});