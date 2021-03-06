function isNumber(n) {
   return !isNaN( parseFloat(n) ) && isFinite(n);
}
 
function isSpace(n) {
   return n == '\n' || n == ' ' || n == '\t' || n == '\r';
}
 
function toString(stack) {
   var s = '';
   for (var i in stack) {
     s += stack[i] + ' ';
   }
   if (s != '') s += '\r\n\r\n';
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
 
 function reverseStack(contentstack) {
   contentstack += ' ';
   var start = false;
   var stack = [];
   var startException = false;
   var str = '';
   var i = 0;
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
       stack.unshift( Number( math[str] ) );
       str = '';
       start = false;
     } else if (start && isNumber(str) ) {
       stack.unshift( Number(str) );
       str = '';
       start = false;
     } else if ( !isSpace(contentstack[i]) ) {
       str += contentstack[i];
       ++i;
       while ( !isSpace(contentstack[i]) ) {
         str += contentstack[i];
         ++i;
       }
       startException = true;
       str = '';
       start = false;
     }
     ++i;
   }
   
   return toString(stack);
};
 
function downloadURI(uri, name) {
   var link = document.createElement("a");
   link.download = name;
   link.href = uri;
   document.body.appendChild(link);
   link.click();
   document.body.removeChild(link);
   delete link;
}
 
saveToFile.onclick = function() {
   var content = reverseStack( inputS.getValue() ) + editor.getValue();
   var data = encodeURI(content);
   var url = `data:text/plain;charset=utf-8,${data}`;
   downloadURI(url, 'test.txt');
};
 
file.onclick = function() {
	fileInput.click();
}

function processFiles(files) {
   var file = files[0];
   var reader = new FileReader();
   
   reader.onload = function (e) {
     // Когда это событие активируется, данные готовы.
     // Вставляем их в страницу в элемент
     var result = e.target.result;
     
     //      if(result != "") {
     //        if(result.charAt(0) == '\n') { //Проверка на наличие стека в файле
     //          if(result.length != 1) {
     //            inputS.setValue("");
     //            editor.setValue( result.slice(1) );
     //          }
     //        } else {
     //          var test = result.split('\n\n'); //Разделяем текст на стек и код
     //          inputS.setValue( reverseStack(test[0]) );
     //          editor.setValue(test[1]);
     //        }
     //      }
     editor.setValue(result);
 	};
   reader.readAsText(file);
}
