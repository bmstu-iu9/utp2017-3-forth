var i = 0;
var k = 0;
prev.onclick = function() {
	if(sessionStorage.length !== 0 && k != 0) {
		editor.setValue(sessionStorage.getItem(k - 1));
		k--;
	}
};

next.onclick = function() {
	if(sessionStorage.length !== 0 && k != 19) {
		editor.setValue(sessionStorage.getItem(k + 1));
		k++;
	}
};
save.onclick = function() {
	if(editor.getValue() !== "") {
		if(i == 20) {
			k = 19;
			for(var j = 0; j < 19; j++) {
				sessionStorage.setItem(j, sessionStorage.getItem(j + 1));
			}
			sessionStorage.setItem(i - 1, editor.getValue());
		} else {
			sessionStorage.setItem(i, editor.getValue());
			i = i + 1;
			k = i;
		}
	}
};
