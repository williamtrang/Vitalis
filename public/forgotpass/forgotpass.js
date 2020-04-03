import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

let homeBtn = document.getElementById("homeBtn");
let submitBtn = document.getElementById("submitBtn");

submitBtn.addEventListener("click", function(){
    document.getElementById("preReset").style.display = "none";
    document.getElementById("postReset").style.display = "block";
});

homeBtn.addEventListener("click", function(){
    location.assign("../login/login.html");
});