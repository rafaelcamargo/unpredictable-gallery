var ugal = function(){

	var UNITY_OF_MEASURE = 'px';
	var DEFAULT_COLORS = {
		CONTAINER_BACKGROUND: '#000',
		FRAME_BACKGROUND: '#333'
	};
	var container, width, height, hLength, vLength, unity, coords, fspace;

	function init(params){
		console.log('ugal started...');
		resetParams(params);
		setupContainer();
		setupUnityValues();
		setupPositionCoordinates();
		setupFrames();
	}

	function resetParams(params){
		container = document.getElementById(params.container);
		width = parseInt(params.width);
		height = parseInt(params.height);
		hLength = params.hLength;
		vLength = params.vLength;
		fspace = params.fspace;
	}

	function setupContainer(){
		container.style.position = 'relative';
		container.style.width = width + UNITY_OF_MEASURE;
		container.style.height = height + UNITY_OF_MEASURE;
		if(!container.style.backgroundColor)
			container.style.backgroundColor = DEFAULT_COLORS.CONTAINER_BACKGROUND;
	}

	function setupUnityValues(){
		unity = {
			'minWidth': parseInt(width/hLength) - fspace,
			'minHeight': parseInt(height/vLength) - fspace
		};
	}

	function setupPositionCoordinates(){
		coords = [];
		for (var i = 0; i < vLength; i++){
			var line = [];
			var y = (unity.minHeight * i) + (i*fspace) + fspace;
			for (var j = 0; j < hLength; j++) {
				var x = (unity.minWidth * j) + (j*fspace) + fspace;
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
		var usedArea = 0;
		for (var i = 0; i < getMaxPossibleFrames(); i++) {
			var fSize = setFrameSize();
			usedArea += fSize.width() * fSize.height();
			if(usedArea < getMaxPossibleArea())
				renderFrame(drawFrame(fSize, i));
		}
	}

	function getMaxPossibleFrames(){
		return hLength * vLength;
	}

	function getMaxPossibleArea(){
		return (unity.minWidth * hLength) * (unity.minHeight * vLength);
	}

	function setFrameSize(){
		return {
			'hSize': getFrameRandUnities(),
			'vSize': getFrameRandUnities(),
			'width': function(){
				return parseInt(this.hSize * unity.minWidth);
			},
			'height': function(){
				return parseInt(this.vSize * unity.minHeight);
			}
		};
	}

	function getFrameRandUnities(){
		var unities = parseInt(Math.random() * 10);
		if(unities && unities < 3)
			return unities;
		else
			return getFrameRandUnities();
	}

	function drawFrame(fSize, pos){
		var fTag = document.createElement('div');
		defineFramePosition(fTag);
		defineFrameSize(fTag, fSize);
		defineFrameCoords(fTag, fSize);
		defineFrameBackground(fTag);
		return fTag;
	}

	function defineFramePosition(fTag){
		fTag.style.position = 'absolute';
	}

	function defineFrameSize(fTag, fSize){
		fTag.style.width = fSize.width()  + UNITY_OF_MEASURE;
		fTag.style.height = fSize.height()  + UNITY_OF_MEASURE;
	}

	function defineFrameCoords(fTag, fSize){
		var coords = getFrameCoords(fSize);
		fTag.style.top = coords.y + UNITY_OF_MEASURE;
		fTag.style.left = coords.x + UNITY_OF_MEASURE;
	}

	function defineFrameBackground(fTag){
		fTag.style.backgroundColor = DEFAULT_COLORS.FRAME_BACKGROUND;
	}

	function getFrameCoords(fSize){
		for (var i = 0; i < coords.length; i++) {
			for (var j = 0; j < coords[i].length; j++)
				if(coordsAreAvailable(coords, i, j, fSize))
					return applyCoords(coords, fSize, i, j);
		};
	}

	function coordsAreAvailable(coords, i, j, fSize){
		return xCoordIsAvailable(coords, i, j, fSize.hSize)
			&& yCoordIsAvailable(coords, i, j, fSize.vSize);
	}

	function xCoordIsAvailable(coords, i, j, hSize){
		return coords[i][j].available && coords[i][j+hSize] && coords[i][j+hSize].available;
	}

	function yCoordIsAvailable(coords, i, j, vSize){
		return coords[i][j].available && coords[i+vSize] && coords[i+vSize][j] && coords[i+vSize][j].available;
	}

	function applyCoords(coords, fSize, i, j){
		markCoordsAsUnavailable(coords, fSize, i, j)
		return coords[i][j];
	}

	function markCoordsAsUnavailable(coords, fSize, i, j){
		for (var v = i; v < i+fSize.vSize; v++){
			for (var h = j; h < j+fSize.hSize; h++)
				coords[v][h].available = false;
		};
	}

	function renderFrame(fTag){
		container.appendChild(fTag);
	}

	return {
		init : init
	};

}();