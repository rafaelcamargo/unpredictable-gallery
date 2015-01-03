function getTheme(themes){
	var tDrawn = parseInt(Math.random()*10);
	if(tDrawn < 4)
		return themes[tDrawn];
	else
		return getTheme(themes);
}

function renderUgal(){

	var THEMES = ['blumenau', 'floripa', 'joinville', 'lages'];

	ugal.init({
		container: 'ugalContainer',
		width: window.innerWidth,
		height: window.innerHeight*0.8,
		theme: getTheme(THEMES)
	});

	setTimeout(renderUgal, 2000);
}

window.onload = renderUgal;