import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();
let logoutBtn = document.getElementById("logoutBtn");     //btn to logout
let settingsBtn = document.getElementById("settingsBtn"); //btn to access settings

AUTH.onAuthStateChanged(function(user){
    if(!user){
        return;
    }
    const uId = AUTH.currentUser.uid;
    DATABASE.ref("/users/" + uId).once('value').then(d => {
        document.getElementById("username").innerText = d.val().forename + " " + d.val().surname;
        document.getElementById("email").innerText = d.val().email;
    });
});

//opens the settings menu when the btn is pressed
settingsBtn.addEventListener("click", function(){

});

//logs user out when logout btn is pressed
logoutBtn.addEventListener("click", function(){
    AUTH.signOut();
    location.assign("../login/login.html");
});