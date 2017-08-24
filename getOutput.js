'use strict'

function getOutputString(array) { // Функция, возвращающая строку для вывода (array - ассоциативный массив)
    var returnString='';
    for (var i in array){
        returnString+=i+' = '+array[i]+'\n';
    }
    return returnString;
}

function getOutputStringForFuncs(array) { // Для функций
    var returnString='';
    for (var i in array){
        returnString+=i+'\n';
    }
    return returnString;
}

var userVariables = {'a': 20, 'min': 53, 'max': 67, 'k':121231241351235, 'name':'Petya'};
var outputString1=getOutputString(userVariables);

var functions = { 'fib':'', 'findMax':'', 'reverse':''};
var outputString2=getOutputStringForFuncs(functions);

document.getElementById('output').value= outputString1;
document.getElementById('variablesButton').style.backgroundColor = '#778899';

document.getElementById('variablesButton').onclick = function() {
    document.getElementById('output').value= outputString1;
    document.getElementById('variablesButton').style.backgroundColor = '#778899';
    document.getElementById('functionsButton').style.backgroundColor = '#FFFFFF';
};
document.getElementById('functionsButton').onclick = function() {
    document.getElementById('output').value= outputString2;
    document.getElementById('variablesButton').style.backgroundColor = '#FFFFFF';
    document.getElementById('functionsButton').style.backgroundColor = '#778899';
};