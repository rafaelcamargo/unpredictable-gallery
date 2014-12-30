function getWindowWidth(){
	return window.innerWidth;
}

function getWindowHeight(){
	return window.innerHeight;
}

function getUgalContainerHeight(){
	return getWindowHeight() * 0.7;
}

function renderUgal(){
	ugal.init({
		container: 'ugalContainer',
		width: getWindowWidth(),
		height: getUgalContainerHeight(),
		hLength: 5,
		vLength: 3,
		fSpace: 1
	});
}

window.onload = renderUgal;