'use strict';

var _highlight = function (element) {
    element.addClass('highlighted');
    setTimeout(function () {
        return element.removeClass('highlighted');
    }, 800);
};

$(function () {
    var logoHeadingLetters = $(".logo-heading span");
    var brandHeadingLetters = $(".brand-heading span");

    var loopLogoHeading = function loopLogoHeading() {
        var _loop = function _loop(i) {
            setTimeout(function () {
                _highlight($('.logo-heading span:nth-child(' + i + ')'));
            }, i * 200);
        };

        for (var i = 1; i <= logoHeadingLetters.length; i++) {
            _loop(i);
        }
    };
    loopLogoHeading();
    setInterval(loopLogoHeading, 8000);

    var loopBrandHeading = function loopBrandHeading() {
        var _loop2 = function _loop2(i) {
            setTimeout(function () {
                _highlight($('.brand-heading span:nth-child(' + i + ')'));
            }, i * 200);
        };

        for (var i = 1; i <= brandHeadingLetters.length; i++) {
            _loop2(i);
        }
    };
    setTimeout(function () {
        return loopBrandHeading();
    }, 1400);
    setInterval(function () {
        return setTimeout(loopBrandHeading, 1400);
    }, 8000);
});