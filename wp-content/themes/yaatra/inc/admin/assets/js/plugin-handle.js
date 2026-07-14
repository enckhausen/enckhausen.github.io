/**
 * jQuery file handlers for the "Get Started" button in the dashboard notice.
 * 
 * Manages the behavior and functionality of the "Get Started" button on the Yaatra theme's dashboard notice.
 *
 * @package Yaatra
 */

jQuery(document).ready(function($) {
    const WpAjaxurl     = cvAdminObject.ajax_url;
    const _wpnonce      = cvAdminObject._wpnonce;
    const buttonStatus  = cvAdminObject.buttonStatus;

    /** 
     * Disable demo import button if not activated 
     */
    if (buttonStatus === 'disable') {
        $('.cv-demo-import').addClass('disabled');
    }

    /** 
     * Set up event handlers based on button status 
     */
    const setupEventHandlers = (status) => {
        $('.cv-get-started, .cv-activate-demo-import-plugin').on('click', function() {
            const _this = $(this);
            yaatra_do_plugin(`yaatra_${status}_plugin`, _this);
        });
    };

    switch (buttonStatus) {
        case 'activate':
            setupEventHandlers('activate');
            break;

        case 'install':
            setupEventHandlers('install');
            break;

        case 'redirect':
            $('.cv-get-started').on('click', function() {
                const _this = $(this);
                location.href = _this.data('redirect');
            });
            break;
    }

    /** 
     * Handle plugin actions with AJAX 
     */
    const yaatra_do_plugin = function(ajax_action, _this) {
        $.ajax({
            method: "POST",
            url: WpAjaxurl,
            data: {
                'action': ajax_action,
                '_wpnonce': _wpnonce
            },
            beforeSend: function() {
                const loadingTxt = _this.data('process');
                _this.addClass('updating-message').text(loadingTxt);
            },
            success: function(response) {
                if (response.success) {
                    const loadedTxt = _this.data('done');
                    _this.removeClass('updating-message').text(loadedTxt);
                }
                location.href = _this.data('redirect');
            }
        });
    };

    /** 
     * Set up action button click handlers 
     */
    $('.cv-action-btn').on('click', function() {
        const _this = $(this);
        const actionBtnStatus = _this.data('status');
        const pluginSlug = _this.data('slug');

        if (actionBtnStatus === 'install') {
            yaatra_do_free_plugin( 'yaatra_install_free_plugin', pluginSlug, _this );
        } else if (actionBtnStatus === 'active') {
            yaatra_do_free_plugin( 'yaatra_activate_free_plugin', pluginSlug, _this );
        }
    });

    /** 
     * Handle free plugin actions with AJAX 
     */
    const yaatra_do_free_plugin = function(ajax_action, pluginSlug, _this) {
        $.ajax({
            method: "POST",
            url: WpAjaxurl,
            data: {
                'action': ajax_action,
                'plugin_slug': pluginSlug,
                '_wpnonce': _wpnonce
            },
            beforeSend: function() {
                const loadingTxt = _this.data('process');
                _this.addClass('updating-message').text(loadingTxt);
            },
            success: function(response) {
                if (response.success) {
                    const loadedTxt = _this.data('done');
                    _this.removeClass('updating-message').text(loadedTxt);
                }
                location.href = _this.data('redirect');
            }
        });
    };
});
