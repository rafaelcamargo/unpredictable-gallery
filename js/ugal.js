var ugal = function(){

	var UNITY_OF_MEASURE = 'px';
	var DEFAULT_COLORS = {
		CONTAINER_BACKGROUND: '#000',
		FRAME_BACKGROUND: '#333'
	};
	var container, hLength, vLength, unity, coords, fspace;

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
			var y = (unity.minHeight * i) + (i*fspace) + fspace;
			for (var j = 0; j < hLength; j++) {
				var x = (unity.minWidth * j) + (j*fspace) + fspace;
				coords.push({
					'x': x,
					'y': y
				});
			};
		}
	}

	function setupFrames(){
		//var maxPossibleArea = getMaxPossibleArea();
		for (var i = 0; i < getMaxPossibleFrames(); i++) {
			var fsize = setFrameSize();
			var fdrawn = drawFrame(fsize, i);
			renderFrame(fdrawn);
		};
	}

	function getMaxPossibleFrames(){
		return hLength * vLength;
	}

	function getMaxPossibleArea(){
		return (unity.width * hLength) * (unity.height * vLength);
	}

	function setFrameSize(){
		return {
			'width': parseInt(getFrameRandUnities() * unity.minWidth),
			'height': parseInt(getFrameRandUnities() * unity.minHeight)
		};
	}

	function getFrameRandUnities(){
		var unities = parseInt(Math.random() * 10);
		if(unities && unities < 2)
			return unities;
		else
			return getFrameRandUnities();
	}

	function drawFrame(fsize, pos){
		var fTag = document.createElement('div');
		fTag.style.width = fsize.width  + UNITY_OF_MEASURE;
		fTag.style.height = fsize.height  + UNITY_OF_MEASURE;
		fTag.style.position = 'absolute';
		fTag.style.top = coords[pos].y + UNITY_OF_MEASURE;
		fTag.style.left = coords[pos].x + UNITY_OF_MEASURE;
		if(!fTag.style.backgroundColor)
			fTag.style.backgroundColor = DEFAULT_COLORS.FRAME_BACKGROUND;
		return fTag;
	}

	function renderFrame(fdrawn){
		container.appendChild(fdrawn);
	}

	return {
		init : init
	};

}();