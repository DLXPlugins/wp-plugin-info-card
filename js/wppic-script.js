jQuery(document).ready(function($) {
	
	$(function() {
		$this = $(this);
		$('.wp-pic-flip.wp-pic-flip').live('mouseleave',function() {
			$this.data('delay', setTimeout( function () {
				$('.wp-pic-flip').removeClass('wp-pic-flipped');
			  }, 2000)
			);
		});
		$('.wp-pic-flip.wp-pic-flip').live('mouseenter',function() {
			clearTimeout($this.data('delay'));
		});
		
	});	
	
	$('.wp-pic-download').click(function(){
		$('.wp-pic-flip').addClass('wp-pic-flipped');
		return true;
	});

	$('.wp-pic-goback').click(function(){
		$('.wp-pic-flip').removeClass('wp-pic-flipped');
		return true;
	});

	$('.wp-pic-dl-ico, .wp-pic-dl-link').click(function(){
		$('.wp-pic-dl-ico').addClass('wp-pic-dl-effet');
		return true;
	});
	
});