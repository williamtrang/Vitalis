import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();
const mainPage = document.getElementById("mainPage");
const addActivityPage = document.getElementById("addActivityPage");
const backBtn = document.getElementById("backBtn");
const addActBtn = document.getElementById("addActBtn");

//TODO: ADD ACTIVITY FUNCTIONALITY TO DATABASE AND DISPLAY ACTIVITIES IN ACTIVITY LIST

//if user is not signed in, return to login page
AUTH.onAuthStateChanged(function(user) {
    if(!user){
        location.assign("../login/login.html");
    }
});

addActBtn.addEventListener("click", function(){
    addActivityPage.style.display = "none";
    mainPage.style.display = "inline-block";

    document.getElementById("titleInput").value = "";
    document.getElementById("actTypeInput").value = "";
    document.getElementById("durationInput").value = "";
});

backBtn.addEventListener("click", function(){
    addActivityPage.style.display = "none";
    mainPage.style.display = "inline-block";

    document.getElementById("titleInput").value = "";
    document.getElementById("actTypeInput").value = "";
    document.getElementById("durationInput").value = "";
});

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