function renderUgal(){
	ugal.init({
		container: 'ugalContainer',
		width: window.innerWidth,
		height: window.innerHeight*0.7
	});
}

window.onload = renderUgal;