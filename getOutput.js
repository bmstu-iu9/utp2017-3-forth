'use strict'

function getOutputString(array) { // Функция, возвращающая строку для вывода (array - ассоциативный массив)
    var returnString='';
    for (var i in array){
        returnString+=i+' = '+array[i]+'<br>';
    }
    return returnString;
}

function getOutputStringForFuncs(array) { // Для функций
    var returnString='';
    for (var i in array){
        returnString+=i+'<br>';
    }
    return returnString;
}

var constants = {'x': '15', 'y': '7', 'len': '45289485029845000000000000000000000000000000000000'}; // Создаём ассоциативный массив
constants['N'] = 100; // Добавим ещё элемент
document.getElementById("constantsTab").innerHTML=getOutputString(constants);

var userVariables = {'a': 20, 'min': 53, 'max': 67, 'k':121231241351235, 'name':'Petya'};
document.getElementById("variablesTab").innerHTML=getOutputString(userVariables);

var functions = { 'fib':'', 'findMax':'', 'reverse':''};
document.getElementById("functionsTab").innerHTML=getOutputStringForFuncs(functions);