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
	var rootRef = firebase.database.ref();
	var urlRef = rootRef.child("users/"+name+"/consumption/today/totals/");
	urlRef.once("value", function(snapshot) {
		snapshot.forEach(function(child) {
    console.log(child.key+": "+child.val());
  });
});
}
/*
	
//find user's records based on display name attribute
function readUserData(name){
	var ref = firebase.database().ref("users/"+name+"/consumption/today/totals/");
	ref.orderByChild('00').equalTo('00').on("child_added", function(snapshot) {
	console.log("snapshot key= "+snapshot.key);
	//dbKey = snapshot.key;	
	//let ref = database.ref("users/" + dbKey); 
	//ref.on("value" , gotData , errData);
	});
	//ref.on("value" , gotData , errData);
	
}	*/

/*
function gotData(data){
	data = data.val();
	todayTotal = data.total;
	//today00 = data.zero;
	//userNickname = data.nickname;
	//userPoints = data.points;
	console.log("Current user total = " + todayTotal+" kWh");
	//console.log("Current user at 00h = " + today00+" kWh");
	//console.log("Current user points = " + userPoints);

*/

/*
	
	var idUser = 0;
	var usersArray = [];
	// Get a database reference to the users section
    var ref = firebase.database().ref().child("users");
	ref.on('value', function(snapshot) {
    //console.log(snapshotToArray(snapshot));
	usersArray = snapshotToArray(snapshot);
	//console.log(usersArray);
	var numberOfUsers = usersArray.length;
	//console.log("There are " + numberOfUsers + "  registered users");
		

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'This week\'s scoring board',
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
		
for (var i = 0; i < numberOfUsers; ++i){
		if (usersArray[i].nickname == userNickname){
			myChart.data.labels.push(usersArray[i].nickname + " (You)");
			myChart.update();
			myChart.data.datasets.forEach((dataset) => {
				dataset.backgroundColor.push('rgba(255, 102, 0, 1)');	//red bar for current user
			});
			myChart.update();
			myChart.data.datasets.forEach((dataset) => {
				dataset.borderColor.push('rgba(255, 102, 0, 0.2)');
			});
			myChart.update();
			idUser = i;
		}else {
			myChart.data.labels.push(usersArray[i].nickname);
			myChart.update();
			myChart.data.datasets.forEach((dataset) => {
				dataset.backgroundColor.push('rgba(0, 151, 70, 1)');
			});
			myChart.update();
			myChart.data.datasets.forEach((dataset) => {
				dataset.borderColor.push('rgba(0, 151, 70, 0.2)');
		});
			myChart.update();
		}
		myChart.data.datasets.forEach((dataset) => {
			dataset.data.push(usersArray[i].points);
		});
		myChart.update();
		//console.log("User " + currentNickname + " have " + currentPoints + " points");
		
	}
});						*/
}


/*
//Listen for form submit
document.getElementById('scoreForm').addEventListener('submit', submitForm);

//Submit form
function submitForm(e){
    e.preventDefault();
  
    
    //Show alert
    document.querySelector('.alert').style.display = 'block';

    //Hide alert after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').style.display = 'none';
    },2000);

    

    setTimeout(function(){
        document.querySelector('.continue').style.display = 'block';
    },2000);

    setTimeout(function(){
        document.querySelector('.continue').style.display = 'none';
        window.location.replace("app.html");
    },4000);
	
}			*/

function errData(error){
	console.log(error.message , error.code);
}


/*

function snapshotToArray(snapshot) {
    var returnArr = [];

    snapshot.forEach(function(childSnapshot) {
        var item = childSnapshot.val();
        item.key = childSnapshot.key;

        returnArr.push(item);
    });

    return returnArr;
};

*/
