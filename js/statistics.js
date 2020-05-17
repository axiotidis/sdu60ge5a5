var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var selectedMonth = months[d.getMonth()];
document.getElementById("month").innerHTML = "in "+selectedMonth;

function monthFunction(month){
	selectedMonth = month;
	document.getElementById("month").innerHTML = "in "+selectedMonth;
	//alert("Selected month is: "+selectedMonth);
	}
