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
		//readTodayTotals(name);
		
		
		} else {
					location.replace("index.html");
				}
					
	});


function readTodayTotals(name){
	var dataArray = [];
	var labelArray = [];
	
	var rootRef = firebase.database().ref();
	var urlRef = rootRef.child("users/"+name+"/consumption/today/totals/");
	urlRef.once("value", function(snapshot) {
		snapshot.forEach(function(child) {
    //console.log(child.key+": "+child.val());
	
	dataArray = snapshotDataToArray(snapshot);
	labelArray = snapshotLabelToArray(snapshot);
	//console.log(totalsArray);
	
  });
  //console.log("The first record is: "+labelArray[0]+" : "+dataArray[0]);
  var dailyTotal = parseFloat(dataArray[labelArray.length-1]).toFixed(2);
  document.getElementById("consumtion").innerHTML = dailyTotal + " kWh"; //update the total consumption value
  //console.log("Total consumption is: "+dailyTotal+" kWh");
  var hoursOfDay = labelArray.length - 1;
  
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

