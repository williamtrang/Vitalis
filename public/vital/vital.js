import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();

const addVitalBtn = document.getElementById("addVital");
const backBtn = document.getElementById("backBtn");
const finishBtn = document.getElementById("finishBtn");
const addVitalsPage = document.getElementById("addVitalsPage");
const mainPage = document.getElementById("mainPage");

let moodRads = document.getElementsByName("moodRad");

let day = new Date();
let date = document.getElementById("date");
let weekday = document.getElementById("dayOfWeek");

const body = document.body;

let month_dict = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
};

let weekday_dict = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday"
}

//TODO IF TIME: ADD ANIMATIONS AND NOT A COMPLETELY NEW SCREEN FOR ADDING STUFF
//TODO: DISPLAY VITALS IN CALENDAR AND STUFF
//TODO: CALENDAR BUTTON AND DIFF VIEW BTN FUNCTIONALITY
//if user is not signed in, return to login page
AUTH.onAuthStateChanged(function(user) {
    if(!user){
        location.assign("../login/login.html");
        return;
    }

    weekday.innerText = weekday_dict[day.getDay()];
    date.innerText = month_dict[(day.getMonth()+1)] + " " + day.getDate() + ", " + day.getFullYear();

    DATABASE.ref("/dark_mode/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().darkmode == true) {
            body.classList.toggle("dark-mode");
        }
    });
});

addVitalBtn.addEventListener("click", function(){
    mainPage.style.display = "none";
    addVitalsPage.style.display = "inline-block";
});

document.getElementById("vitalChoice").addEventListener("change", function(){
    var vis = document.querySelector(".vis"),
    target = document.getElementById(this.value);

    if(vis !== null){
        vis.classList.add("inv");
        vis.classList.remove("vis");
    }

    if (target !== null){
        target.classList.add("vis");
        target.classList.remove("inv");
    }
});

document.getElementById("mood").addEventListener("change", function(){
    let val = "";
    for(let i = 0; i < moodRads.length; i++){
        document.getElementById(moodRads[i].value).classList.add("dim");
        document.getElementById(moodRads[i].value).classList.remove(moodRads[i].value);

        document.getElementById(moodRads[i].value).src = "../assets/mood" + (i+1) + ".PNG";
        if(moodRads[i].checked){
            val = moodRads[i].value;
        }
    }

    let selected = document.getElementById(val);
    selected.src = "../assets/" + val + "_fill.png";
    selected.classList.remove("dim");
    selected.classList.add(val);
});

backBtn.addEventListener("click", function(){
    mainPage.style.display = "block";
    addVitalsPage.style.display = "none";

    document.getElementById("pulseInput").value = "";
    document.getElementById("sugarInput").value = "";
});

finishBtn.addEventListener("click", function(){
    mainPage.style.display = "block";
    addVitalsPage.style.display = "none";

    //TODO: PROCESS INFO AND STORE IN DB

    document.getElementById("pulseInput").value = "";
    document.getElementById("sugarInput").value = "";
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