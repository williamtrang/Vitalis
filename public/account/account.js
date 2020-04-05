import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();

let logoutBtn = document.getElementById("logoutBtn");       //btn to logout
let settingsBtn = document.getElementById("settingsBtn");   //btn to access settings
let backBtn = document.getElementById("backBtn");           //btn to go back to account page
let mainPage = document.getElementById("mainPage");         //main page of account tab
let settingsPage = document.getElementById("settingsPage"); //settings page of account tab
let tempBtn = document.getElementById("tempBtn");

//update name and email fields with user's name and email
AUTH.onAuthStateChanged(function(user) {
    //if user is not signed in, return to login page
    if(!user){
        location.assign("../login/login.html");
    }

    //retrieve user data from firebase and update on-screen profile
    const uId = AUTH.currentUser.uid;
    DATABASE.ref("/users/" + uId).once('value').then(d => {
        document.getElementById("username").innerText = d.val().forename.toUpperCase() + " " + d.val().surname.toUpperCase();
        document.getElementById("email").innerText = d.val().email;
    });
});

//opens the settings menu when the btn is pressed
settingsBtn.addEventListener("click", function(){
    mainPage.style.display = "none";
    settingsPage.style.display = "inline-block";
});

//go back to main account screen when back btn is pressed
backBtn.addEventListener("click", function(){
    mainPage.style.display = "inline-block";
    settingsPage.style.display = "none";
});

//TODO: ADD FUNCTIONALITY TO SETTINGS BUTTONS AND CHANGING PROFILE PICTURE

//logs user out when logout btn is pressed
logoutBtn.addEventListener("click", function(){
    AUTH.signOut();
    location.assign("../login/login.html");
});

tempBtn.addEventListener("click", function(){
    location.assign("../contact/contact.html");
});