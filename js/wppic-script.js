/**
 * Plugin Name: WP Plugin Info Card by b*web
 * Author: Brice CAPOBIANCO - b*web
 */
jQuery(document).ready(function($) {
	
	$('.wp-pic-flip').each(function(){
		var timeoutFlip;
		var $this = $(this);
		$this.hover(function() {
			clearTimeout(timeoutFlip);
		}, function() {
			timeoutFlip = setTimeout( function () {
				$this.removeClass('wp-pic-flipped');
			 }, 2000);
		});
	});
	
	$('.wp-pic-download').click(function(){
		$(this).closest('.wp-pic-flip').addClass('wp-pic-flipped');
		return true;
	});

	$('.wp-pic-goback').click(function(){
		$(this).closest('.wp-pic-flip').removeClass('wp-pic-flipped');
		return true;
	});

	$('.wp-pic-dl-ico, .wp-pic-dl-link').click(function(){
		$('.wp-pic-dl-ico').addClass('wp-pic-dl-effet');
		return true;
	});
	
});