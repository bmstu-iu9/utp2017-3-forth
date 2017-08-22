'use strict'

var maxTextLen=0;

function getOutputString(array) { // Функция, возвращающая строку для вывода (array - ассоциативный массив)
    var returnString='';
    var len;
    for (var i in array){
        returnString+=i+' = '+array[i]+'\n';
        len=i.length+3+String(array[i]).length;
        if (len>maxTextLen) maxTextLen=len;
    }
    return returnString;
}

function getOutputStringForFuncs(array) { // Для функций
    var returnString='';
    var len;
    for (var i in array){
        returnString+=i+'\n';
        len=i.length;
        if (len>maxTextLen) maxTextLen=len;
    }
    return returnString;
}

var constants = {'x': '15', 'y': '7', 'len': '45289485029845000000000000000000000000000000000000'}; // Создаём ассоциативный массив
constants['N'] = 100; // Добавим ещё элемент
var outputString1=getOutputString(constants);

var userVariables = {'a': 20, 'min': 53, 'max': 67, 'k':121231241351235, 'name':'Petya'};
var outputString2=getOutputString(userVariables);

var functions = { 'fib':'', 'findMax':'', 'reverse':''};
var outputString3=getOutputStringForFuncs(functions);

var string='Константы';
output.value=string+'\n';
output.value+=outputString1;
if (maxTextLen<output.cols) maxTextLen=output.cols;
for (var i=maxTextLen;i>0;i--) {
    output.value+='_';
}
string='Переменные';
output.value+='\n\n' + string + '\n' + outputString2;
for (var i=maxTextLen;i>0;i--) {
    output.value+='_';
}
string='Функции';
output.value+='\n\n' + string + '\n' + outputString3;