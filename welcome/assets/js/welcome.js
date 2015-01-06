function welcome(){

	var ugalContainer, pageHeaderContainer, counter;

	function init(){
		storeContainers();
		renderUgal();
		centerHeader();
	}

	function storeContainers(){
		ugalContainer = document.getElementById('ugalContainer');
		pageHeaderContainer = document.getElementById('pageHeaderContainer');
	}

	function renderUgal(){
		ugal.init({
			container: ugalContainer.id,
			width: window.innerWidth-17,
			height: window.innerHeight*0.8,
			theme: 'Floripa'
		});
	}

	function centerHeader(){
		pageHeaderContainer.style.marginLeft = getCenteredMargin(pageHeaderContainer, ugalContainer, 'clientWidth');
		pageHeaderContainer.style.marginTop = getCenteredMargin(pageHeaderContainer, ugalContainer, 'clientHeight');
	}

	function getCenteredMargin(el, parent, direction){
		return (el[direction]/-2) + (parent[direction]/2) + 'px';
	}

	init();
}

window.onload = welcome;
window.onresize = welcome;