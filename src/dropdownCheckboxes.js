(function( $ ){
    var dropdownMethods = {

        init: function(options)
        {

          // Cancel default action
          $(this).find('.dropdown-menu li').click(function(e){
            e.stopPropagation();
          });

          // Loop through all
          var dropdowns = $(this);
          dropdowns.each(function(i){

            var dropdown = $(this);

            // Mark with custom class
            dropdown.addClass('dropdownCheckboxes');

            // Get the default label for this and store
            dropdown.data('default-label', dropdown.find('.dropdown-toggle').html().trim());

            // Add the hidden
            dropdown.append( $('<input/>', {
                type: 'hidden',
                class: 'hidden-input',
                name: dropdown.data('name'),
                value: ''
            }) );

            // Make checkboxes eval
            dropdown.find('input[type=checkbox]').click(function(){
              $(this).dropdownCheckboxes('eval');
            });

            // Save button
            dropdown.find('button.save').click(function(){
              $(this).dropdownCheckboxes('eval');
            });

            // Clear button
            dropdown.find('button.clear').click(function(){
              $(this).closest('.dropdownCheckboxes').find('input[type=checkbox]').prop('checked',false);
              $(this).dropdownCheckboxes('eval');
            });

            // Run the eval
            dropdown.dropdownCheckboxes('eval');

          });

          // Done!
          return this;

        },

        eval: function()
        {

          if( $(this).hasClass('dropdownCheckboxes') ){
            var container = $(this);
          }else{
            var container = $(this).closest('.dropdownCheckboxes');
          }

          // Take the checked boxes and gather em up
          var labels = [];
          var values = [];
          container.find('input[type=checkbox]:checked').each(function(item){
            labels.push($(this).closest('label').text().trim());
            values.push($(this).val());
          });

          // Now set the UI
          if( values.length > 200 ){
            container.find('.dropdown-toggle').html(labels.length+' selected');
          }else if( values.length > 0 ){
            container.find('.dropdown-toggle').html(labels.join(', '));
          }else{
            container.find('.dropdown-toggle').html(container.data('default-label'));
          }
          container.find('input.hidden-input').val(JSON.stringify(values));

          // Trigger the display
          if( $(this).hasClass('save') || $(this).hasClass('close-dropdown') ){
            $(this).closest(".dropdown-menu").prev().dropdown("toggle");
          }
          
          // Done
          return this;

        },
        apply: function()
        {
          return this;
        },
        cancel: function()
        {
          return this;
        }
    };
    $.fn.dropdownCheckboxes = function(methodOrOptions) {
        if( dropdownMethods[methodOrOptions] ){
            return dropdownMethods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        }else if( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            return dropdownMethods.init.apply(this,arguments);
        } // Skip error    
    };
})( jQuery );