'use strict'

function isNumber(n) {         //проверка на то, является ли строка числом
  return !isNaN( parseFloat(n) ) && isFinite(n);
}

function findEnd( i, t ) {     //поиск конца объявления функции
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

function findEndif( i, t ) {   //поиск завершения условия текущей вложенности
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

var tokens = [];
var numbers = [];
var stack = [];
var returnStack = [];
var dictionary = {};
var str;
var x, y, z;
var error = false;
var nos = 0;
var maxnos = 0;
var index = 0;
var values = {};

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

document.getElementById('parseB').onclick = (event) => {
  tokens = [];
  numbers = [];
  stack = [];
  returnStack = [];
  dictionary = {};
  error = false;
  nos = 0;
  maxnos = 0;
  index = 0;
  
  var text = inputD.value;                 //получение текстов из полей ввода
  var contentstack = inputS.value;
  var i = 0;
  str = '';
  var start = false;
  text += '\n';
  contentstack += '\n';
  nos = 0;
  while (i < text.length) {              //разделение текста на токены (слова)
    if (text[i] != ' ' && text[i] != '\t' && text[i] != '\n') {
      start = true;
      str += text[i];
    } else if ( text[i] == '\n' && start) {
      tokens.push(str);
      numbers.push(nos);         //сохранение номера строки для каждого токена
      str = '';
      start = false;
      ++nos;
    } else if ( text[i] == '\n' ) {
      ++nos;
    } else if (start) {
      tokens.push(str);
      numbers.push(nos);
      str = '';
      start = false;
    }
    ++i;
  }
  maxnos = nos;                 //ограничитель номера строки
  nos = 0;
  i = 0;
  start = false;
  while (i < contentstack.length) {       //разделение текста стека на элементы
    if ( contentstack[i].match(/[0-9]/) || contentstack[i] == '-') {
      start = true;
      str += contentstack[i];
    } else if ( contentstack[i] == '.' && start ) {
      str += contentstack[i];
    } else if (start) {
      stack.push( Number(str) );
      str = '';
      start = false;
    }
    ++i;
  }
};


//запуск интерпретации для 1 (!) строки
document.getElementById('interB').onclick = (event) => {
  if ( nos < maxnos ) {
    console.log('on string number ' + nos);   //временный вариант подсветки
    if ( !error ) {
      while ( numbers[index] == nos && index < tokens.length) {
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
              z = Math.round( y / x );
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
              nos = numbers[index];
              break;
            case 'var':
              if ( isNumber( tok[index + 2] ) ) {
                values[ tok[index+1] ] = Number( tok[index+2] );
              } else {
                error = true;
              }
              index = index + 2;
              break;
            case 'if':
              x = stack.shift();
              if ( !x ) {
                index = findEndif( index + 1, tokens );
                nos = numbers[index];
              }
              break;
            case 'endif':
              break;
            case 'end':
            case 'exit':
              index = returnStack.pop();
              nos = numbers[index];
              break;
            default:
              if (str in dictionary) {
                returnStack.push(index);
                index = dictionary[str];
                nos = numbers[index+1] - 1;
              } else if ( str in math ) {
                st.unshift(math[str]);
              } else if ( str in values ) {
                st.unshift(values[str]);
              } else {
                error = true;        //флаг, сигнализирующий об ошибочном вводе
              }
              break;
          }
        }
        if ( error ) break;
        ++index;
      }
      //остановка после выполнения строки
      ++nos;
    }
    if (error) console.log('Unexpected element:  ' + str);//сообщение об ошибке
    console.log(stack);    //вывод стека на шаге отладки
  } else console.log('program was ended');  //сообщение об окончании токенов
}
