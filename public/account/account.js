import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();

const logoutBtn = document.getElementById("logoutBtn");       //btn to logout
const settingsBtn = document.getElementById("settingsBtn");   //btn to access settings
const backBtn = document.getElementById("backBtn");           //btn to go back to account page
const mainPage = document.getElementById("mainPage");         //main page of account tab
const settingsPage = document.getElementById("settingsPage"); //settings page of account tab
const changePassBtn = document.getElementById("changePass");
const postResetEmail = document.getElementById("postResetEmail");

//update name and email fields with user's name and email
AUTH.onAuthStateChanged(function(user) {
    //if user is not signed in, return to login page
    if(!user){
        location.assign("../login/login.html");
        return;
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

changePassBtn.addEventListener("click", function(){
    DATABASE.ref("/users/" + AUTH.currentUser.uid).once('value').then(d => {
        AUTH.sendPasswordResetEmail(d.val().email);
    });

    postResetEmail.style.display = "inline-block";
    settingsPage.style.display = "none";
});

//go back to main account screen when back btn is pressed
backBtn.addEventListener("click", function(){
    mainPage.style.display = "inline-block";
    settingsPage.style.display = "none";
});

//TODO: ADD FUNCTIONALITY TO SETTINGS BUTTONS AND CHANGING PROFILE PICTURE

//------------------------------------------------NAVBAR FUNCTIONALITY------------------------------------------------
document.getElementById("activityIcon").addEventListener("click", function(){
    location.assign("../activity/activity.html");
});

document.getElementById("accountIcon").addEventListener("click", function(){
    location.assign("../account/account.html");
});

document.getElementById("contactIcon").addEventListener("click", function(){
    location.assign("../contact/contact.html");
});

document.getElementById("medicineIcon").addEventListener("click", function(){
    location.assign("../medicine/medicine.html");
});

document.getElementById("nutritionIcon").addEventListener("click", function(){
    location.assign("../nutrition/nutrition.html");
});

document.getElementById("vitalIcon").addEventListener("click", function(){
    location.assign("../vital/vital.html");
});
//------------------------------------------------------END NAVBAR------------------------------------------------------

//logs user out when logout btn is pressed
logoutBtn.addEventListener("click", function(){
    AUTH.signOut();
    location.assign("../login/login.html");
});