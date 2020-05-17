//Listen for form submit
document.getElementById('sMonth').addEventListener('submit', submitForm);

//Submit form
function submitForm(e){
    e.preventDefault();
  
    //Get values
    var selectedMonth = getInputVal('sMonth');
	alert("Selected Month is: "+ selectedMonth);
	
}
