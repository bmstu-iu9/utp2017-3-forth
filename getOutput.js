'use strict'

var maxTextLen1=0;
var maxTextLen2=0;

function getOutputString(array) { // Функция, возвращающая строку для вывода (здесь array - ассоциативный массив)
    var returnString='';
    var len;
    for (var i in array){
        returnString+=i+' = '+array[i]+'\n';
        len=i.length+3+String(array[i]).length;
        if (len>maxTextLen1) maxTextLen1=len;
    }
    return returnString;
}

function getOutputStringForFuncs(array) { // Получение строки вывода для функций
    var returnString='';
    var len;
    for (var i in array){
        returnString+=i+'\n';
        len=i.length;
        if (len>maxTextLen2) maxTextLen2=len;
    }
    return returnString;
}

var userVariables = {'a': 20, 'min': 53, 'max': 67, 'k':121231241351235, 'name':'Petya'};
var variablesString=getOutputString(userVariables);
var constants={'p':3.14, 'e':2.72};
var constantsString=getOutputString(constants);
var outputString1='Константы:\n\n'+constantsString;

var functions = { 'fib':'', 'findMax':'', 'reverse':''};
var functionsString=getOutputStringForFuncs(functions);
var basicFunctions={'dup':'', 'drop':'', 'neg':''};
var basicFunctionsString=getOutputStringForFuncs(basicFunctions);
var outputString2='Базовые функции:\n\n'+basicFunctionsString;

if (maxTextLen1<output.cols) maxTextLen1=output.cols;
for (var i=maxTextLen1;i>0;i--) {
    outputString1+='_';
}
outputString1+='\n'+'Переменные:\n'+'\n';
// Конкатенируем outputString1 со списком переменных
outputString1+=variablesString;

if (maxTextLen2<output.cols) maxTextLen2=output.cols;
for (var i=maxTextLen2;i>0;i--) {
    outputString2+='_';
}
outputString2+='\n'+'Функции пользователя:\n'+'\n';
outputString2+=functionsString;

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