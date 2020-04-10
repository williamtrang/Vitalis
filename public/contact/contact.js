import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();

const contactBtn = document.getElementById("contactBtn");         //btn to add contact
const contactList = document.getElementById("contactList");       //list of contacts
const addContactDiv = document.getElementById("addContact");      //adding contact information div
const contactType = document.getElementById("contactType");       //selecting the contact type list
const addContactInfo = document.getElementById("addContactInfo"); //adding specific info are
const nextBtn = document.getElementById("nextBtn");               //btn to move from contact type to contact info
const finishBtn = document.getElementById("finishBtn");           //btn to finalize adding contact
const backToListBtn = document.getElementById("backToList");      //back btn to go back to contact list
const backToTypeBtn = document.getElementById("backToType");      //back btn to go back to contact type

const body = document.body;

//if user is not signed in, return to login page
AUTH.onAuthStateChanged(function(user) {
    if(!user){
        location.assign("../login/login.html");
        return;
    }

    DATABASE.ref("/dark_mode/" + AUTH.currentUser.uid).once('value').then(d => {
        if(d.val().darkmode == true) {
            body.classList.toggle("dark-mode");
        }
    });
});

//TODO: ADD REAL FUNCTIONALITY TO THESE BUTTONS LOL AND MAKE THE CONTACT LIST ABLE TO ADD CONTACTS
//begin the add contact process
contactBtn.addEventListener("click", function(){
    contactList.style.display = "none";
    addContactDiv.style.display = "inline-block";
    contactType.style.display = "inline-block";
    addContactInfo.style.display = "none";
});

//btn to go to the next page (add contact info page)
nextBtn.addEventListener("click", function(){
    addContactInfo.style.display = "inline-block";
    contactType.style.display = "none";
});

//TODO: VERIFY THAT AT LEAST NAME AND DESCRIPTION ARE FILLED
//finish adding contact and process and clear selections
finishBtn.addEventListener("click", function(){
    let radioList = document.getElementsByName("contact");
    contactList.style.display = "inline-block";
    addContactDiv.style.display = "none";
    let val = "";

    //find checked radio button and clear the radio selections
    for(let i = 0; i < radioList.length; i++){
        if(radioList[i].checked){
            val = radioList[i].value;
        }
        radioList[i].checked = false;
    }

    //add inputted information into database
    DATABASE.ref("contacts/" + AUTH.currentUser.uid + "/" + document.getElementById("nameInput").value).set({
        type: val,
        name: document.getElementById("nameInput").value,
        address: document.getElementById("addressInput").value,
        phoneNumber: document.getElementById("numberInput").value,
        email: document.getElementById("emailInput").value,
        description: document.getElementById("descInput").value,
    });

    /* clear selections */
    document.getElementById("nameInput").value = "";
    document.getElementById("addressInput").value = "";
    document.getElementById("numberInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("descInput").value = "";
});

//go back to contact list page and clear selections when clicked
backToListBtn.addEventListener("click", function(){
    contactList.style.display = "inline-block";
    addContactDiv.style.display = "none";

    /* clear selections */
    let radioList = document.getElementsByName("contact");
    for(let i = 0; i < radioList.length; i++){
        radioList[i].checked = false;
    }

    document.getElementById("nameInput").value = "";
    document.getElementById("addressInput").value = "";
    document.getElementById("numberInput").value = "";
    document.getElementById("emailInput").value = "";
    document.getElementById("descInput").value = "";
});

//go back to contact type page when btn is clicked
backToTypeBtn.addEventListener("click", function(){
    contactList.style.display = "none";
    addContactDiv.style.display = "inline-block";
    contactType.style.display = "inline-block";
    addContactInfo.style.display = "none";
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
