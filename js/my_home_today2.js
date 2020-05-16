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
	user = firebase.auth().currentUser;
	var name = user.displayName;				
	});

function readUserData(name){
	var dataArray = [];
	var labelArray = [];
	
	var rootRef = firebase.database().ref();
	var urlRef = rootRef.child("users/"+name+"/consumption/today/perdevice/");
	urlRef.once("value", function(snapshot) {
		snapshot.forEach(function(child) {
    //console.log(child.key+": "+child.val());
	
	dataArray = snapshotDataToArray(snapshot);
	labelArray = snapshotLabelToArray(snapshot);
	//console.log(totalsArray);
	
  });
  //console.log("The first record is: "+labelArray[0]+" : "+dataArray[0]);
  var numbOfDevices = labelArray.length;
  
  var ctx = document.getElementById('myDonut').getContext('2d');	//donut
	var myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [],
            borderColor: [],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});

for (var i = 0; i < hoursOfDay; ++i){
	myChart.data.labels.push(labelArray[i]);
	myChart.update();
	myChart.data.datasets.forEach((dataset) => {
				dataset.backgroundColor.push('rgba(255, 102, 0, 1)');
			});
	myChart.update();
	myChart.data.datasets.forEach((dataset) => {
		dataset.borderColor.push('rgba(255, 102, 0, 1)');
	});
	myChart.update();
	myChart.data.datasets.forEach((dataset) => {
		dataset.data.push(dataArray[i]);
	});
		myChart.update();
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

