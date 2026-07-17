/**
 * Combine scripts for Customizer Controls.
 *
 * @package Yaatra Blog
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

    // function for repeater field
    function yaatra_blog_refresh_repeater_values(){
        $(".cv-repeater-field-control-wrap").each(function(){
            
            var values = []; 
            var $this = $(this);
            
            $this.find(".cv-repeater-field-control").each(function(){
            var valueToPush = {};   

                $(this).find('[data-name]').each(function(){
                    if( $(this).attr('type') === 'checkbox'){
                        dataValue = ( $(this).is(':checked') ) ? 'on' : 'off';
                    } else {
                        var dataValue = $(this).val();
                    }
                    var dataName = $(this).attr('data-name');
                    valueToPush[dataName] = dataValue;
                });

                values.push(valueToPush);
            });

            $this.next('.cv-repeater-collector').val(JSON.stringify(values)).trigger('change');
        });
    }

    // expand the repeater fields wrap
    $('#customize-theme-controls').on('click','.cv-repeater-field-title.item-visible', function(){
        $(this).closest('.cv-repeater-field-control').find('.cv-repeater-fields').slideToggle();
        $(this).closest('.cv-repeater-field-control').toggleClass('expanded');
    });

    // close the repeater fields wrap
    $('#customize-theme-controls').on('click', '.cv-repeater-field-close', function(){
        $(this).closest('.cv-repeater-fields').slideUp();
        $(this).closest('.cv-repeater-field-control').toggleClass('expanded');
    });

    // show/hide repeater field
    $("#customize-theme-controls").on("click", ".field-display", function(){
        $(this).toggleClass( "dashicons-visibility dashicons-hidden" );
        $(this).closest('.cv-repeater-field-control').toggleClass( 'item-visible item-not-visible' );
        $(this).closest('.cv-repeater-field-control').find('.cv-repeater-field-title').toggleClass( 'item-visible item-not-visible' );
        var dataVal =  $(this).parents('.cv-repeater-field-control').find('input.repeater-field-visible-holder').val();
        if(dataVal == 'show') {
            if ($(this).closest('.cv-repeater-field-control').find('.cv-repeater-fields').is(':visible')) {
                $(this).closest('.cv-repeater-field-control').toggleClass('expanded');
                $(this).closest('.cv-repeater-field-control').find('.cv-repeater-fields').slideUp();
            }
            $(this).closest('.cv-repeater-field-control').find('input.repeater-field-visible-holder').val('hide');
        } else {
            $(this).closest('.cv-repeater-field-control').find('input.repeater-field-visible-holder').val('show');
        }
        yaatra_blog_refresh_repeater_values();
    });

    $("body").on("click",'.cv-repeater-add-control-field', function(){

        var fLimit = $(this).parent().find('.field-limit').val();
        var fCount = $(this).parent().find('.field-count').val();
        if( fCount < fLimit ) {
            fCount++;
            $(this).parent().find('.field-count').val(fCount);
        } else {
            $(this).before('<span class="cv-limit-msg"><em>Only '+fLimit+' repeater field will be permitted.</em></span>');
            return;
        }

        var $this = $(this).parent();
        
        if(typeof $this != 'undefined') {

            var field = $this.find(".cv-repeater-field-control:first").clone();
            if(typeof field != 'undefined'){
                
                field.find("input[type='text'][data-name]").each(function(){
                    var defaultValue = $(this).attr('data-default');
                    $(this).val(defaultValue);
                });
                
                field.find(".cv-repeater-icon-list").each(function(){
                    var defaultValue = $(this).next('input[data-name]').attr('data-default');
                    $(this).next('input[data-name]').val(defaultValue);
                    $(this).prev('.cv-repeater-selected-icon').children('i').attr('class','').addClass(defaultValue);
                    
                    $(this).find('li').each(function(){
                        var icon_class = $(this).find('i').attr('class');
                        if(defaultValue == icon_class ){
                            $(this).addClass('icon-active');
                        }else{
                            $(this).removeClass('icon-active');
                        }
                    });
                });

                field.find('.cv-repeater-fields').show();

                $this.find('.cv-repeater-field-control-wrap').append(field);

                field.addClass('expanded').find('.cv-repeater-fields').show(); 
                $('.accordion-section-content').animate({ scrollTop: $this.height() }, 1000);
                yaatra_blog_refresh_repeater_values();
            }

        }
        return false;
     });
    
    // remove the repeater field item
    $("#customize-theme-controls").on("click", ".cv-repeater-field-remove",function(){
        if( typeof  $(this).parent() != 'undefined'){
            $(this).closest('.cv-repeater-field-control').slideUp('normal', function(){
                $(this).remove();
                yaatra_blog_refresh_repeater_values();
            });
        }
        return false;
    });

    $("#customize-theme-controls").on('keyup change', '[data-name]', function(){
        yaatra_blog_refresh_repeater_values();
        return false;
    });

    /**
     * Drag and drop to change order
     */
    $(".cv-repeater-field-control-wrap").sortable({
        orientation: "vertical",
        update: function( event, ui ) {
            yaatra_blog_refresh_repeater_values();
        }
    });

    /**
     * Repeater icon selector
     */
    $('body').on('click', '.cv-repeater-icon-list li', function(){
        var icon_class = $(this).find('i').attr('class');
        $(this).addClass('icon-active').siblings().removeClass('icon-active');
        $(this).parent('.cv-repeater-icon-list').prev('.cv-repeater-selected-icon').children('i').attr('class','').addClass(icon_class);
        $(this).parent('.cv-repeater-icon-list').next('input').val(icon_class).trigger('change');
        yaatra_blog_refresh_repeater_values();
    });

    $('body').on('click', '.cv-repeater-selected-icon', function(){
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

/*---------------------- Typography ------------------------*/

    api.controlConstructor['cv-typography'] = api.Control.extend( {
        ready: function() {
            var control = this;

            control.container.on( 'change', '.typography-font-style select', function() {
                control.settings['style'].set( jQuery( this ).val() );
            });

            control.container.on( 'click', '.typography-font-transform input', function() {
                control.settings['transform'].set( jQuery( this ).val() );
            });

            control.container.on( 'change', '.typography-text-decoration select', function() {
                control.settings['text_decoration'].set( jQuery( this ).val() );
            });
        }
    } );

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

/*---------------------- Buttonset ---------------------------*/

    wp.customize.controlConstructor['cv-buttonset'] = wp.customize.Control.extend({

        ready: function() {

            var control = this;

            // Change the value
            this.container.on( 'click', 'input', function() {
                control.setting.set( jQuery( this ).val() );
            });
        }

    });

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