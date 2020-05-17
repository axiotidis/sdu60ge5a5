var selectedMonth = "";
		function monthFunction(month){
			selectedMonth = month;
			document.getElementById("month").innerHTML = "in "+selectedMonth;
			alert("Selected month is: "+selectedMonth);
		}
