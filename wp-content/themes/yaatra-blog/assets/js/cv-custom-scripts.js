jQuery(document).ready(function($) {

    "use strict";

    if($('body').hasClass("rtl")) {
        var rtlValue = true;
    } else {
        var rtlValue = false;
    }

    /**
     * Preloader
     */
    if ($('#yaatra-blog-preloader').length > 0) {
        setTimeout(function() {
            $('#yaatra-blog-preloader').hide();
        }, 600);
    }

    /**
     * Settings about WOW animation
     */
    var wow_option = yaatrablogObject.wow_effect;
    if( wow_option == 'on' ) {
        new WOW().init();
    }

    /**
     * Responsive
     */
    $('.menu-toggle').click(function(event) {
        $('#site-navigation').slideToggle('slow');
    });

    /**
     * responsive sub menu toggle
     */
    $('#site-navigation .menu-item-has-children>a, #site-navigation .page_item_has_children>a').after('<span class="sub-toggle"><a href="javascript:void(0);"><i class="fa fa-angle-right"></i></a></span>');
    //$('#site-navigation .page_item_has_children').append('<span class="sub-toggle"> <i class="fa fa-angle-right"></i> </span>');


    $('#site-navigation li .sub-toggle').click(function() {
        $(this).parent('.menu-item-has-children').children('ul.sub-menu').first().slideToggle('1000');
        $(this).parent('.page_item_has_children').children('ul.children').first().slideToggle('1000');
        $(this).find('i').first().toggleClass('fa-angle-down');
    });

    /**
     * Sticky sidebar
     */
    $('#primary, #secondary').theiaStickySidebar({
        additionalMarginTop: 40
    });

    /**
     * Scroll To Top
     */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 1000) {
            $('#cv-scrollup').fadeIn('slow');
        } else {
            $('#cv-scrollup').fadeOut('slow');
        }
    });
    $('#cv-scrollup').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

    /**
     * Archive masonry
     * 
     */
    var archivePage = yaatrablogObject.archivePage;
    if( archivePage === 'on' ) {
        var archiveContainer = $( ".masonry-archive-layout #content #main" );
        archiveContainer.imagesLoaded( function() {
            archiveContainer.masonry();
        });
    }

});