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
		hFrames: 5,
		vFrames: 3,
		fBorder: 1
	});
}

window.onload = renderUgal;