(function($){
	$.fn.extend({ 
	    
		costEstimatr: function(options) {
		    
		    // Default plugin options which can be overwritten
			var defaults = {
			    price: $('span#price'),
			    showDaysEstimate: true,
			    days: $('span#days'),
			    dollarsPerDay: 200
			};
			
			var options = $.extend(defaults, options);
			
    		return this.each(function() {
    		    
				var o = options,
				    obj = $(this),
				    formEls = obj.find(':input');
				
				// Clear form when it loads if user refreshes    
				obj[0].reset();    
				
				// Get each form element from the selected form
				$.each(formEls, function() {
				    
				    var el = $(this),
				        defaultVal = el.val(),
				        // Regex to select any form elements that have a default value that is a number
			            numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
				    
				    if(numberRegex.test(defaultVal)) {
				        // Change event for updating innerHtml of selected price container  
				        el.bind('change', function() {
				            var priceUpdate = 0;
				        
                            // Get value of any checkbox, radio or select option that has a value that is a number
                            $("input:checked, option:selected").each(function() {
                                var inputVal = $(this).val();
                                priceUpdate += parseFloat(inputVal);
                            });
                        
                            // Display updated price in selected container
			                defaults.price.html(priceUpdate.toFixed(2));
			            
			                // If user chooses to display ETA update days in selected container
			                if(defaults.showDaysEstimate === true) {
			                    defaults.days.html(Math.round(priceUpdate/defaults.dollarsPerDay));
		                    }
				        });
			        }
				});
    		});
    	}
	});
})(jQuery);