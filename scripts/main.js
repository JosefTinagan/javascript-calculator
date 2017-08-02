$(document).ready(function(){
  var $cells = ["1","2","3","4","5","6","7","8","9","0","plus","minus","multiply","divide","total","clr"];

  var $stored_variables = [];
  var $stored_variables2 = [];
  var $stored_operator = [];

  for(var i = 0; i < $cells.length; i++){
    var temp = $cells[i];
    console.log(temp);

    $("#"+temp).click(function(){
      if(this.innerHTML === "Clear"){
      	$.fn.clear();
      } else if (this.id === "total"){
        $.fn.total();
      } else{
        $.fn.storeClickEvents(this);
        $.fn.screen();
      }
    });

    $("#"+temp).mousedown(function(){
      $(this).addClass("clicked-background");
    });
    $("#"+temp).mouseup(function(){
      $(this).removeClass("clicked-background");
    });
  }

  $.fn.storeClickEvents = function(param){
    console.log("Store Click Events Function");
    console.log("Element: "+param.innerHTML);

    var array_of_operators = ["+","-","*","/"];
    var operator_flag = false;

    for(var i = 0; i < array_of_operators.length; i++){
      if(param.innerHTML === array_of_operators[i]){
        operator_flag = true;
      }
    }

    if(operator_flag){
      $stored_operator.push(param.innerHTML);
    } else {
      if($stored_operator[0] === undefined){
        $stored_variables.push(param.innerHTML);
      } else {
        $stored_variables2.push(param.innerHTML);
      }
    }

    console.log($stored_variables);
    console.log($stored_operator);
    console.log($stored_variables2);
  };

  $.fn.screen = function(){
    console.log("Screen Function");
    var string = "";
    for(var i = 0; i < $stored_variables.length; i++){
      string += $stored_variables[i];
    }
    if($stored_operator[0]){
      string += " " + $stored_operator[0] + " ";
    }
    for(var i = 0; i < $stored_variables2.length; i++){
      string += $stored_variables2[i];
    }
    console.log(string);
    $("#scrn").html(string);
  }

  $.fn.clear = function(){
  	console.log("Clear Function");
    $stored_variables = [];
    $stored_variables2 = [];
    $stored_operator = [];
    $string = "";
  }

  $.fn.total = function(){
    console.log("Total Function");

    var first_num = 0;
    var second_num = 0;
    for(var i = 0; i < $stored_variables.length; i++){
      first_num += $stored_variables[i];
    }
    for(var i = 0; i < $stored_variables2.length; i++){
      second_num += $stored_variables2[i];
    }
    first_num = parseInt(first_num);
    second_num = parseInt(second_num);
    var operator = $stored_operator[0];
    var result = 0;
    if(operator === "+"){
 	  result = $.fn.add(first_num,second_num);
    } else if (operator === "-"){
       result = $.fn.subtract(first_num,second_num);
    } else if ( operator === "*"){
       result = $.fn.multiply(first_num,second_num);
    } else {
       result = $.fn.divide(first_num,second_num);
    }

    $.fn.clear();
    console.log(result);
    $stored_variables[0] = result;
    $.fn.screen();
  }

  $.fn.add = function(x,y){
  	return x + y;
  }

  $.fn.subtract = function(x,y){
  	return x - y;
  }

  $.fn.mutliply = function(x,y){
  	return x * y;
  }

  $.fn.divide = function(x,y){
  	return x / y;
  }
});

//Javascript Clean
/*
var $cells = [1,2,3,4,5,6,7,8,9,0,"+","-","*","/","=","clear"];
var $stored_variables = [];
var $stored_operator = [];
var $stored_variables2 = [];

function initElement(){
  for(var i = 0; i < $cells.length; i++){
  	var temp = document.getElementById($cells[i]);
  	setVariable(temp);
  }

}

function setVariable(element){
  if(element.innerHTML === "="){
  	element.onclick = function(){
  	  total();
  	}
  }
  else if(element.innerHTML === "Clear"){
  	element.onclick = function(){
  	  clear();
  	}
  }else{
  	element.onclick = function(){
  	  storeClicked(element);
  	  showNumbers();
  	}
  }
  element.onmousedown = function(){
  	element.classList.add("clicked-background");
  }
  element.onmouseup = function(){
  	element.classList.remove("clicked-background");

  }
}

function storeClicked(param){
  var element = param.innerHTML;
  var operator_flag = false;
  var arr_operators = ["+","-","*","/"];

  for(var i = 0;i < arr_operators.length; i++){
  	if(element === arr_operators[i]){
  		operator_flag = true;
  	}
  }
  if(operator_flag){
  	$stored_operator.push(element);
  } else {
  	if($stored_operator.length <= 0){
  	  console.log("Pushing to $stored_variables");
  	  $stored_variables.push(element);
  	} else {
   	  console.log("Pushing to $stored_variables2");
   	  $stored_variables2.push(element);
  	}
  }

  console.log("Stored Variables: "+$stored_variables+", Stored Operator: " +$stored_operator+", Stored Variables2: " +$stored_variables2);
}

function showNumbers(){
	var screen_string = "";
	for(var i = 0; i < $stored_variables.length; i++){
	  screen_string += $stored_variables[i];
	}
	if($stored_operator[0]){
	  screen_string += $stored_operator[0];
	}
	for(var i = 0; i < $stored_variables2.length; i++){
	  screen_string += $stored_variables2[i];
	}
	document.getElementById("screen").innerHTML = screen_string;
}

function clear(){
	$stored_variables = [];
	$stored_operator = [];
	$stored_variables2 = [];
	console.log("Variables cleared");
}

function total(){
	var first_num = "";
	var second_num = "";
	for(var i = 0; i < $stored_variables.length; i++){
      first_num += $stored_variables[i];
	}
	for(var j = 0; j < $stored_variables2.length; j++){
	  second_num += $stored_variables2[j];
	}
	var result = 0;
	first_num = parseInt(first_num);
	second_num = parseInt(second_num);
	if($stored_operator[0] === "+"){
	  console.log("Adding: "+first_num+" to "+ second_num);
	  result = add(first_num, second_num);
	} else if($stored_operator[0] === "-"){
	  console.log("Subtracting: "+first_num+" to "+ second_num);
	  result = subtract(first_num, second_num);
	} else if($stored_operator[0] === "*"){
	  console.log("Multiplying: "+first_num+" to "+ second_num);
	  result = multiply(first_num, second_num);
	} else if($stored_operator[0] === "/"){
	  console.log("Dividing: "+first_num+" to "+ second_num);
	  result = divide(first_num, second_num);
	}
    console.log("Result: "+result);
	clear();
	$stored_variables[0] = result;
	showNumbers();
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
