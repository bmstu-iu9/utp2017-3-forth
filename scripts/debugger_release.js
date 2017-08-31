'use strict'

function isNumber(n) {
  return !isNaN( parseFloat(n) ) && isFinite(n);
}

function isSpace(n) {
  return n == '\n' || n == ' ' || n == '\t' || n == '\r';
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
var notEnded = true;
var stringStack = [];
var stackMemory = '';
var startException = false;
var breakpoint = 0;

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

document.getElementById('last1').onclick = (event) => {
  document.getElementById('window').style.display = 'block';
  document.getElementById('wrap').style.display = 'block';
  if (window.bp_value) breakpoint = Number(window.bp_value);
  inputD.setValue(editor.getValue());
  var cells = document.getElementById("inputD").getElementsByClassName("ace_gutter-cell");
  for(var i = 0; i < cells.length; i++) {
    cell = cells[i];
    var number = find_number(cell);
    if(Number(number) == Number(window.bp_value)) {
      create_bp(cell, window.bp_value)
    }
  }
  tokens = [];
  numbers = [];
  stack = [];
  returnStack = [];
  dictionary = {};
  error = false;
  nos = 0;
  maxnos = 0;
  index = 0;
  notEnded = true;
  s_t_debug_output.value = '';
  stackMemory = '';
  startException = false;
  var text = editor.getValue();
  var contentstack = inputS.getValue();
  var i = 0;
  str = '';
  var start = false;
  text += '\n';
  contentstack += '\n';
  nos = 0;
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
      ++nos;
    } else if ( !isSpace(text[i]) ) {
      start = true;
      str += text[i];
    } else if ( text[i] == '\n' && start) {
      tokens.push(str);
      numbers.push(nos);
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
  maxnos = nos;
  nos = 0;
  i = 0;
  start = false;
  while (i < contentstack.length && !startException) {
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
      s_t_debug_output.value = 'Unexpected value in stack: ' + str + '\n';
      s_t_debug_output.focus();
      startException = true;
      str = '';
      start = false;
    }
    ++i;
  }
  stackMemory = toString(stack);
  if (stackMemory != '') stackMemory += '\n';
  if (!startException) {
    inputD.gotoLine(breakpoint);
    while (nos < breakpoint) {
      if ( nos < maxnos ) {
        stringStack.push(nos);
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
                case 'if':
                  x = stack.shift();
                  if ( !x ) {
                    index = findEndif( index + 1, tokens );
                    nos = numbers[index];
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
                    nos = numbers[index];
                    x = stack.shift();
                  }
                  break;
                case 'endwhile':
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
                    error = true;
                  }
                  break;
              }
            }
            if ( error ) break;
            ++index;
          }
          ++nos;
        }
        stackMemory = toString(stack) + '\n';
      }
    }
    if ( nos < maxnos ) {
      stringStack.push(nos);
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
              case 'if':
                x = stack.shift();
                if ( !x ) {
                  index = findEndif( index + 1, tokens );
                  nos = numbers[index];
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
                  nos = numbers[index];
                  x = stack.shift();
                }
                break;
              case 'endwhile':
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
                  error = true;
                }
                break;
            }
          }
          if ( error ) break;
          ++index;
        }
        ++nos;
      }
      s_t_debug_output.value += stackMemory;
      s_t_debug_output.focus();
      stackMemory = '';
      if (error) stackMemory +=('Unexpected element:  ' + str + '\n');
      stackMemory += toString(stack);
      stackMemory += '\n';
    } else if (notEnded) {
      notEnded = false;
      stackMemory += ('End of program\n');
    }
  }
  document.getElementById('doStep').onclick = (event) => {
    if (!startException) {
      if (notEnded) {
        if ( nos < maxnos ) {
          inputD.gotoLine(nos);
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
                    nos = numbers[index];
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
                  case 'drop-all':
                    stack = [];
                    break;
                  case 'while':
                    x = stack.shift();
                    if ( x ) {
                      returnStack.push( index - 1 );
                    } else {
                      index = findEndwhile( index + 1, tokens );
                      nos = numbers[index];
                      x = stack.shift();
                    }
                    break;
                  case 'endwhile':
                  case 'end':
                  case 'exit':
                    index = returnStack.pop();
                    nos = numbers[index];
                    break;
                  case 'var':
                    if ( isNumber(tokens[index + 2] ) ) {
                      values[ tokens[index+1] ] = Number( tokens[index+2] );
                    } else {
                      error = true;
                    }
                    index = index + 2;
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
                      error = true;
                    }
                    break;
                }
              }
              if ( error ) break;
              ++index;
            }
            ++nos;
          }
          s_t_debug_output.value += stackMemory;
          s_t_debug_output.focus();
          stackMemory = '';
          if (error) stackMemory +=('Unexpected element:  ' + str + '\n');
          stackMemory += toString(stack);
          stackMemory += '\n';
        } else if (notEnded) {
          notEnded = false;
          s_t_debug_output.value += stackMemory;
          stackMemory = '';
          stringStack.push(-1);
          s_t_debug_output.value += ('End of program\n');
          s_t_debug_output.focus();
        }
      }
    }
  };
};
