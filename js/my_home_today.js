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

function readUserData(name){
	var totalsArray = [];
	var rootRef = firebase.database().ref();
	var urlRef = rootRef.child("users/"+name+"/consumption/today/totals/");
	urlRef.once("value", function(snapshot) {
		snapshot.forEach(function(child) {
    //console.log(child.key+": "+child.val());
	totalsArray = snapshotToArray(snapshot);
	//console.log(totalsArray);
	
  });
});
console.log("The first record is: "+totalsArray[0]" : "+totalsArray[1]);
}

function snapshotToArray(snapshot) {
	var returnArray = [];
	
	snapshot.forEach(function(childSnapshot) {
		var label = childSnapshot.key;
		var value = childSnapshot.val();
		returnArray.push(label, value);
	});
	
	return returnArray;
};

