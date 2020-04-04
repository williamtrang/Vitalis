import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const DATABASE = firebase.database();
let contactBtn = document.getElementById("contactBtn");
let contactList = document.getElementById("contactList");
let addContactDiv = document.getElementById("addContact");
let contactType = document.getElementById("contactType");
let addContactInfo = document.getElementById("addContactInfo");
let nextBtn = document.getElementById("nextBtn");
let finishBtn = document.getElementById("finishBtn");
let backToListBtn = document.getElementById("backToList");
let backToTypeBtn = document.getElementById("backToType");

//TODO: ADD REAL FUNCTIONALITY TO THESE BUTTONS LOL AND MAKE THE CONTACT LIST ABLE TO ADD CONTACTS
contactBtn.addEventListener("click", function(){
    contactList.style.display = "none";
    addContactDiv.style.display = "inline-block";
    contactType.style.display = "inline-block";
    addContactInfo.style.display = "none";
});

nextBtn.addEventListener("click", function(){
    addContactInfo.style.display = "inline-block";
    contactType.style.display = "none";
});

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

backToTypeBtn.addEventListener("click", function(){
    contactList.style.display = "none";
    addContactDiv.style.display = "inline-block";
    contactType.style.display = "inline-block";
    addContactInfo.style.display = "none";
});
