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
var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var selectedMonth = months[d.getMonth()];
document.getElementById("month").innerHTML = "in "+selectedMonth;



function monthFunction(month){
	selectedMonth = month;
	document.getElementById("month").innerHTML = "in "+selectedMonth;
	//alert("Selected month is: "+selectedMonth);
	readMonthlyPerDevice(name, selectedMonth);
	readMonthlyTotal(name, selectedMonth);
	}
	


firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
		user = firebase.auth().currentUser;
		//var name = user.displayName;
		name = user.displayName;
		//read user details
		readMonthlyPerDevice(name, selectedMonth);
		readMonthlyTotal(name, selectedMonth);
		
		} else {
					location.replace("index.html");
				}
					
	});
	
function readMonthlyTotal(name, month){
	var mDataArray = [];
	var mRootRef = firebase.database().ref();
	var mUrlRef = dRootRef.child("users/"+name+"/consumption/monthly/totals/"+month+"/");
	mUrlRef.once("value", function(snapshot) {
		snapshot.forEach(function(child) {
		//console.log(child.key+": "+child.val());
		mDataArray = snapshotDataToArray(snapshot);
		});
		
		var totalForThisMonth = parseFloat(mDataArray[0]).toFixed(2);
		document.getElementById("consumtion").innerHTML = totalForThisMonth + " kWh";
	});
}	
	
function readMonthlyPerDevice(name, month){
	var dDataArray = [];
	var dLabelArray = [];
	var dRootRef = firebase.database().ref();
	var dUrlRef = dRootRef.child("users/"+name+"/consumption/monthly/perdevice/"+month+"/");
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
						window.chartColors.purple,			
						window.chartColors.grey,		
						window.chartColors.red,		
					],
					label: 'Daily Consumption per Device'
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
					text: 'Daily Consumption per Device'
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
