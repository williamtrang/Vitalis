import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const DATABASE = firebase.database();
let contactBtn = document.getElementById("contactBtn");
let contactList = document.getElementById("contactList");
let addContactDiv = document.getElementById("addContact");
let contactType = document.getElementById("contactType");
let addContactInfo = document.getElementById("addContactInfo");
let nextBtn = document.getElementById("nextBtn");

contactBtn.addEventListener("click", function(){
    contactList.style.display = "none";
    addContactDiv.style.display = "inline-block";
    addContactInfo.style.display = "none";
});

nextBtn.addEventListener("click", function(){
    addContactInfo.style.display = "inline-block";
    contactType.style.display = "none";
});