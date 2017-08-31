var create_bp = function(cell, number) {
  var bp = document.createElement("img");
  bp.src = "images/break_point.png";
  bp.className = "break_point";
  window.bp_value = number;
  if(number < 10) {
    bp.style.right = "26px";
  } else if(number < 100) {
    bp.style.right = "31px";
  } else {
    bp.style.right = "37px";
  }
  cell.appendChild(bp);
};

var find_number = function(cell) {
  var number = "";
  var i = 0;
  while(cell.innerHTML.length > i && cell.innerHTML[i] != "<") {
    number += cell.innerHTML[i];
    i++;
  }
  return number;
};

var bp_scroll = function(state) {
  var bp = document.getElementById(state).getElementsByClassName("break_point")[0];
  if(bp) {
    bp.remove();
  }
  var cells = document.getElementById(state).getElementsByClassName("ace_gutter-cell");
  var number = find_number(cells[0]);
  if(window.bp_value - number < cells.length && Number(window.bp_value) >= Number(number)) {
    create_bp(cells[window.bp_value - number], window.bp_value);
  }
};

var bp_put = function(state) {
  if (window.bp_value && Number(window.bp_value) > editor.session.getLength()) {
    window.bp_value = undefined;
  }
  var cells = document.getElementById(state).getElementsByClassName("ace_gutter-cell"); 
  for(var i = 0; i < cells.length; i++) {
    cell = cells[i];
    cell.onclick = function() {
      var number = find_number(this);
      var bp = document.getElementById(state).getElementsByClassName("break_point")[0];
      if(bp) {
        bp.remove();
      }
      if(window.bp_value != number) {
        create_bp(this, number);
      } else {
        window.bp_value = undefined;
      }
    };
  }
};

document.getElementById("editor").getElementsByClassName("ace_scrollbar")[0].onscroll = function() { bp_scroll("editor") };
editor.getSession().selection.on('changeSelection', function() { bp_put("editor") });
document.getElementById("inputD").getElementsByClassName("ace_scrollbar")[0].onscroll = function() { bp_scroll("inputD") };
