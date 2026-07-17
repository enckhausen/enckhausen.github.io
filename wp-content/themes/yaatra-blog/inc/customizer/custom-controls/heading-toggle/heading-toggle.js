( function( api, $ ) {
    api.controlConstructor['cv-heading-toggle'] = api.Control.extend( {
        ready: function() {
            var control = this, container = control.container;
            // on trigger action
            container.on( "click", function() {
                var _this = $(this);
                _this.find(".toggle-button .dashicons").toggleClass("dashicons-arrow-down-alt2 dashicons-arrow-up-alt2");
                _this.nextUntil( ".customize-control-mt-heading-toggle" ).slideToggle();
            })
        }
    });
} )( wp.customize, jQuery );
