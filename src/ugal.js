var ugal = function(){

	var UNITY_OF_MEASURE = 'px';
	var COLORS = {
		'none': {
			'colors': ['#000000','#333333']
		},
		'joinville': {
			'colors': ['#660A62','#1C0152']
		},
		'floripa': {
			'colors': ['#00AACC','#00954B']
		},
		'blumenau': {
			'colors': ['#FFBB1A','#FF0000']
		},
		'lages': {
			'colors': ['#7ACC29','#15CC3A']
		},
		'getGradient': function(){
			return '-45deg, ' + this[theme].colors[0] + ' 0%, ' +  this[theme].colors[1] + ' 100%';
		}
	}

	var container, width, height, hFrames, vFrames, fSpace, theme, usedArea, coords, frames, unity, images;

	function init(params){
		resetUgal();
		setParams(params);
		buildImagesObj();
		storeRawImagesSources();
		setupContainer();
		setupMinUnityValues();
		setupPositionCoordinates();
		setupFrames();
		if(images.raw.length)
			printImages();
		else
			paintGallery();
	}

	function resetUgal(){
		usedArea = 0;
		coords = [];
		frames = [];
		unity = {};
		images = {};
	}

	function setParams(params){
		container = document.getElementById(params.container);
		width = parseInt(params.width);
		height = parseInt(params.height);
		hFrames = params.hFrames || 5;
		vFrames = params.vFrames || 3;
		fSpace = params.fSpace || 1;
		theme = params.theme || 'none';
	}

	function buildImagesObj(){
		images = {
			'raw': getRawImages(),
			'sources': [],
			'list': [],
			'calcCenteredMargin': function(parentTag, imgTag, dir){
				var dim = dir == 'top' ? 'clientHeight' : 'clientWidth';
				return parseInt(imgTag[dim]/-2 + parentTag[dim]/2) + UNITY_OF_MEASURE;
			},
			'center': function(parentTag, imgTag){
				imgTag.style.marginTop = this.calcCenteredMargin(parentTag, imgTag, 'top');
				imgTag.style.marginLeft = this.calcCenteredMargin(parentTag, imgTag, 'left');
			},
			'getSource': function(imgTag){
				return imgTag.attributes[0].childNodes[0].nodeValue;
			},
			'setSource': function(imgTag, src){
				imgTag.setAttribute('src',src);
			},
			'remove': function(imgTag){
				imgTag.parentNode.removeChild(imgTag);
			}
		};
	}

	function getRawImages(){
		return document.querySelectorAll('img', container);
	}

	function storeRawImagesSources(){
		for (var i = 0; i < images.raw.length; i++){
			images.sources.push(images.getSource(images.raw[i]));
			images.remove(images.raw[i]);
		}
	}

	function setupContainer(){
		emptyContainer();
		styleContainer();
	}

	function emptyContainer(){
		var tags = document.querySelectorAll('div > div', container);
		for (var i = 0; i < tags.length; i++)
			container.removeChild(tags[i]);
	}

	function styleContainer(){
		container.style.position = 'relative';
		container.style.width = width + UNITY_OF_MEASURE;
		container.style.height = height + UNITY_OF_MEASURE;
		container.style.backgroundColor = COLORS[theme].colors[0];
	}

	function setupMinUnityValues(){
		unity.minWidth = getMinUnityValue(width, hFrames);
		unity.minHeight = getMinUnityValue(height, vFrames);
	}

	function getMinUnityValue(valType, val){
		return parseInt(valType/val) - fSpace;
	}

	function setupPositionCoordinates(){
		for (var i = 0; i < vFrames; i++){
			var line = [];
			var y = (unity.minHeight * i) + (i*fSpace) + fSpace;
			for (var j = 0; j < hFrames; j++) {
				var x = (unity.minWidth * j) + (j*fSpace) + fSpace;
				line.push({
					'x': x,
					'y': y,
					'available': true
				});
			}
			coords.push(line);
		}
	}

	function setupFrames(){
		var fBuilt;
		while(usedArea < getMaxPossibleArea()){
			fBuilt = drawFrame(buildFrameObj());
			if(fBuilt.style.top && fBuilt.style.left){
				storeFrame(fBuilt);
				renderFrame(fBuilt);
			}
		}
	}

	function getMaxPossibleFrames(){
		return hFrames * vFrames;
	}

	function getMaxPossibleArea(){
		return (unity.minWidth * hFrames) * (unity.minHeight * vFrames);
	}

	function buildFrameObj(){
		return {
			'hSize': getFrameRandUnities(),
			'vSize': getFrameRandUnities(),
			'getDimension': function(size, direction){
				var minUnity = unity.minWidth;
				if(direction == 'vertical')
					minUnity = unity.minHeight;
				return parseInt(size * minUnity) + this.setFrameSpaceIncrement(size);
			},
			'getHeight': function(){
				return this.getDimension(this.vSize, 'vertical');
			},
			'getUsedArea': function(){
				return (this.hSize * unity.minWidth) * (this.vSize * unity.minHeight);
			},
			'getWidth': function(){
				return this.getDimension(this.hSize, 'horizontal');
			},
			'setFrameSpaceIncrement': function(sizeToBeIncremented){
				return (sizeToBeIncremented * fSpace) - 1;
			}
		};
	}

	function getFrameRandUnities(){
		if(parseInt(Math.random() * 10) % 2 === 0)
			return 2;
		return 1;
	}

	function drawFrame(fSize){
		var fTag = document.createElement('div');
		defineFrameSize(fTag, fSize);
		defineFramePosition(fTag, fSize);
		defineFrameAppearance(fTag);
		return fTag;
	}

	function defineFrameSize(fTag, fSize){
		fTag.style.width = fSize.getWidth()  + UNITY_OF_MEASURE;
		fTag.style.height = fSize.getHeight()  + UNITY_OF_MEASURE;
	}

	function defineFramePosition(fTag, fSize){
		fTag.style.position = 'absolute';
		var position = getFramePosition(fSize);
		if(position)
			setFramePosition(fTag, position);
		else
			setupFrames();
	}

	function setFramePosition(fTag, position){
		fTag.style.top = position.y + UNITY_OF_MEASURE;
		fTag.style.left = position.x + UNITY_OF_MEASURE;
	}

	function defineFrameAppearance(fTag){
		fTag.style.backgroundColor = COLORS[theme].colors[1];
		fTag.style.overflow = 'hidden';
	}

	function getFramePosition(fSize){
		for (var i = 0; i < coords.length; i++) {
			for (var j = 0; j < coords[i].length; j++)
				if(isPositionAvailable(i, j, fSize))
					return applyPosition(fSize, i, j);
		}
	}

	function isPositionAvailable(i, j, fSize){
		return coordsAreAvailable(i, j, fSize) &&
			!frameExceedsContainersBounds(i, j, fSize);
	}

	function coordsAreAvailable(i, j, fSize){
		return isInitialCoordsAvailable(i, j) &&
			isFinalCoordsAvailable(i, j, fSize);
	}

	function isInitialCoordsAvailable(i, j){
		return coords[i][j].available;
	}

	function isFinalCoordsAvailable(i, j, fSize){
		var vFinalCoord = true;
		var hFinalCoord = true;
		if(fSize.vSize > 1 && !isLastRow(i))
			vFinalCoord = getFinalCoordsAvailability(coords[i+fSize.vSize-1][j]);
		if(fSize.hSize > 1 && !isLastCol(j))
			hFinalCoord = getFinalCoordsAvailability(coords[i][j+fSize.hSize-1]);
		return vFinalCoord && hFinalCoord;
	}

	function getFinalCoordsAvailability(coords){
		return coords.available;
	}

	function frameExceedsContainersBounds(i, j, fSize){
		if(isLastRow(i) && isLastCol(j))
			return fSize.hSize > 1 || fSize.vSize > 1;
		else if(isLastRow(i))
			return fSize.vSize > 1;
		else if (isLastCol(j))
			return fSize.hSize > 1;
	}

	function isLastRow(i){
		return i === getLastIndex(coords);
	}

	function isLastCol(j){
		return j === getLastIndex(coords[0]);
	}

	function getLastIndex(array){
		return array.length - 1;
	}

	function applyPosition(fSize, i, j){
		markCoordsAsUnavailable(fSize, i, j);
		increaseUsedArea(fSize);
		return coords[i][j];
	}

	function markCoordsAsUnavailable(fSize, i, j){
		for (var v = i; v < i+fSize.vSize; v++){
			for (var h = j; h < j+fSize.hSize; h++)
				coords[v][h].available = false;
		}
	}

	function increaseUsedArea(fSize){
		usedArea += fSize.getUsedArea();
	}

	function renderFrame(fTag){
		container.appendChild(fTag);
	}

	function storeFrame(frame){
		frames.push(frame);
	}

	function printImages(){
		renderFrameImages();
		positionFrameImages();
	}

	function renderFrameImages(){
		var j;
		for (var i = 0; i < frames.length; i++){
			j = images.sources[i] ? i : filterImageSourceIndex(j);
			appendImageOnFrame(i ,j);
			j++;
		}
	}

	function filterImageSourceIndex(imgSrcIndex){
		return images.sources[imgSrcIndex] ? imgSrcIndex : 0;
	}

	function appendImageOnFrame(frmTagIndex, imgSrcIndex){
		frames[frmTagIndex].appendChild(buildFrameImageTag(images.sources[imgSrcIndex]));
	}

	function buildFrameImageTag(imgUrl){
		var fImg = document.createElement('img');
		images.setSource(fImg, imgUrl);
		images.list.push(fImg);
		return fImg;
	}

	function positionFrameImages(){
		for (var i = 0; i < frames.length; i++)
			images.center(frames[i], images.list[i]);
	}

	function paintGallery(){
		for (var i = 0; i < frames.length; i++)
			setFrameBackground(frames[i]);
		setContainerBackground();
	}

	function setFrameBackground(frmTag){
		frmTag.style.backgroundColor = '#fff';
		frmTag.style.opacity = '0.35';
	}

	function setContainerBackground(){
		var prefix = getBrowserPrefix('backgroundImage');
		var val = getGradientValues();
		if(prefix)
			container.style.backgroundImage = prefix + val;
		else
			container.style.backgroundColor = THEMES[theme].colors[1];
	}

	function getBrowserPrefix(styleAttr){
		var el = document.createElement('div');
		var prefix = ['-o-', '-ms-', '-moz-', '-webkit-']
		for (var i = 0; i < prefix.length; i++) {
			el.style[styleAttr] = prefix[i] + getGradientValues();
			if (el.style[styleAttr])
			    return prefix[i];
			el.style[styleAttr] = '';
		}
	}

	function getGradientValues(){
		return 'linear-gradient(' + COLORS.getGradient() + ')';
	}

	return {
		init : init
	};

}();