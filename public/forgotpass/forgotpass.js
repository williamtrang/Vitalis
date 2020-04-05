import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

let homeBtn = document.getElementById("homeBtn");     //home btn on second screen
let homeBtn2 = document.getElementById("homeBtnTwo"); //home btn on first screen
let signUpBtn = document.getElementById("signUpBtn"); //btn to go back to sign up on first screen
let submitBtn = document.getElementById("submitBtn"); //reset password btn
const AUTH = firebase.auth();

//when submit email, check if the email is valid and not blank. then, send password reset email and show second screen
submitBtn.addEventListener("click", function(){
    if(document.getElementById("email").value != ""){
        AUTH.sendPasswordResetEmail(document.getElementById("email").value).then(function(){
            document.getElementById("preReset").style.display = "none";
            document.getElementById("postReset").style.display = "block";
        }).catch(e => alert(e));
    }
    else {
        alert("Form is incomplete! Please fill out all the necessary fields.");
    }
});

//home btn functionalities: go back to login
homeBtn.addEventListener("click", function(){
    location.assign("../login/login.html");
});

homeBtn2.addEventListener("click", function(){
    homeBtn2.style.color = "blue";
    location.assign("../login/login.html");
});

//sign up btn functionality: go back to sign up
signUpBtn.addEventListener("click", function(){
    signUpBtn.style.color = "blue";
    location.assign("../signup/signup.html");
});