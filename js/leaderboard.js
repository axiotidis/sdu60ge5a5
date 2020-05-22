var userArray = [];
var pointsArray = [];
var numberOfusers = 0;
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
		readUserPoints(name);
		
		
		} else {
					location.replace("index.html");
				}
					
	});


function readUserPoints(name){
	
	
	var rootRef = firebase.database().ref();
	var urlRef = rootRef.child("users");
	urlRef.once("value", function(snapshot) {
		snapshot.forEach(function(child) {
    //console.log(child.key+": "+child.val());
	userArray = snapshotLabelToArray(snapshot);
	/////////////pointsArray = snapshotLabelToArray(snapshot);
	//console.log(totalsArray);
	
  });
  
  numberOfusers = userArray.length;
  
  var ctx = document.getElementById('myChart').getContext('2d');
	var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
        labels: [],
        datasets: [{
            label: 'This Month\'s Leaderboard',
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    },
    options: {
		responsive: true,
		legend: {
			display: false,
				},
		title: {
			display: true,
			text: 'This Month\'s Leaderboard'
				},
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

for (var i = 0; i < numberOfusers; ++i){
	myChart.data.labels.push(userArray[i]);
	myChart.update();
	myChart.data.datasets.forEach((dataset) => {
				dataset.backgroundColor.push('rgba(255, 102, 0, 1)');
			});
	myChart.update();
	myChart.data.datasets.forEach((dataset) => {
		dataset.borderColor.push('rgba(255, 102, 0, 1)');
	});
	myChart.update();
	for (var j = 0; j < numberOfusers; ++j){
		var ref = firebase.database().ref("users/"+userArray[j]+"/profile/points").once('value').then(function(snapshot) {
		  var pointVal = snapshot.val();
		  console.log("pointVal= "+pointVal);
		  dataset.data.push(pointVal);
		  myChart.update();
		  
	});
	/*myChart.data.datasets.forEach((dataset) => {
		dataset.data.push(pointsArray[i]);
	});
		myChart.update();*/
}

});

}





function snapshotDataToArray(snapshot) {
	var returnArray = [];
	
	snapshot.forEach(function(childSnapshot) {
		var value = childSnapshot.val();
		returnArray.push(value);
	});
	
	return returnArray;
};

function snapshotLabelToArray(snapshot) {
	var returnArray = [];
	
	snapshot.forEach(function(childSnapshot) {
		var label = childSnapshot.key;
		returnArray.push(label);
	});
	
	return returnArray;
};

