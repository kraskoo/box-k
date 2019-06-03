(function () {
	var isBoxShown = false;
	var isStartedAnimation = false;
	
	window.addEventListener('load', onLoad);

	function onLoad() {
		createBoxElements();
		$('#flash-scrn-k').on('click', hideBox);
		$('#close-k').on('click', hideBox);
		$(document).on('keydown', function (ev) {
			if (ev.originalEvent.keyCode === 27) hideBox();
		});
		var allBoxes = $("a[rel='box-k']");
		for (let box of allBoxes) {
			$(box).on('click', function (ev) {
				ev.preventDefault();
				showBox();
				appendContent(this, $(this).attr('data-type'));
			});
		}
	}
	
	function appendContent(el, type) {
		if (type === 'image') {
			appendImage(el);
		} else if (type === 'video') {
			appendVideo(el);
		} else if (type === 'pdf') {
			appendOutterContent(el);
		} else {
			appendOutterContent(el);
		}
	}
	
	function appendOutterContent(el) {
		var iframe = $('<iframe>').attr('src', $(el).attr('href')).attr('frameborder', 0);
		setupWidthAndHeight(iframe[0], ($('#inner-k').width() * 0.8), ($('#inner-k').height() * 0.8));
		iframe.css('display', 'block').css('margin', '0 auto').css('border', 'none').css('padding-top', (Math.abs(iframe[0].height - $('#inner-k').height()) / 2) + 'px');
		$('#inner-k').append(iframe);
	}
	
	function appendVideo(el) {
		var innerK = $('#inner-k');	
		var video = $('<video>')
			.attr('controls', true)
			.attr('controlsList', 'nodownload noremoteplayback')
			.attr('disablePictureInPicture', true)
			.css('display', 'block')
			.css('margin', '0 auto');
		setupWidthAndHeight(video[0], (innerK.width() * 0.8), (innerK.height() * 0.8));
		video.css('padding-top', (Math.abs(video[0].height - innerK.height()) / 2) + 'px');
		var href = $(el).attr('href');
		var extension = href.split('.')[1].toLowerCase();
		var source = $('<source>')
			.attr('src', href)
			.attr('type', 'video/' + extension);
		video.append(source);
		innerK.append(video);
	}
	
	function appendImage(el) {
		var newImg = new Image();
		newImg.src = $(el).attr('href');
		var innerK = $('#inner-k');
		newImg.addEventListener('load', function () {
			var thisImg = $(this);
			thisImg.css('max-width', thisImg.width() < innerK.width() ? (thisImg.width() * 0.9) + 'px' : (innerK.width() * 0.9) + 'px')
				.css('max-height', thisImg.height() < innerK.height() ? (thisImg.height() * 0.9) + 'px' : (innerK.height() * 0.9) + 'px')
				.css('display', 'block')
				.css('margin', '0 auto')
				.css('padding-top', (Math.abs(thisImg.height() - innerK.height()) / 2) + 'px');
		});
		innerK.append(newImg);
	}
	
	function setupWidthAndHeight(el, width, height) {
		el.width = width;
		el.height = height;
	}
	
	function removeLastAppended() {
		var innerK = $('#inner-k');
		if (innerK.children().length > 1) {
			innerK.children().last().remove();
		}
	}
	
	function showBox() {
		if (isBoxShown || isStartedAnimation) {
			return;
		}
		
		isStartedAnimation = true;
		$('#flash-scrn-k').css('display', 'block');
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

	}
	
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
			$('#flash-scrn-k').css('display', 'none');
			isStartedAnimation = false;
		});
	}
	
	function createBoxElements() {
		$('body').append(
			$('<div id="box-k">').append(
				$('<div id="inner-k">').append(
					$('<div id="close-k">').html('&times;')))).append(
			$('<div id="flash-scrn-k">'));
	}
}());