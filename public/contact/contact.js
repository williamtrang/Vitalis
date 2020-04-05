import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const DATABASE = firebase.database();
let contactBtn = document.getElementById("contactBtn");         //btn to add contact
let contactList = document.getElementById("contactList");       //list of contacts
let addContactDiv = document.getElementById("addContact");      //adding contact information div
let contactType = document.getElementById("contactType");       //selecting the contact type list
let addContactInfo = document.getElementById("addContactInfo"); //adding specific info are
let nextBtn = document.getElementById("nextBtn");               //btn to move from contact type to contact info
let finishBtn = document.getElementById("finishBtn");           //btn to finalize adding contact
let backToListBtn = document.getElementById("backToList");      //back btn to go back to contact list
let backToTypeBtn = document.getElementById("backToType");      //back btn to go back to contact type

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

//finish adding contact and process and clear selections
finishBtn.addEventListener("click", function(){
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
