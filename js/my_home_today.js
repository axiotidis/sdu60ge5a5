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
		readTodayTotals(name);
		readTodayPerDevice(name);
		
		} else {
					location.replace("index.html");
				}
					
	});

function readTodayPerDevice(name){
	var dDataArray = [];
	var dLabelArray = [];
	var dRootRef = firebase.database().ref();
	var dUrlRef = dRootRef.child("users/"+name+"/consumption/today/perdevice/");
	dUrlRef.once("value", function(snapshot) {
		snapshot.forEach(function(child) {
		//console.log(child.key+": "+child.val());
		dDataArray = snapshotDataToArray(snapshot);
		dLabelArray = snapshotLabelToArray(snapshot);
		});
		var noOfDevices = dLabelArray.length;
		
		var dtx = document.getElementById('myDonut').getContext('2d');
		
		var myDonut = new Chart(dtx, {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [
					dDataArray[0],
					dDataArray[1],
					dDataArray[2],
					dDataArray[3],
					dDataArray[4],
					dDataArray[5],
					dDataArray[6],
					dDataArray[7],
					],
					backgroundColor: [
						window.chartColors.red,
						window.chartColors.orange,
						window.chartColors.yellow,
						window.chartColors.green,
						window.chartColors.blue,
						window.chartColors.red,			//change color
						window.chartColors.orange,		//change color
						window.chartColors.yellow,		//change color
					],
					label: 'Consumption per Device'
				}],
				labels: [
				dLabelArray[0],
				dLabelArray[1],
				dLabelArray[2],
				dLabelArray[3],
				dLabelArray[4],
				dLabelArray[5],
				dLabelArray[6],
				dLabelArray[7]
				]
				},
				options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Consumption per Device'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
				}
			
			
		});
		myDonut.update();
	});
}

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
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Details of your daily consumption in kWh',
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

