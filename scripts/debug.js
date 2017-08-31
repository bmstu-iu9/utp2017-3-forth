function show(state) {
	document.getElementById('window').style.display = state;      
 	document.getElementById('wrap').style.display = state;
 	if (state == 'none') {
 		inputD.setValue();
 		var bp = document.getElementById("inputD").getElementsByClassName("break_point")[0];
 		if(bp) {
 			bp.remove();
 		}
 	}
}
