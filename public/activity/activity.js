import {firebaseConfig} from "../init.js"
firebase.initializeApp(firebaseConfig);

const AUTH = firebase.auth();
const DATABASE = firebase.database();

//TODO: ADD ACTIVITY FUNCTIONALITY TO DATABASE AND DISPLAY ACTIVITIES IN ACTIVITY LIST

//if user is not signed in, return to login page
AUTH.onAuthStateChanged(function(user) {
    if(!user){
        location.assign("../login/login.html");
    }
});