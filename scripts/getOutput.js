'use strict'

var maxTextLen1=14; // Максимальная длина строки для констант
var maxTextLen2=21; // Максимальная длина строки для базовых функций

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
var outputString1='Константы:\n' + '\n' +
    'E = 2.718\n' + 'Tau = 6.283\n' + 'Pi = 3.142\n' +
    'Log2E = 1.443\n' + 'Log10E = 0.434\n' + 'Ln2 = 0.693\n' +
    'Ln10 = 2.302\n' + 'Sqrt2 = 1.414\n' + 'Sqrt3 = 1.732\n';
if (maxTextLen1<dic_func_output.cols) maxTextLen1=dic_func_output.cols;
for (var i=maxTextLen1;i>0;i--) {
    outputString1+='_';
}
outputString1+='\n'+'Переменные:\n'+'\n';
// Конкатенируем outputString1 со списком переменных
outputString1+=variablesString;

var functions = { 'fib':'', 'findMax':'', 'reverse':''};
var functionsString=getOutputStringForFuncs(functions);
var outputString2='Базовые функции:\n' + '\n' + 'define..end\n' + 'exit\n' +
    'if..endif\n' + 'while..endwhile\n' + 'var\n' + 'drop\n' + 'drop-all\n' +
    'swap\n' + 'dup\n' + 'over\n' + 'depth\n' + 'rot\n' + 'and\n' + 'or\n' +
    'not\n' + '=\n' + '>\n' + '<\n' + '+\n' + '-\n' + '*\n' +
    '/\n' + 'div\n' + 'mod\n' + 'neg\n';
if (maxTextLen2<dic_func_output.cols) maxTextLen2=dic_func_output.cols;
for (var i=maxTextLen2;i>0;i--) {
    outputString2+='_';
}
outputString2+='\n'+'Функции пользователя:\n'+'\n';
outputString2+=functionsString;

document.getElementById('dic_func_output').value= outputString1;

document.getElementById('variablesButton').onclick = function() {
    document.getElementById('dic_func_output').value= outputString1;
};
document.getElementById('functionsButton').onclick = function() {
    document.getElementById('dic_func_output').value= outputString2;
};
