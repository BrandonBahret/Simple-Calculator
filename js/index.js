
function Calculator() {
  var currentInput = "0";
  var currentFormula = "";
  var endsWithAnOperator = /[÷×−+]$/g;
  var containsOperators = /[÷×−+]/g;
  
  function formulaEndsWithOperator(){
    return currentFormula.match(endsWithAnOperator);
  }

  function updateDisplay(){
    var formulaToDisplay = currentFormula;
    if(currentInput.match(containsOperators) === null){
      formulaToDisplay += currentInput;
    }
    
    if(currentInput.length > 10 || formulaToDisplay.length > 32){
      currentInput = "0";
      currentFormula = "";
      formulaToDisplay = "Digit Limit Met";
    }
    
    $("#input-formula").html(formulaToDisplay);
    $("#input-display").html(currentInput);
  }
  
  this.clearInput = function(){
    currentInput = "0";
    updateDisplay();
  }
  
  this.clearAll = function(){
    currentInput = "0";
    currentFormula = "";
    updateDisplay();
  }
    
  this.newOperation = function(operator){
    if(currentInput.match(containsOperators) !== null){
      currentFormula = currentFormula.substr(0, currentFormula.length - 1);
      currentFormula += operator;
      currentInput = operator;
    }
    else{
      currentFormula = currentFormula + currentInput + operator;
      currentInput = operator;
    }
    updateDisplay();
  }

  this.newInput = function(input){
    if(currentInput.match(containsOperators) !== null){
      currentInput = "";
    }
    
    if(currentInput === "0" && input !== "."){
      currentInput = input;
    }
    else{
      // Don't add more than one decimal point to our input
      if(input === "." && currentInput.indexOf(".") !== -1) return;
      currentInput += input;
    }
    updateDisplay();
  }
  
  this.backspace = function(){
    currentInput = currentInput.substr(0, currentInput.length - 1);
    if(currentInput.length === 0) currentInput = "0";
    updateDisplay();
  }
  
  this.evaluate = function(){
    var calculation = currentFormula + currentInput;
    
    // Reformat the formula to be handled by the eval function
    calculation = calculation.split("×").join("*");
    calculation = calculation.split("÷").join("/");
    calculation = calculation.split("−").join("-");
    
    var result = eval(calculation).toString();
    if(result % 1 !== 0){ 
      // If the result is a floating point, round it down
      result = parseFloat(result).toFixed(3);
    }
    
    currentInput = result;
    currentFormula = "";
    updateDisplay();
  }
}

var calc = new Calculator();


$(document).ready(function(){
  $(".numeric-button").on("click", function(){
    var input = $(this).text();
    calc.newInput(input);
  });
  
  $(".operation-button").on("click", function(){
    var operator = $(this).text();
    if(operator === "="){
      calc.evaluate();
    }
    else{
      calc.newOperation(operator);
    }
  });
  
  $(".action-button").on("click", function(){
    var action = $(this).text();
    switch(action) {
      case("CE"):
        calc.clearInput();
        break;
        
      case("C"):
        calc.clearAll();
        break;

      case("⌫"):
        calc.backspace();
        break;
    }
  });
  
});