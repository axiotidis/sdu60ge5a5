// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyAvP3cRKmoJvCwcJYYJLRe_ARPN1_wngYo",
	authDomain: "sdy60ge5a5.firebaseapp.com",
	databaseURL: "https://sdy60ge5a5.firebaseio.com",
	projectId: "sdy60ge5a5",
	storageBucket: "sdy60ge5a5.appspot.com",
	messagingSenderId: "96930165171",
	appId: "1:96930165171:web:1c766954e21cc757d09bc6",
	measurementId: "G-H3SGFNEN3P"
	};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
let database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		user = firebase.auth().currentUser;
		var name = user.displayName;
		//read user details
		readUserData(name);
		} else {
					location.replace("index.html");
				}
					
	});
	
//find user's records based on display name attribute
function readUserData(name){
	var ref = firebase.database().ref("users/" + name + "/consumption/today/totals/");
	ref.on("value" , gotData , errData);
	}

function gotData(data){
	data = data.val;
	today00 = data.00;
	alert("Today at 00:00 = "+today00)
}
