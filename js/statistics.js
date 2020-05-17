//Listen for form submit
document.getElementById('selectMonth').addEventListener('submit', submitForm);

//Submit form
function submitForm(e){
    e.preventDefault();
	var selectedMonth = getInputVal('sMonth');
	alert("Selected Month is: "+ selectedMonth);	
}


/*

var e = document.getElementById('sMonth');

var selectedMonth = e.options[e.selectedIndex].value;
alert("Selected Month is: "+ selectedMonth);

*/
