/**
 * Plugin Name: WP Plugin Info Card by b*web
 * Author: Brice CAPOBIANCO - b*web
 */
jQuery(document).ready(function($) {
	var wrapper         = $("#wppic-liste"); 		//Fields wrapper
	var add_button      = $(".wppic-add-fields"); 	//Add button ID
	var add_input     	= $(".wppic-add"); 			//Fields list
	var fields     		= $(".wppic-dd"); 			//Fields list
	var field_remove    = 'wppic-remove-field';		//Remove item


	add_button.click(function(e){ //add button
		e.preventDefault();
		wrapper.append('<li class="wppic-dd ui-state-default" draggable="true"><input type="text" name="wppic_settings[list][]" value="' + add_input.val() + '" /><span class="' + field_remove + '" title="remove"></span></li>'); //add input box
		add_input.val('').focus();
	});
	
	
	$('.' + field_remove).live("click", function(){ //remove field
		console.log($(this));
		$(this).closest('li').remove(); 
	})
		

	$.fn.liveDraggable = function (opts) {
        this.live("mouseover", function() {
            if (!$(this).data("init")) {
                $(this).data("init", true).sortable(opts);
            }
        });
        return $();
    };
	wrapper.liveDraggable()
				
});

	
	/*wrapper.sortable({
		handle: fields, 
		opacity: 0.8,
		update: function() {
			$(fields, wrapper).each(function(index, elem) {
				 var $listItem = $(elem),
					 newIndex = $listItem.index();

				 // Persist the new indices.
			});
		}
	});*/
