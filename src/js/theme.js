// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
        // $(".logo").fadeOut(function() {
        //     $(".logo-heading").fadeIn();
        // });
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
        // $(".logo-heading").fadeOut(function() {
        //     $(".logo").fadeIn();    
        // })
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

$(document).ready(function() {
    var hash = window.location.hash;
    if (hash.length > 0) {
        $('html,body').stop().animate({
            scrollTop: $('a[name="'+hash.slice(1)+'"]').offset().top - 75
        }, 1500, 'easeInOutExpo');
    }
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

