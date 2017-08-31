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

function findEndwhile( i, t ) {     //поиск конца цикла
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

function decoding( tok, index, st, retst, dict ) {     //запуск интерпретации
  var str;
  var x, y, z;
  var error = false;
  while ( index < tok.length ) {
    str = tok[index];
    if ( isNumber(str) ) {
      st.unshift( Number(str) );
    } else {
      switch (str) {
        case '+':
          x = st.shift();
          y = st.shift();
          z = Number( (y + x).toFixed(5) );
          st.unshift(z);
          break;
        case '-':
          x = st.shift();
          y = st.shift();
          z = Number( (y - x).toFixed(5) );
          st.unshift(z);
          break;
        case '*':
          x = st.shift();
          y = st.shift();
          z = Number( (y * x).toFixed(5) );
          st.unshift(z);
          break;
        case '/':
          x = st.shift();
          y = st.shift();
          z = Number( (y / x).toFixed(5) );
          st.unshift(z);
          break;
        case 'div':
          x = st.shift();
          y = st.shift();
          z = Math.round( y / x );
          st.unshift(z);
          break;
        case 'mod':
          x = Math.round( st.shift() );
          y = Math.round( st.shift() );
          z = y % x
          st.unshift(z);
          break;
        case 'neg':
          x = st.shift();
          z = -x;
          st.unshift(z);
          break;
        case '=':
          x = st.shift();
          y = st.shift();
          z = y == x ? -1 : 0;
          st.unshift(z);
          break;
        case '>':
          x = st.shift();
          y = st.shift();
          z = y > x ? -1 : 0;
          st.unshift(z);
          break;
        case '<':
          x = st.shift();
          y = st.shift();
          z = y < x ? -1 : 0;
          st.unshift(z);
          break;
        case 'not':
          x = st.shift();
          z = x ? 0 : -1;
          st.unshift(z);
          break;
        case 'and':
          x = st.shift();
          y = st.shift();
          z = y && x ? -1 : 0;
          st.unshift(z);
          break;
        case 'or':
          x = st.shift();
          y = st.shift();
          z = y || x ? -1 : 0;
          st.unshift(z);
          break;
        case 'drop':
          st.shift();
          break;
        case 'swap':
          x = st.shift();
          y = st.shift();
          st.unshift(x);
          st.unshift(y);
          break;
        case 'dup':
          x = st.shift();
          st.unshift(x);
          st.unshift(x);
          break;
        case 'over':
          x = st.shift();
          y = st.shift();
          st.unshift(y);
          st.unshift(x);
          st.unshift(y);
          break;
        case 'rot':
          x = st.shift();
          y = st.shift();
          z = st.shift();
          st.unshift(x);
          st.unshift(y);
          st.unshift(z);
          break;
        case 'depth':
          x = st.length;
          st.unshift(x);
          break;
        case 'define':
          dict[ tok[ index + 1 ] ] = index + 1;
          index = findEnd( index + 1, tok );
          break;
        case 'if':
          x = st.shift();
          if ( !x ) {
            index = findEndif( index + 1, tok );
          }
          break;
        case 'endif':
          break;
	case 'drop-all':
          st = [];
          break;
        case 'while':
          x = st.shift();
          if ( x ) {
            retst.push( index - 1 );
          } else {
            index = findEndwhile( index + 1, tok ); 
            x = st.shift();
          }
          break;
        case 'endwhile':
        case 'end':
        case 'exit':
          index = retst.pop();
          break;
	      case 'var':
          if ( isNumber(tok[index + 2] ) ) {
            values[ tok[index+1] ] = Number( tok[index+2] );
          } else {
            error = true;
          }
          index = index + 2;
          break;
        default:
          if (str in dict) {
            retst.push(index);
            index = dict[str];
          } else if (str in math) {
	          st.unshift(math[str]);
          } else if (str in values) {
	          st.unshift(values[str]);
          } else {
            error = true;            //флаг, сигнализирующий об ошибочном вводе
          }
          break;
      }
    }
    if ( error ) break;
    ++index;
  }
  if ( error ) console.log('Unexpected element:  ' + str);//сообщение об ошибке
  return st;
}

document.getElementById('interB').onclick = (event) => {
  var text = editor.getValue();                 //получение текстов из полей ввода
  var contentstack = inputS.value;
  
  var tokens = [];
  var stack = [];
  var dictionary = {};
  var i = 0;
  var str = '';
  var start = false;
  text += ' ';
  contentstack += ' ';
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
  
  while (i < text.length) {               //разделение текста на токены (слова)
    if (text[i] != ' ' && text[i] != '\t' && text[i] != '\n') {
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
  
  //запуск алгоритма интерпретации
  stack = decoding(tokens, 0, stack, [], dictionary); 
  console.log(stack);                                 //вывод стека
};
