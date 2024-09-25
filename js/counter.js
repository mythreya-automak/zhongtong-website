function initCounter(){
	document.querySelector("body").addEventListener("click",function(e){
		if(e.target.classList.contains('ptcounter__btnminus')){
			var objInput = e.target.parentNode.querySelector('input'),
				getValue = parseInt(objInput.value);
			setValue('minus', objInput, getValue);
		};
		if(e.target.classList.contains('ptcounter__btnplus')){
			var objInput = e.target.parentNode.querySelector('input'),
				getValue = parseInt(objInput.value);
			setValue('plus', objInput, getValue);
		};
	});
	function setValue(action,objInput,getValue){
		if(action === "minus"){
			var newValue = getValue - 1;
			if(newValue <= 0) return false;
			objInput.value = newValue;
		};
		if(action === "plus"){
			var newValue =  getValue + 1;
			objInput.value = newValue;
		};
	};
};
initCounter();