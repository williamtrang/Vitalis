import {firebaseConfig} from "../init.js"
//firebase.initializeApp(firebaseConfig);

//const auth = firebase.auth();

document.getElementById("signUp").addEventListener("click", function(){
    location.assign("../signup/signup.html");
});