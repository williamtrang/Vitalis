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
});

backToListBtn.addEventListener("click", function(){
    contactList.style.display = "inline-block";
    addContactDiv.style.display = "none";
});

backToTypeBtn.addEventListener("click", function(){
    contactList.style.display = "none";
    addContactDiv.style.display = "inline-block";
    contactType.style.display = "inline-block";
    addContactInfo.style.display = "none";
});
