var ugal = function(){

	var UNITY_OF_MEASURE = 'px';
	var DEFAULT_COLORS = {
		CONTAINER_BACKGROUND: '#000',
		FRAME_BACKGROUND: '#333'
	};

	var container, width, height, hLength, vLength, fSpace, coords, usedArea, unity;

	function init(params){
		resetParams(params);
		setupContainer();
		setupMinUnityValues();
		setupPositionCoordinates();
		setupFrames();
	}

	function resetParams(params){
		container = document.getElementById(params.container);
		width = parseInt(params.width);
		height = parseInt(params.height);
		hLength = params.hLength;
		vLength = params.vLength;
		fSpace = params.fSpace;
		usedArea = 0;
		coords = [];
		unity = {};
	}

	function setupContainer(){
		container.style.position = 'relative';
		container.style.width = width + UNITY_OF_MEASURE;
		container.style.height = height + UNITY_OF_MEASURE;
		if(!container.style.backgroundColor)
			container.style.backgroundColor = DEFAULT_COLORS.CONTAINER_BACKGROUND;
	}

	function setupMinUnityValues(){
		unity.minWidth = getMinUnityValue(width, hLength);
		unity.minHeight = getMinUnityValue(height, vLength);
	}

	function getMinUnityValue(valType, val){
		return parseInt(valType/val) - fSpace;
	}

	function setupPositionCoordinates(){
		for (var i = 0; i < vLength; i++){
			var line = [];
			var y = (unity.minHeight * i) + (i*fSpace) + fSpace;
			for (var j = 0; j < hLength; j++) {
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
			fBuilt = drawFrame(buildFrame());
			if(fBuilt.style.top && fBuilt.style.left)
				renderFrame(fBuilt);
		}
	}

	function getMaxPossibleFrames(){
		return hLength * vLength;
	}

	function getMaxPossibleArea(){
		return (unity.minWidth * hLength) * (unity.minHeight * vLength);
	}

	function buildFrame(){
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
		defineFramePositionType(fTag);
		defineFramePosition(fTag, fSize);
		defineFrameBackground(fTag);
		return fTag;
	}

	function defineFrameSize(fTag, fSize){
		fTag.style.width = fSize.getWidth()  + UNITY_OF_MEASURE;
		fTag.style.height = fSize.getHeight()  + UNITY_OF_MEASURE;
	}

	function defineFramePositionType(fTag){
		fTag.style.position = 'absolute';
	}

	function defineFramePosition(fTag, fSize){
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

	function defineFrameBackground(fTag){
		fTag.style.backgroundColor = DEFAULT_COLORS.FRAME_BACKGROUND;
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

	return {
		init : init
	};

}();