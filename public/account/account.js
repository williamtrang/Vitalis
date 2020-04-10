import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();

const logoutBtn = document.getElementById("logoutBtn");       //btn to logout
const settingsBtn = document.getElementById("settingsBtn");   //btn to access settings
const profileBtn = document.getElementById("profileBtn");

const mainPage = document.getElementById("mainPage");         //main page of account tab
const settingsPage = document.getElementById("settingsPage"); //settings page of account tab
const profilePage = document.getElementById("profilePage");

const changePassBtn = document.getElementById("changePass");
const postResetEmail = document.getElementById("postResetEmail");
const backAcctBtn = document.getElementById("backAccountBtn");

const birthdaySet = document.getElementById("birthdaySet");
const aboutMeSet = document.getElementById("aboutMeSet");
const numberSet = document.getElementById("phoneNumberSet");
const workSet = document.getElementById("workPhoneNumberSet");

const body = document.body;

//TODO: CHANGING PROFILE PICTURE
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
        document.getElementById("username").innerText = d.val().forename.substring(0,1).toUpperCase() + d.val().forename.substring(1, d.val().forename.length).toLowerCase() + " " + 
        d.val().surname.substring(0,1).toUpperCase() + d.val().surname.substring(1, d.val().surname.length).toLowerCase();
       
        document.getElementById("profileDescFirst").innerText = d.val().forename.substring(0,1).toUpperCase() + d.val().forename.substring(1, d.val().forename.length).toLowerCase();
        document.getElementById("profileDescLast").innerText = d.val().surname.substring(0,1).toUpperCase() + d.val().surname.substring(1, d.val().surname.length).toLowerCase();
        document.getElementById("email").innerText = d.val().email;
    });

    DATABASE.ref("/birthdays/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().birthday != undefined) {
            document.getElementById("birthdayText").innerText = d.val().birthday;
            document.getElementById("birthday").style.display = "none";
            birthdaySet.style.display = "none";
        }
    });

    DATABASE.ref("/aboutme/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().aboutme != undefined) {
            document.getElementById("aboutMeText").innerText = d.val().aboutme;
            document.getElementById("aboutMeDesc").style.display = "none";
            aboutMeSet.style.display = "none";
        }
    });

    DATABASE.ref("/phone_numbers/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().phonenumber != undefined) {
            document.getElementById("numberText").innerText = d.val().phonenumber;
            document.getElementById("phoneNumber").style.display = "none";
            numberSet.style.display = "none";
        }
    });

    DATABASE.ref("/work_numbers/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().worknumber != undefined) {
            document.getElementById("workText").innerText = d.val().worknumber;
            document.getElementById("workPhoneNumber").style.display = "none";
            workSet.style.display = "none";
        }
    });
});

//go back to main account screen when back btn is pressed
profileBtn.addEventListener("click", function(){
    profilePage.style.display = "block";
    settingsPage.style.display = "none";
    postResetEmail.style.display = "none";
});

//opens the settings menu when the btn is pressed
settingsBtn.addEventListener("click", function(){
    profilePage.style.display = "none";
    postResetEmail.style.display = "none";
    settingsPage.style.display = "inline-block";
});

changePassBtn.addEventListener("click", function(){
    DATABASE.ref("/users/" + AUTH.currentUser.uid).once('value').then(d => {
        AUTH.sendPasswordResetEmail(d.val().email);
    });

    postResetEmail.style.display = "inline-block";
    settingsPage.style.display = "none";
});

backAcctBtn.addEventListener("click", function(){
    postResetEmail.style.display = "none";
    profilePage.style.display = "block";
});

birthdaySet.addEventListener("click", function(){
    let birthdayVal = document.getElementById("birthday").value;
    if(birthdayVal != "") {
        DATABASE.ref("birthdays/" + AUTH.currentUser.uid).set({
            birthday: birthdayVal,
        });

        DATABASE.ref("/birthdays/" + AUTH.currentUser.uid).once('value').then(d => {
            if(d.val().birthday != undefined) {
                document.getElementById("birthdayText").innerText = d.val().birthday;
                document.getElementById("birthday").style.display = "none";
                birthdaySet.style.display = "none";
            }
        });
    }

    else {
        alert("Birthday not filled out!");
    }
});

aboutMeSet.addEventListener("click", function(){
    let aboutMeVal = document.getElementById("aboutMeDesc").value;
    if(aboutMeVal != "") {
        DATABASE.ref("aboutme/" + AUTH.currentUser.uid).set({
            aboutme: aboutMeVal,
        });

        DATABASE.ref("/aboutme/" + AUTH.currentUser.uid).once('value').then(d => {
            if(d.val().aboutme != undefined) {
                document.getElementById("aboutMeText").innerText = d.val().aboutme;
                document.getElementById("aboutMeDesc").style.display = "none";
                aboutMeSet.style.display = "none";
            }
        });
    }

    else {
        alert("About Me not filled out!");
    }
});

numberSet.addEventListener("click", function(){
    let numberVal = document.getElementById("phoneNumber").value;
    if(numberVal != "") {
        DATABASE.ref("/phone_numbers/" + AUTH.currentUser.uid).set({
            phonenumber: numberVal,
        });

        DATABASE.ref("/phone_numbers/" + AUTH.currentUser.uid).once('value').then(d => {
            if(d.val().phonenumber != undefined) {
                document.getElementById("numberText").innerText = d.val().phonenumber;
                document.getElementById("phoneNumber").style.display = "none";
                numberSet.style.display = "none";
            }
        });
    }

    else {
        alert("Phone number not filled out!");
    }
});

workSet.addEventListener("click", function(){
    let numberVal = document.getElementById("workPhoneNumber").value;
    if(numberVal != "") {
        DATABASE.ref("/work_numbers/" + AUTH.currentUser.uid).set({
            worknumber: numberVal,
        });

        DATABASE.ref("/work_numbers/" + AUTH.currentUser.uid).once('value').then(d => {
            if(d.val().worknumber != undefined) {
                document.getElementById("workText").innerText = d.val().worknumber;
                document.getElementById("workPhoneNumber").style.display = "none";
                workSet.style.display = "none";
            }
        });
    }

    else {
        alert("Phone number not filled out!");
    }
});

document.getElementById("darkMode").addEventListener("click", function(){
    body.classList.toggle("dark-mode");
    let darkMode = false;
    if(body.classList.contains("dark-mode")){
        darkMode = true;
    }
    
    DATABASE.ref("/dark_mode/" + AUTH.currentUser.uid).set({
        
    });
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

//logs user out when logout btn is pressed
logoutBtn.addEventListener("click", function(){
    AUTH.signOut();
    location.assign("../login/login.html");
});