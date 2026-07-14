/**
 * Combine scripts for Customizer Controls.
 *
 * @package Yaatra
 */

jQuery(document).ready(function($) {
    'use strict';

/*---------------------- Responsive Switcher -----------------*/

    $( '.customize-control .responsive-switchers button:not(.cv-processed)' ).on( 'click', function( event ) {

        $(this).addClass('cv-processed');
        // Set up variables
        var $this       = $( this ),
            $devices    = $( '.responsive-switchers' ),
            $device     = $( event.currentTarget ).data( 'device' ),
            $control    = $( '.customize-control.has-switchers' ),
            $body       = $( '.wp-full-overlay' ),
            $footer_devices = $( '.wp-full-overlay-footer .devices' );

        // Button class
        $devices.find( 'button' ).removeClass( 'active' );
        $devices.find( 'button.preview-' + $device ).addClass( 'active' );

        // Control class
        $control.find( '.control-wrap' ).removeClass( 'active' );
        $control.find( '.control-wrap.' + $device ).addClass( 'active' );
        $control.removeClass( 'control-device-desktop control-device-tablet control-device-mobile' ).addClass( 'control-device-' + $device );

        // Wrapper class
        $body.removeClass( 'preview-desktop preview-tablet preview-mobile' ).addClass( 'preview-' + $device );

        // Panel footer buttons
        $footer_devices.find( 'button' ).removeClass( 'active' ).attr( 'aria-pressed', false );
        $footer_devices.find( 'button.preview-' + $device ).addClass( 'active' ).attr( 'aria-pressed', true );

        // Open switchers
        if ( $this.hasClass( 'preview-desktop' ) ) {
            $control.toggleClass( 'responsive-switchers-open' );
        }

    } );

    // If panel footer buttons clicked
    $( '.wp-full-overlay-footer .devices button:not(.cv-processed)' ).on( 'click', function( event ) {

        $(this).addClass('cv-processed');
        // Set up variables
        var $this       = $( this ),
            $devices    = $( '.customize-control.has-switchers .responsive-switchers' ),
            $device     = $( event.currentTarget ).data( 'device' ),
            $control    = $( '.customize-control.has-switchers' );

        // Button class
        $devices.find( 'button' ).removeClass( 'active' );
        $devices.find( 'button.preview-' + $device ).addClass( 'active' );

        // Control class
        $control.find( '.control-wrap' ).removeClass( 'active' );
        $control.find( '.control-wrap.' + $device ).addClass( 'active' );
        $control.removeClass( 'control-device-desktop control-device-tablet control-device-mobile' ).addClass( 'control-device-' + $device );

        // Open switchers
        if ( ! $this.hasClass( 'preview-desktop' ) ) {
            $control.addClass( 'responsive-switchers-open' );
        } else {
            $control.removeClass( 'responsive-switchers-open' );
        }

    } );

/*---------------------- Repeater ----------------------------*/

    // Function to refresh repeater field values
    const yaatraRefreshRepeaterValues = () => {
        $(".cv-repeater-field-control-wrap").each(function() {
            const values = [];
            const $this = $(this);

            $this.find(".cv-repeater-field-control").each(function() {
                const valueToPush = {};
                
                $(this).find('[data-name]').each(function() {
                    const dataName = $(this).attr('data-name');
                    const dataValue = $(this).attr('type') === 'checkbox' ? ($(this).is(':checked') ? 'on' : 'off') : $(this).val();

                    valueToPush[dataName] = dataValue;
                });

                values.push(valueToPush);
            });

            $this.next('.cv-repeater-collector').val(JSON.stringify(values)).trigger('change');
        });
    };

    // Function to handle the toggling of repeater fields
    const toggleRepeaterFields = (element) => {
        const $control = $(element).closest('.cv-repeater-field-control');
        $control.find('.cv-repeater-fields').slideToggle();
        $control.toggleClass('expanded');
    };

    // Function to handle the visibility of repeater field
    const toggleFieldVisibility = (element) => {
        const $control = $(element).closest('.cv-repeater-field-control');
        const $fieldTitle = $control.find('.cv-repeater-field-title');
        const $visibilityHolder = $control.find('input.repeater-field-visible-holder');
        const dataVal = $visibilityHolder.val();

        $(element).toggleClass("dashicons-visibility dashicons-hidden");
        $control.toggleClass('item-visible item-not-visible');
        $fieldTitle.toggleClass('item-visible item-not-visible');

        if (dataVal === 'show' && $control.find('.cv-repeater-fields').is(':visible')) {
            toggleRepeaterFields(element);
        }

        $visibilityHolder.val(dataVal === 'show' ? 'hide' : 'show');
        yaatraRefreshRepeaterValues();
    };

    // Event listener to expand the repeater fields wrap
    $('#customize-theme-controls').on('click', '.cv-repeater-field-title.item-visible', function() {
        toggleRepeaterFields(this);
    });

    // Event listener to close the repeater fields wrap
    $('#customize-theme-controls').on('click', '.cv-repeater-field-close', function() {
        toggleRepeaterFields(this);
    });

    // Event listener to show/hide repeater field
    $("#customize-theme-controls").on("click", ".field-display", function() {
        toggleFieldVisibility(this);
    });

    // Event listener to add a new repeater field
    $("body").on("click", '.cv-repeater-add-control-field', function() {
        const $parent = $(this).parent();
        const $field = $parent.find(".cv-repeater-field-control:first").clone();

        if ($field.length) {
            $field.find("input[type='text'][data-name]").each(function() {
                const defaultValue = $(this).attr('data-default');
                $(this).val(defaultValue);
            });

            $field.find(".cv-repeater-icon-list").each(function() {
                const defaultValue = $(this).next('input[data-name]').attr('data-default');
                $(this).next('input[data-name]').val(defaultValue);
                $(this).prev('.cv-repeater-selected-icon').children('i').attr('class', '').addClass(defaultValue);

                $(this).find('li').each(function() {
                    const iconClass = $(this).find('i').attr('class');
                    $(this).toggleClass('icon-active', defaultValue === iconClass);
                });
            });

            $field.find('.cv-repeater-fields').show();
            $parent.find('.cv-repeater-field-control-wrap').append($field);
            $field.addClass('expanded').find('.cv-repeater-fields').show();
            $('.accordion-section-content').animate({ scrollTop: $parent.height() }, 1000);
            yaatraRefreshRepeaterValues();
        }

        return false;
    });

    // Event listener to remove the repeater field item
    $("#customize-theme-controls").on("click", ".cv-repeater-field-remove", function() {
        const $parent = $(this).closest('.cv-repeater-field-control');
        if ($parent.length) {
            $parent.slideUp('normal', function() {
                $(this).remove();
                yaatraRefreshRepeaterValues();
            });
        }

        return false;
    });

    // Event listener to refresh repeater values on keyup/change
    $("#customize-theme-controls").on('keyup change', '[data-name]', function() {
        yaatraRefreshRepeaterValues();
        return false;
    });

    // Initialize sortable functionality for repeater fields
    $(".cv-repeater-field-control-wrap").sortable({
        orientation: "vertical",
        update: function() {
            yaatraRefreshRepeaterValues();
        }
    });

    // Event listener for repeater icon selector
    $('body').on('click', '.cv-repeater-icon-list li', function() {
        const iconClass = $(this).find('i').attr('class');
        $(this).addClass('icon-active').siblings().removeClass('icon-active');
        $(this).parent('.cv-repeater-icon-list').prev('.cv-repeater-selected-icon').children('i').attr('class', '').addClass(iconClass);
        $(this).parent('.cv-repeater-icon-list').next('input').val(iconClass).trigger('change');
        yaatraRefreshRepeaterValues();
    });

    // Event listener to toggle the icon list
    $('body').on('click', '.cv-repeater-selected-icon', function() {
        $(this).next().slideToggle();
    });

});

( function( api ) {

/*--------------- Upsell ------------------------*/

    api.sectionConstructor['cv-upsell'] = api.Section.extend( {

        // No events for this type of section.
        attachEvents: function () {},

        // Always make the section active.
        isContextuallyActive: function () {
            return true;
        }
    } );

/*---------------------- Tabs ------------------------------*/

   api.Tabs = [];
    api.Tab = api.Control.extend({
        ready: function () {
            var control = this;
            control.container.find('li.section-tab-button').click(function (e) {
                var key = jQuery(this).data('tab');
                e.preventDefault();
                control.container.find('li.section-tab-button').removeClass('active');
                jQuery(this).addClass('active');
                control.toggleActiveControls(key);
            });
            api.Tabs.push(control.id);
        },
        toggleActiveControls: function (key) {
            var control = this,
                currentFields = control.params.choices[key].fields;

            _.each(control.params.fields, function (id) {
                var tabControl = api.control(id);
                if (undefined !== tabControl) {
                    if (tabControl.active() && jQuery.inArray(id, currentFields) >= 0) {
                        tabControl.toggle(true);
                    } else {
                        tabControl.toggle(false);
                    }
                }
            });
        }
    });

    jQuery.extend(api.controlConstructor, {
        'cv-tabs': api.Tab
    });

    api.bind('ready', function () {
        _.each(api.Tabs, function (id) {
            var control = api.control(id);
            var iniID = control.container.find('li.active').data('tab');
            control.toggleActiveControls(iniID);
        });
    });

/*---------------------- Heading Toggle ------------------------*/

    api.controlConstructor['cv-heading-toggle'] = api.Control.extend( {
        ready: function() {
            var control = this, container = control.container;
            // on trigger action
            container.on( "click", function() {
                var _this = jQuery(this);
                _this.find(".toggle-button .dashicons").toggleClass("dashicons-arrow-down-alt2 dashicons-arrow-up-alt2");
                _this.nextUntil( ".customize-control-cv-heading-toggle" ).slideToggle();
            })
        }
    });

})(wp.customize);

/*---------------------- Radio Images ------------------------*/

    wp.customize.controlConstructor['cv-radio-image'] = wp.customize.Control.extend({

        ready: function() {

            var control = this;

            // Change the value
            this.container.on( 'click', 'input', function() {
                control.setting.set( jQuery( this ).val() );
            });

        }

    });

/*---------------------- Toggle ------------------------------*/

    wp.customize.controlConstructor['cv-toggle'] = wp.customize.Control.extend({
        ready: function(){

            var control = this,
                checkboxValue = control.setting._value;

            // Save the value
            this.container.on( 'change', 'input', function() {
                checkboxValue = ( jQuery( this ).is( ':checked' ) ) ? true : false;
                control.setting.set( checkboxValue );
            });
        }
    });