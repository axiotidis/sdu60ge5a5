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
		var email = user.email;
		var name = user.name;
		if (email != null){
			var message = 'Welcome user ' + email;
			alert(message);
			}else if(name != null){
				var message = 'Welcome user ' + name;
				alert(message);
			}
			} else {
					location.replace("signin.html");
				}
					
	});
