/* added new code for dropdown*/
   $( document.body ).on( 'click', '.dropdown-menu li', function( event ) {

      var $target = $( event.currentTarget );

      $target.closest( '.button_group' )
         .find( '[data-bind="label"]' ).text( $target.text() )
            .end()
         .children( '.dropdown-toggle' ).dropdown( 'toggle' );

      return false;

   });

   /* end code */

(function () {




	
	/* New Ractive Object Intialisation */
	var	ractive = new Ractive({     
	  	el: '#progressbars-section',
	  	template: '#progressbar-template',
	  	data: {
	  		progressbar1: { percent_value: 25, fill_width_value: 25, color: '#6BAAD7'},
	  		progressbar2: { percent_value: 50, fill_width_value: 50, color: '#6BAAD7'},
	  		progressbar3: { percent_value: 75, fill_width_value: 75, color: '#6BAAD7'}
	  	}
	});

	/**
	 *
	 * Global Variables and Closures Initialisation
	 *
	 */
	
	var selected_dropdown_el = $('.dropdown-list li:first-child a');
	 var   decrementProgressValue = updateSliderAppearance(selected_dropdown_el);
	 var   incrementProgressValue = updateSliderAppearance(selected_dropdown_el);

	/**
	 *
	 * Event Handlers
	 *
	 */
	
	$('.minus25-button').on('click', function(event) {	
		decrementProgressValue(-25);
	});

	$('.minus10-button').on('click', function(event) {
		decrementProgressValue(-10);
	});
	$('.plus10-button').on('click', function(event) {
		incrementProgressValue(10)
	});
	$('.plus25-button').on('click', function(event) {
		incrementProgressValue(25);
	});

	$('.dropdown-list li a').on('click', function(event) {
		setSelectedProgressBar($(this));
	});

	
	/**
	 *
	 * Methods and Functions
	 *
	 */

	function setSelectedProgressBar(dropdown_el){
		selected_dropdown_el = dropdown_el;
		//Using closures
		decrementProgressValue = updateSliderAppearance(selected_dropdown_el);
		incrementProgressValue = updateSliderAppearance(selected_dropdown_el);

		//Update the dropdown field value
		$('.dropdown-selected-text').html(selected_dropdown_el.text());
	} 
	
	function updateSliderAppearance(progressbar_el){
		var progressbarname = progressbar_el.text();
			property1 = '.percent_value';
			property2 = '.fill_width_value';
			property3 = '.color';
		

	

		function updateProgressBarData(int_modifier){

			var percent_value_property = progressbarname + property1; 
				fill_width_value_property = progressbarname + property2;
				color_property = progressbarname + property3;

			    current_percentage_value = ractive.get(percent_value_property);
			    current_fill_width_value = ractive.get(fill_width_value_property);

			    difference_value = current_percentage_value + int_modifier;

			//change the ractive data here
			ractive.set(percent_value_property, (difference_value < 0 ? 0 : difference_value));
			ractive.set(fill_width_value_property, (difference_value < 0 ? 0 : difference_value));
			ractive.set(color_property, (ractive.get(fill_width_value_property) > 100 ? 'red' : '#6BAAD7'));
		}

		return updateProgressBarData;
	}
})(); 
