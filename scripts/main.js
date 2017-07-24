var $cells = [1,2,3,4,5,6,7,8,9,0,"+","-","*","/","=","clear"];
var $stored_variables = [];

function initElement(){
  for(var i = 0; i < $cells.length; i++){
  	var temp = document.getElementById($cells[i]);
  	setVariable(temp);
  }

};

function setVariable(element){
  if(element.innerHTML === "="){
  	element.onclick = total;
  }
  else if(element.innerHTML === "Clear"){
  	element.onclick = clear;
  }else{
  	element.onclick = clicked(element.innerHTML)
  }
}

function clicked(param){
	return function(){
		$stored_variables.push(param);
		console.log($stored_variables);
	}
}

function clear(){
	$stored_variables = [];
	console.log("Variables cleared");
}

function total(){
	for(var i = 0; i < $stored_variables.length; i++){

	}

	console.log("Totaled:"+$stored_variables);
}

function add(x,y){
	return x + y;
};

function subtract(x,y){
	return x - y;
};

function multiply(x,y){
	return x * y;
};

function divide(x,y){
	return x / y;
};

/*
function showAlert(event){
	return function(){
		console.log("onclick event detected! " + event);
		
		var array_of_operations = ["+","-","*","/"];
		var flag = false;
		var num1 = 0;

		for(var i = 0; i < array_of_operations.length; i++){
		  if(event === array_of_operations[i]){
		    flag = true;
		  }
		}

		if(!flag){
		  num1 += event;
		}

		console.log("number is" + parseInt(num1));
	};
}

*/