var rotateThemes = function(){

	var THEMES = ['Blumenau', 'Floripa', 'Joinville', 'Lages'];
	var ugalContainer, themeTitleContainer, currTheme = 0;

	function init(){
		storeContainers();
		presentCurrentTheme();
	}

	function storeContainers(){
		themeTitleContainer = document.getElementById('themeTitle');
		ugalContainer = document.getElementById('ugalContainer');
	}

	function presentCurrentTheme(){
		renderTheme();
		printThemeTitle();
		centerThemeTitle()
		updateCurrentTheme();
	}

	function renderTheme(){
		ugal.init({
			container: ugalContainer.id,
			width: window.innerWidth,
			height: window.innerHeight,
			theme: THEMES[currTheme]
		});
	}

	function printThemeTitle(){
		themeTitleContainer.innerText = THEMES[currTheme];
	}

	function centerThemeTitle(){
		themeTitleContainer.style.marginLeft = getThemeTitleCenteredMargin('clientWidth');
		themeTitleContainer.style.marginTop = getThemeTitleCenteredMargin('clientHeight');
	}

	function getThemeTitleCenteredMargin(dimension){
		return parseInt((themeTitleContainer[dimension]/-2) + (ugalContainer[dimension]/2)) + 'px';
	}

	function updateCurrentTheme(){
		currTheme < 3 ? currTheme++ : currTheme = 0;
		setTimeout(presentCurrentTheme, 3000);
	}

	init();

}

window.onload = rotateThemes;