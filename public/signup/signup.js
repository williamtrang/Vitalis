import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();

//btn to go back to sign in page
document.getElementById("signIn").addEventListener("click", function(){
    document.getElementById("signIn").style.color = "blue";
    location.assign("../login/login.html");
});

//once sign up btn is pressed, verify that both password fields are the same. then, create a user with 
//inputted info and store info in database
document.getElementById("signUpBtn").addEventListener("click", e => {
    //TODO: CHECK THAT ALL THE FIELDS ARE COMPLETED
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