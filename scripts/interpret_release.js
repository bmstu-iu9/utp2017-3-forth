'use strict'

function isNumber(n) {
  return !isNaN( parseFloat(n) ) && isFinite(n);
}

function isSpace(n) {
  return n == '\n' || n == ' ' || n == '\t' || n == '\r';
}

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

function findEnd( i, t ) {
  var k = 1;
  while ( k != 0 ) {
    if ( t[i] == 'define' ) {
      ++k;
    }
    if ( t[i] == 'end' ) {
      --k;
    }
    ++i;
  }
  return --i;
}

function findEndif( i, t ) {
  var k = 1;
  while ( k != 0 ) {
    if ( t[i] == 'if' ) {
      ++k;
    }
    if ( t[i] == 'endif' ) {
      --k;
    }
    ++i;
  }
  return --i;
}

function findEndwhile( i, t ) {
  var k = 1;
  while ( k != 0 ) {
    if ( t[i] == 'while' ) {
      ++k;
    }
    if ( t[i] == 'endwhile' ) {
      --k;
    }
    ++i;
  }
  return --i;
}

function toString(stack) {
  var s = '';
  for (var i in stack) {
    s += stack[i] + '  ';
  }
  if (s != '') s += '\n';
  return s;
}

var math = {};
math.E = 2.718;
math.Tau = 6.283;
math.Pi = 3.142;
math.Log2E = 1.443;
math.Log10E = 0.434;
math.Ln2 = 0.693;
math.Ln10 = 2.302;
math.Sqrt2 = 1.414;
math.Sqrt3 = 1.732;
var values = {};
var dictionary = {};

var variablesString=getOutputString(values);
var outputString1='Константы:\n' + '\n' +
    'E = 2.718\n' + 'Tau = 6.283\n' + 'Pi = 3.142\n' +
    'Log2E = 1.443\n' + 'Log10E = 0.434\n' + 'Ln2 = 0.693\n' +
    'Ln10 = 2.302\n' + 'Sqrt2 = 1.414\n' + 'Sqrt3 = 1.732\n';
if (maxTextLen1<dic_func_output.cols) maxTextLen1=dic_func_output.cols;
for (var i=maxTextLen1;i>0;i--) {
    outputString1+='_';
}
outputString1+='\n'+'Переменные:\n'+'\n';

var functionsString=getOutputStringForFuncs(dictionary);
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

document.getElementById('runButton').onclick = (event) => {
  var text = editor.getValue();
  var contentstack = inputS.getValue();
  var tokens = [];
  var stack = [];
  dictionary = {};
  var i = 0;
  var str = '';
  var start = false;
  var startException = false;
  text += ' ';
  contentstack += ' ';
  resultOutput.value = '';
  while (i < text.length) {
    if ( i+1 < text.length && text[i] == '/' && text[i+1] == '*') {
      if (start) {
        tokens.push(str);
        str = '';
        start = false;
      }
      i += 2;
      while (i < text.length && text[i] != '/' && text[i-1] == '*') {
        ++i;
      }
    } else if ( i+1 < text.length && text[i] == '/' && text[i+1] == '/') {
      if (start) {
        tokens.push(str);
        str = '';
        start = false;
      }
      i += 2;
      while ( i < text.length && text[i] != '\n') {
        ++i;
      }
    } else if ( !isSpace(text[i]) ) {
      start = true;
      str += text[i];
    } else if (start) {
      tokens.push(str);
      str = '';
      start = false;
    }
    ++i;
  }
  i = 0;
  start = false;
  while (i < contentstack.length && !startException) {       //разделение текста стека на элементы
    if ( contentstack[i].match(/[0-9a-zA-Z]/) ) {
      start = true;
      str += contentstack[i];
    } else if (contentstack[i] == '-' && i > 0 && isSpace(contentstack[i-1]) && contentstack[i+1].match(/[0-9]/) ) {
      start = true;
      str += contentstack[i];
    } else if ( contentstack[i] == '.' && start ) {
      str += contentstack[i];
    } else if (start && str in math) {
      stack.push( Number( math[str] ) );
      str = '';
      start = false;
    } else if (start && isNumber(str) ) {
      stack.push( Number(str) );
      str = '';
      start = false;
    } else if ( !isSpace(contentstack[i]) ) {
      str += contentstack[i];
      ++i;
      while ( !isSpace(contentstack[i]) ) {
        str += contentstack[i];
        ++i;
      }
      resultOutput.value = 'Unexpected value in stack: ' + str + '\n';
      startException = true;
      str = '';
      start = false;
    }
    ++i;
  }
  if (!startException) {
    stack = decoding(tokens, 0, stack, [], dictionary);
    resultOutput.value += toString(stack);
  }
};

function decoding( tokens, index, stack, returnStack, dictionary ) {
  var str;
  var x, y, z;
  var error = false;
  while ( index < tokens.length ) {
    str = tokens[index];
    if ( isNumber(str) ) {
      stack.unshift( Number(str) );
    } else {
      switch (str) {
        case '+':
          x = stack.shift();
          y = stack.shift();
          z = Number( (y + x).toFixed(5) );
          stack.unshift(z);
          break;
        case '-':
          x = stack.shift();
          y = stack.shift();
          z = Number( (y - x).toFixed(5) );
          stack.unshift(z);
          break;
        case '*':
          x = stack.shift();
          y = stack.shift();
          z = Number( (y * x).toFixed(5) );
          stack.unshift(z);
          break;
        case '/':
          x = stack.shift();
          y = stack.shift();
          z = Number( (y / x).toFixed(5) );
          stack.unshift(z);
          break;
        case 'div':
          x = stack.shift();
          y = stack.shift();
          z = Math.round((y / x) - 0.5);
          stack.unshift(z);
          break;
        case 'mod':
          x = Math.round( stack.shift() );
          y = Math.round( stack.shift() );
          z = y % x
          stack.unshift(z);
          break;
        case 'neg':
          x = stack.shift();
          z = -x;
          stack.unshift(z);
          break;
        case '=':
          x = stack.shift();
          y = stack.shift();
          z = y == x ? -1 : 0;
          stack.unshift(z);
          break;
        case '>':
          x = stack.shift();
          y = stack.shift();
          z = y > x ? -1 : 0;
          stack.unshift(z);
          break;
        case '<':
          x = stack.shift();
          y = stack.shift();
          z = y < x ? -1 : 0;
          stack.unshift(z);
          break;
        case 'not':
          x = stack.shift();
          z = x ? 0 : -1;
          stack.unshift(z);
          break;
        case 'and':
          x = stack.shift();
          y = stack.shift();
          z = y && x ? -1 : 0;
          stack.unshift(z);
          break;
        case 'or':
          x = stack.shift();
          y = stack.shift();
          z = y || x ? -1 : 0;
          stack.unshift(z);
          break;
        case 'drop':
          stack.shift();
          break;
        case 'swap':
          x = stack.shift();
          y = stack.shift();
          stack.unshift(x);
          stack.unshift(y);
          break;
        case 'dup':
          x = stack.shift();
          stack.unshift(x);
          stack.unshift(x);
          break;
        case 'over':
          x = stack.shift();
          y = stack.shift();
          stack.unshift(y);
          stack.unshift(x);
          stack.unshift(y);
          break;
        case 'rot':
          x = stack.shift();
          y = stack.shift();
          z = stack.shift();
          stack.unshift(x);
          stack.unshift(y);
          stack.unshift(z);
          break;
        case 'depth':
          x = stack.length;
          stack.unshift(x);
          break;
        case 'define':
          dictionary[ tokens[ index + 1 ] ] = index + 1;
          index = findEnd( index + 1, tokens );
          break;
        case 'if':
          x = stack.shift();
          if ( !x ) {
            index = findEndif( index + 1, tokens );
          }
          break;
        case 'endif':
          break;
        case 'drop-all':
          stack = [];
          break;
        case 'while':
          x = stack.shift();
          if ( x ) {
            returnStack.push( index - 1 );
          } else {
            index = findEndwhile( index + 1, tokens );
            x = stack.shift();
          }
          break;
        case 'endwhile':
        case 'end':
        case 'exit':
          index = returnStack.pop();
          break;
        default:
          if (str in dictionary) {
            returnStack.push(index);
            index = dictionary[str];
          } else if ( str in math ) {
            stack.unshift(math[str]);
          } else if ( str in values ) {
            stack.unshift(values[str]);
          } else {
            error = true;
          }
          break;
      }
    }
    if ( error ) break;
    ++index;
  }
  if ( error ) resultOutput.value += 'Unexpected element:  ' + str + '\n';//сообщение об ошибке
  return stack;
};
///////////////////далее функции для вывода словарей

document.getElementById('dic_func_output').value= outputString1 + variablesString;

document.getElementById('variablesButton').onclick = function() {
  variablesString=getOutputString(values);
  document.getElementById('dic_func_output').value= outputString1 + variablesString;
};
document.getElementById('functionsButton').onclick = function() {
  functionsString=getOutputStringForFuncs(dictionary);
  document.getElementById('dic_func_output').value= outputString2 + functionsString;
};
