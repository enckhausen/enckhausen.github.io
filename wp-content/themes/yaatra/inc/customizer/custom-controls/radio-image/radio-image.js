/**
 * Custom scripts for the Radio Image Control.
 * 
 * Adds and manages JavaScript functionality for the Radio Image Control in the WordPress Customizer.
 *
 * @package Yaatra
 */


wp.customize.controlConstructor['cv-radio-image'] = wp.customize.Control.extend({

	ready: function() {

		'use strict';

		var control = this;

		// Change the value
		this.container.on( 'click', 'input', function() {
			control.setting.set( jQuery( this ).val() );
		});

	}
	
});