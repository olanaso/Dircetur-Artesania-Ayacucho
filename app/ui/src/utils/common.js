/**
 * Elektron - An Admin Toolkit
 * @version 0.3.1
 * @license MIT
 * @link https://github.com/onokumus/elektron#readme
 */
'use strict';

/* eslint-disable no-undef */
$(function () {
    // Responsive sidebar handling
    const initializeSidebar = () => {
        if ($(window).width() < 992) {
            $('#app-side').onoffcanvas('hide');
        } else {
            $('#app-side').onoffcanvas('show');
        }
    }

    initializeSidebar();
    $(window).on('resize', initializeSidebar);

    // Initialize side navigation menu
    $('.side-nav .unifyMenu').unifyMenu({ toggle: true });

    // Hoverable toggler handler
    $('#app-side-hoverable-toggler').on('click', function () {
        $('.app-side').toggleClass('is-hoverable');
        $(this).children('i.fa').toggleClass('fa-angle-right fa-angle-left');
    });

    // Mini toggler handler
    $('#app-side-mini-toggler').on('click', function () {
        $('.app-side').toggleClass('is-mini');
        $(this).find('i').toggleClass('icon-menu5 icon-sort');
    });

    // Onoffcanvas nav handler
    $('#onoffcanvas-nav').on('click', function () {
        $('.app-side').toggleClass('left-toggle');
        $('.app-main').toggleClass('left-toggle');
        $(this).find('i').toggleClass('icon-menu5 icon-sort');
    });

    // Canvas toggler handler with error handling
    $('.onoffcanvas-toggler').on('click', function (e) {
        try {
            e.preventDefault();
            $('#app-side').onoffcanvas('toggle');
        } catch (error) {
            console.error('Error toggling canvas:', error);
        }
    });

    // Bootstrap components initialization
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $('.popover-dismiss').popover({
        trigger: 'focus'
    });

    // Today's date update
    const updateDate = () => {
        try {
            if (typeof moment === 'undefined') {
                throw new Error('Moment.js is not loaded');
            }
            const momentNow = moment();
            $('#today-date').html(
                `${momentNow.format('MMMM . DD')} ${momentNow.format('. dddd').substring(0, 5).toUpperCase()}`
            );
        } catch (error) {
            console.error('Error updating date:', error);
        }
    };
    setInterval(updateDate, 1000);

    // Task list toggle
    $('.task-list').on('click', 'li.list', function () {
        $(this).toggleClass('completed');
    });

    // Loading screen
    $(".loading-wrapper").fadeOut(2000);
});



