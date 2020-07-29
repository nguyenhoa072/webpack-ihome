/* global google */

import jQuery from "jquery";
import "slick-carousel";
import "readmore-js";

var $ = jQuery.noConflict();

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    },
};

jQuery(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    scrollTop.init();
    sendRequestAdvice.init();
    ourCustomersSlider.init();
    productShowSlider.init();
    initMap.init();
    if (isMobile.any()) {
        initReadmore.init();
    }
});

var scrollTop = {
    init: function () {
        //Check to see if the window is top if not then display button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $(".scroll-top").fadeIn();
            } else {
                $(".scroll-top").fadeOut();
            }
        });

        // Click event to scroll to top
        $(".scroll-top").click(function () {
            $("html, body").animate({ scrollTop: 0 }, 800);
            return false;
        });
    },
};

var sendRequestAdvice = {
    init: function () {
        $("#sra_open").click(function () {
            $("#send_request_advice").fadeIn();
        });
        $("#sra_exit").click(function () {
            $("#send_request_advice").fadeOut();
        });
    },
};

var initReadmore = {
    init: function () {
        $("#readmore").readmore({
            collapsedHeight: 48,
            speed: 200,
            moreLink:
                '<a href="#">Xêm thêm <i class="fa fa-caret-down"></i></a>',
            lessLink: '<a href="#">Đóng <i class="fa fa-caret-up"></i></a>',
        });
    },
};

var initMap = {
    init: function () {
        var contact_map = document.getElementById("contact_map");
        if (contact_map) {
            // const google = window.google;
            var eMap = document.getElementById("listMapID");
            var centerLatLng = {
                lat: Number(eMap.getAttribute("data-map-lat")),
                lng: Number(eMap.getAttribute("data-map-lng")),
            };
            var map = new google.maps.Map(contact_map, {
                zoom: 13,
                center: centerLatLng,
                scrollwheel: false,
            });
            $("#listMapID li").each(function () {
                var position = {
                    lat: Number($(this).attr("data-map-lat")),
                    lng: Number($(this).attr("data-map-lng")),
                };
                var title = $(this).find(".name").html();
                new google.maps.Marker({
                    position: position,
                    map: map,
                    title: title,
                });
            });
            $("#listMapID li").on("click", function () {
                var latLng = {
                    lat: Number($(this).attr("data-map-lat")),
                    lng: Number($(this).attr("data-map-lng")),
                };
                map.panTo(latLng);
            });

            google.maps.event.addDomListener(window, "load", initMap);
        }
    },
};

var ourCustomersSlider = {
    init: function () {
        $("#talk_about_ihome_sider").slick({
            centerMode: true,
            centerPadding: "450px",
            slidesToShow: 1,
            arrows: true,
            dots: true,
            speed: 1500,
            autoplaySpeed: 5000,
            prevArrow:
                '<div class="slick-prev"><svg class="bi bi-chevron-left" width="3em" height="3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>' +
                "</svg>" +
                "</div >",
            nextArrow:
                '<div class="slick-next"><svg class="bi bi-chevron-right" width="3em" height="3em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>' +
                "</svg></div>",
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        arrows: true,
                        centerMode: true,
                        centerPadding: "250px",
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 1200,
                    settings: {
                        arrows: true,
                        centerMode: true,
                        centerPadding: "150px",
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 769,
                    settings: {
                        arrows: true,
                        centerMode: true,
                        centerPadding: "100px",
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 500,
                    settings: {
                        arrows: true,
                        centerMode: false,
                        centerPadding: "50px",
                        slidesToShow: 1,
                    },
                },
            ],
        });
    },
};

var productShowSlider = {
    init: function () {
        $(".product .slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: ".slider-nav",
            autoplay: true,
            autoplaySpeed: 4000,
        });
        $(".product .slider-nav").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: ".slider-for",
            focusOnSelect: true,
            prevArrow:
                '<div class="slick-prev"><svg class="bi bi-chevron-left" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"></path>' +
                "</svg>" +
                "</div >",
            nextArrow:
                '<div class="slick-next"><svg class="bi bi-chevron-right" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">' +
                '<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"></path>' +
                "</svg></div>",
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                    },
                },
            ],
        });
    },
};
