import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();

document.getElementById("signIn").addEventListener("click", function(){
    location.assign("../login/login.html");
});

document.getElementById("signUpBtn").addEventListener("click", e => {
    if(document.getElementById("password").value == document.getElementById("confirmPass").value){
        AUTH.createUserWithEmailAndPassword(document.getElementById("username").value, document.getElementById("password").value).then(() => {
            DATABASE.ref("users/"+AUTH.currentUser.uid).set({
				forename: document.getElementById("firstName").value,
                surname: document.getElementById("lastName").value,
                email: document.getElementById("username").value,
			}).then(() => window.location.href = "../login/login.html");
        }).catch(e => alert(e));
    }
    else {
        alert("Passwords don't match!");
        document.getElementById("password").value = "";
        document.getElementById("confirmPass").value = "";
    }
});