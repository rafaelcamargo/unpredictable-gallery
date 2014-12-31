var ugal = function(){

	var UNITY_OF_MEASURE = 'px';
	var DEFAULT_COLORS = {
		CONTAINER_BACKGROUND: '#000',
		FRAME_BACKGROUND: '#333'
	};

	var container, width, height, hFrames, vFrames, fBorder, usedArea, coords, frames, unity, images;

	function init(params){
		resetUgal();
		setParams(params);
		buildImagesObj();
		storeRawImagesSources();
		setupContainer();
		setupMinUnityValues();
		setupPositionCoordinates();
		setupFrames();
		renderFrameImages();
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
		hFrames = params.hFrames;
		vFrames = params.vFrames;
		fBorder = params.fBorder;
	}

	function buildImagesObj(){
		images = {
			'raw': getRawImages(),
			'sources': [],
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
		container.style.position = 'relative';
		container.style.width = width + UNITY_OF_MEASURE;
		container.style.height = height + UNITY_OF_MEASURE;
		if(!container.style.backgroundColor)
			container.style.backgroundColor = DEFAULT_COLORS.CONTAINER_BACKGROUND;
	}

	function setupMinUnityValues(){
		unity.minWidth = getMinUnityValue(width, hFrames);
		unity.minHeight = getMinUnityValue(height, vFrames);
	}

	function getMinUnityValue(valType, val){
		return parseInt(valType/val) - fBorder;
	}

	function setupPositionCoordinates(){
		for (var i = 0; i < vFrames; i++){
			var line = [];
			var y = (unity.minHeight * i) + (i*fBorder) + fBorder;
			for (var j = 0; j < hFrames; j++) {
				var x = (unity.minWidth * j) + (j*fBorder) + fBorder;
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
				return (sizeToBeIncremented * fBorder) - 1;
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
		fTag.style.backgroundColor = DEFAULT_COLORS.FRAME_BACKGROUND;
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

	function renderFrameImages(){
		for (var i = 0; i < frames.length; i++)
			frames[i].appendChild(buildFrameImageTag(builFrameImageTagSource(i)));
	}

	function buildFrameImageTag(imgUrl){
		var fImg = document.createElement('img');
		images.setSource(fImg, imgUrl);
		return fImg;
	}

	function builFrameImageTagSource(i){
		if(images.sources[i])
			return images.sources[i];
		return builFrameImageTagSource(--i);
	}

	return {
		init : init
	};

}();