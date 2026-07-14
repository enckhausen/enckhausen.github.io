/**
 * Custom scripts for the Tabs Control.
 * 
 * Adds and manages JavaScript functionality for the Tabs Control in the WordPress Customizer.
 *
 * @package Yaatra
 */

(function (api) {

    // Tab Control
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

})(wp.customize);