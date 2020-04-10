import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();

//navigation buttons
const logoutBtn = document.getElementById("logoutBtn");             //btn to logout
const settingsBtn = document.getElementById("settingsBtn");         //btn to access settings
const profileBtn = document.getElementById("profileBtn");           //btn to accesss profile page

//main screens
const settingsPage = document.getElementById("settingsPage");       //settings page of account tab
const profilePage = document.getElementById("profilePage");         //profile page of account tab

//change password elements
const changePassBtn = document.getElementById("changePass");        //btn to reset password
const postResetEmail = document.getElementById("postResetEmail");   //landing page after resetting email
const backAcctBtn = document.getElementById("backAccountBtn");      //btn on landing page to go back to main pages

//user info elements
const birthdaySet = document.getElementById("birthdaySet");         //btn to set user birthday
const aboutMeSet = document.getElementById("aboutMeSet");           //btn to set user description
const numberSet = document.getElementById("phoneNumberSet");        //btn to set user phone number
const workSet = document.getElementById("workPhoneNumberSet");      //btn to set user work phone number
const profilePicSet = document.getElementById("profilePicInput");   //click to change profile picture

//toggle themes elements
const themeText = document.getElementById("themeText");             //text relating to current theme (light or dark)
const darkModeBtn = document.getElementById("darkMode");            //btn to toggle dark mode
const body = document.body;

//update information with user's specific information
AUTH.onAuthStateChanged(function(user) {
    //if user is not signed in, return to login page
    if(!user){
        location.assign("../login/login.html");
        return;
    }

    const storageRef = firebase.storage();

    //retrieve user data from firebase and update on-screen profile, first update is name and email
    const uId = AUTH.currentUser.uid;
    DATABASE.ref("/users/" + uId).once('value').then(d => {
        document.getElementById("username").innerText = d.val().forename.substring(0,1).toUpperCase() + d.val().forename.substring(1, d.val().forename.length).toLowerCase() + " " + 
        d.val().surname.substring(0,1).toUpperCase() + d.val().surname.substring(1, d.val().surname.length).toLowerCase();
       
        document.getElementById("profileDescFirst").innerText = d.val().forename.substring(0,1).toUpperCase() + d.val().forename.substring(1, d.val().forename.length).toLowerCase();
        document.getElementById("profileDescLast").innerText = d.val().surname.substring(0,1).toUpperCase() + d.val().surname.substring(1, d.val().surname.length).toLowerCase();
        document.getElementById("email").innerText = d.val().email;
    });

    //update user birthday (if exists in DB)
    DATABASE.ref("/birthdays/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().birthday != undefined) {
            document.getElementById("birthdayText").innerText = d.val().birthday;
            document.getElementById("birthday").style.display = "none";
            birthdaySet.style.display = "none";
        }
    });

    //update user description (if exists in DB)
    DATABASE.ref("/aboutme/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().aboutme != undefined) {
            document.getElementById("aboutMeText").innerText = d.val().aboutme;
            document.getElementById("aboutMeDesc").style.display = "none";
            aboutMeSet.style.display = "none";
        }
    });

    //update user phone number (if exists in DB)
    DATABASE.ref("/phone_numbers/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().phonenumber != undefined) {
            document.getElementById("numberText").innerText = d.val().phonenumber;
            document.getElementById("phoneNumber").style.display = "none";
            numberSet.style.display = "none";
        }
    });

    //update user work number (if exists in DB)
    DATABASE.ref("/work_numbers/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().worknumber != undefined) {
            document.getElementById("workText").innerText = d.val().worknumber;
            document.getElementById("workPhoneNumber").style.display = "none";
            workSet.style.display = "none";
        }
    });

    //update theme based on user past preferences (light is default)
    DATABASE.ref("/dark_mode/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().darkmode != undefined){
            if(d.val().darkmode == true) {
                body.classList.toggle("dark-mode");
                themeText.innerText = "Switch to Light Mode";
                darkModeBtn.innerText = "Light Mode";
            }
        }
    });

    //update user profile picture with what is stored in firebase storage
    storageRef.ref().child("profile_pics/" + AUTH.currentUser.uid + "/profilepic.jpg").getDownloadURL().then(function(url){
        document.getElementById("profilePic").src = url;
    }).catch(function(e){
        switch(e.code){
            case 'storage/object-not-found':
                // File doesn't exist, use default (anonymous) picture
                storageRef.ref("profile_pics/" + AUTH.currentUser.uid + "/profilepic.jpg").put("../assets/profiletemp.png");
                break;
            
            case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;
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

//listen for file to be added and update the users profile picture
profilePicSet.addEventListener("change", function(d){
    //get file
    let file = d.target.files[0];

    //create storage reference and upload file into firebase storage
    let storageRef = firebase.storage();
    let upload = storageRef.ref("profile_pics/" + AUTH.currentUser.uid + "/profilepic.jpg");

    let task = upload.put(file);

    //run the file upload
    task.on("state_changed", 
        function progress(snapshot){
        },

        function error(e){
        },

        //when file is done uploading, update the current profile picture with the newly added one
        function complete(){ 
            storageRef.ref().child("profile_pics/" + AUTH.currentUser.uid + "/profilepic.jpg").getDownloadURL().then(function(url){
                document.getElementById("profilePic").src = url;
            }).catch(function(e){
                switch(e.code){
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                }
            }); 
        }
    )
});

//listen for btn to be pressed, which sends password reset email to user
changePassBtn.addEventListener("click", function(){
    DATABASE.ref("/users/" + AUTH.currentUser.uid).once('value').then(d => {
        AUTH.sendPasswordResetEmail(d.val().email);
    });

    postResetEmail.style.display = "inline-block";
    settingsPage.style.display = "none";
});

//go back to the profile page
backAcctBtn.addEventListener("click", function(){
    postResetEmail.style.display = "none";
    profilePage.style.display = "block";
});

//listen for click and update user birthday in firebase DB 
birthdaySet.addEventListener("click", function(){
    let birthdayVal = document.getElementById("birthday").value;

    //if value is not blank, update user birthday
    if(birthdayVal != "") {
        //store birthday in DB
        DATABASE.ref("birthdays/" + AUTH.currentUser.uid).set({
            birthday: birthdayVal,
        });

        //update birthday on profile page
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

//listen for click and update user description in firebase DB
aboutMeSet.addEventListener("click", function(){
    let aboutMeVal = document.getElementById("aboutMeDesc").value;

    //if value is not blank, update user description
    if(aboutMeVal != "") {
        //store description in DB
        DATABASE.ref("aboutme/" + AUTH.currentUser.uid).set({
            aboutme: aboutMeVal,
        });

        //update description on profile page
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

//listen for click and update user phone number in firebase DB
numberSet.addEventListener("click", function(){
    let numberVal = document.getElementById("phoneNumber").value;

    //if value is not blank, update user number
    if(numberVal != "") {
        //store number in DB
        DATABASE.ref("/phone_numbers/" + AUTH.currentUser.uid).set({
            phonenumber: numberVal,
        });

        //update phone number on profile page
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

//listen for click and update user work number in firebase DB
workSet.addEventListener("click", function(){
    let numberVal = document.getElementById("workPhoneNumber").value;

    //if value is not blank, update work number in DB
    if(numberVal != "") {
        //store work number in DB
        DATABASE.ref("/work_numbers/" + AUTH.currentUser.uid).set({
            worknumber: numberVal,
        });

        //update work number on profile page
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

//listen for click and change theme on click
darkModeBtn.addEventListener("click", function(){
    //change theme by toggling dark-mode class
    body.classList.toggle("dark-mode");
    let darkMode = false;

    //change button and description text based on whehter or not dark mode is on
    if(body.classList.contains("dark-mode")){
        darkMode = true;
        themeText.innerText = "Switch to Light Mode";
        darkModeBtn.innerText = "Light Mode";
    }
    else {
        themeText.innerText = "Switch to Dark Mode";
        darkModeBtn.innerText = "Dark Mode";
    }

    //update last theme selection in DB to remember user selections
    DATABASE.ref("/dark_mode/" + AUTH.currentUser.uid).set({
        darkmode: darkMode,
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