(function () {
	var boxes = {};
	var dataTypes = {};
	var isBoxShown = false;
	var isStartedAnimation = false;
	
	window.addEventListener('load', onLoad);
	function onLoad() {
		createBoxElements();
		$('#flash-scrn-k')[0].addEventListener('click', hideBox);
		$('#close')[0].addEventListener('click', hideBox);
		document.addEventListener('keydown', function (ev) {
			if (ev.keyCode === 27) hideBox();
		});
		var allBoxes = document.querySelectorAll("a[rel='box-k']");
		for (var i = 0; i < allBoxes.length; i++) {
			allBoxes[i].setAttribute('index-id', i);
			dataTypes[i] = allBoxes[i].getAttribute('data-type');
			boxes[i] = allBoxes[i];
			allBoxes[i].addEventListener('click', function (ev) {
				ev.preventDefault();
				showBox();
				appendContent(this, this.getAttribute('data-type'));
			});
		}
	};
	
	function appendContent(el, type) {
		if (type === 'image') {
			appendImage(el);
		} else if (type === 'video') {
			appendVideo(el);
		} else if (type === 'pdf') {
			appendOutterContent(el);
		}
	};
	
	function appendOutterContent(el) {
		var iframe = document.createElement('iframe');
		iframe.src = el.getAttribute('href');
		iframe.frameborder = 0;
		setupWidthAndHeight(iframe, ($('#inner-k').width() * 0.8), ($('#inner-k').height() * 0.8));
		iframe.style.display = 'block';
		iframe.style.margin = '0 auto';
		iframe.style.paddingTop = (Math.abs(iframe.height - $('#inner-k').height()) / 2) + 'px';
		iframe.style.border = 'none';
		$('#inner-k')[0].appendChild(iframe);
	};
	
	function appendVideo(el) {
		var video = document.createElement('video');
		var source = document.createElement('source');
		video.controls = true;
		video.controlsList = 'nodownload noremoteplayback';
		video.disablePictureInPicture = true;
		var href = el.getAttribute('href');
		var extension = href.split('.')[1];
		source.src = href;
		source.type = 'video/' + extension;
		setupWidthAndHeight(video, ($('#inner-k').width() * 0.8), ($('#inner-k').height() * 0.8));
		video.style.display = 'block';
		video.style.margin = '0 auto';
		video.style.paddingTop = (Math.abs(video.height - $('#inner-k').height()) / 2) + 'px';
		video.appendChild(source);
		$('#inner-k')[0].appendChild(video);
	};
	
	function appendImage(el) {
		var newImg = new Image();
		newImg.src = el.getAttribute('href');
		newImg.addEventListener('load', function () {
			this.style.maxWidth = $(this).width() < $('#inner-k').width() ? ($(this).width() * 0.9) + 'px' : ($('#inner-k').width() * 0.9) + 'px';
			this.style.maxHeight = $(this).height() < $('#inner-k').height() ? ($(this).height() * 0.9) + 'px' : ($('#inner-k').height() * 0.9) + 'px';
			this.style.display = 'block';
			this.style.margin = '0 auto';
			this.style.paddingTop = (Math.abs($(this).height() - $('#inner-k').height()) / 2) + 'px';
		});
		$('#inner-k')[0].appendChild(newImg);
	};
	
	function setupWidthAndHeight(el, width, height) {
		el.width = width;
		el.height = height;
	};
	
	function removeLastAppended() {
		if ($('#inner-k')[0].children.length > 1) {
			$('#inner-k')[0].removeChild($('#inner-k')[0].childNodes[$('#inner-k')[0].children.length - 1]);
		}
	};
	
	function showBox() {
		if (isBoxShown || isStartedAnimation) {
			return;
		}
		
		isStartedAnimation = true;
		$('#flash-scrn-k')[0].style.display = 'block';
		$('#flash-scrn-k').animate({
			opacity: '0.65'
		},
		300);
		$('#box-k').animate({
			top: '10vh'
		},
		500,
		function () {
			isBoxShown = true;
			isStartedAnimation = false;
		});

	};
	
	function hideBox() {
		if (!isBoxShown || isStartedAnimation) {
			return;
		}
		
		isStartedAnimation = true;
		removeLastAppended();
		$('#box-k').animate({
			top: '-2500px'
		},
		500,
		function () {
			isBoxShown = false;
		});
		$('#flash-scrn-k').animate({
			opacity: '0'
		},
		550,
		function () {
			$('#flash-scrn-k')[0].style.display = 'none';
			isStartedAnimation = false;
		});
	};
	
	function createBoxElements() {
		var boxK = document.createElement('div');
		var flashBox = document.createElement('div');
		var innerK = document.createElement('div');
		var closeMark = document.createElement('div');
		boxK.setAttribute('id', 'box-k');
		flashBox.setAttribute('id', 'flash-scrn-k');
		innerK.setAttribute('id', 'inner-k');
		closeMark.setAttribute('id', 'close');
		closeMark.innerHTML += '&times;';
		innerK.appendChild(closeMark);
		boxK.appendChild(innerK);
		document.body.appendChild(boxK);
		document.body.appendChild(flashBox);
	};
}());