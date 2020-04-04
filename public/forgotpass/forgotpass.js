import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

let homeBtn = document.getElementById("homeBtn");
let submitBtn = document.getElementById("submitBtn");
const AUTH = firebase.auth();

submitBtn.addEventListener("click", function(){
    //TODO: ADD THIS WITH REAL FUNCTIONALITY WHEN QUYEN IS DONE STYLING
    if(document.getElementById("email").value != ""){
        AUTH.sendPasswordResetEmail(document.getElementById("email").value).then(function(){
            document.getElementById("preReset").style.display = "none";
            document.getElementById("postReset").style.display = "block";
        }).catch(e => alert(e));
    }
});

homeBtn.addEventListener("click", function(){
    location.assign("../login/login.html");
});