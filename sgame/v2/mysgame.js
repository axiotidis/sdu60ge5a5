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

var name = "";

firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		user = firebase.auth().currentUser;
		
		name = user.displayName;
		//read user points
		readUserPoints(name);
		
		} else {
					location.replace("https://axiotidis.github.io/sdu60ge5a5/");
				}
					
	});
	
function readUserPoints(name){
var ref = firebase.database().ref("users/"+name+"/profile/points").once('value').then(function(snapshot) {
		  var pointVal = snapshot.val();
		  console.log("pointVal= "+pointVal);
		  document.getElementById("points").innerHTML = pointVal;
		
		  
	});
}	