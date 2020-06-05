/* global google */

import jQuery from "jquery";
import { WOW } from "wowjs";
import "slick-carousel";

var $ = jQuery.noConflict();

jQuery(document).ready(function () {

    ourCustomersSider.init();

    scroll_top.init();

    initMap.init();

    $('[data-toggle="tooltip"]').tooltip();

    var wow = new WOW({
        live: false,
    });
    wow.init();
});

var scroll_top = {
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

// var menu_services = {
//     init: function () {
//         $(".dropdown-menu a").on("click", function () {
//             // e.preventDefault();
//             var hash = this.hash;
//             $("html, body").animate(
//                 {
//                     scrollTop: $(this.hash).offset().top,
//                 },
//                 1000,
//                 function () {
//                     window.location.hash = hash;
//                 }
//             );
//         });
//     },
// };

// var pricing_contact_us = {
//     init: function () {
//         var a = -($("#pricing_contact_us").outerWidth() / 2);
//         var b = -($("#pricing_contact_us").outerHeight() / 2);

//         $("#pricing_contact_us").css({ "margin-top": b, "margin-left": a });
//     },
// };

// var services_features_zise = {
//     init: function () {
//         var d = $("#services_features li").outerWidth();

//         $("#services_features li").css("height", d);
//     },
// };

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

// var offcanvas = {
//     init: function () {
//         $('[data-toggle="offcanvas"]').on("click", function () {
//             $(".offcanvas-collapse").toggleClass("open");
//             $("body").toggleClass("toggled");
//         });
//     },
// };

var ourCustomersSider  = {
    init: function () {
        $("#talk_about_ihome_sider").slick({
            centerMode: true,
            dots: true,
            centerPadding: "350px",
            slidesToShow: 1,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        // arrows: false,
                        centerMode: true,
                        centerPadding: "0px",
                        slidesToShow: 1,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        // arrows: false,
                        centerMode: true,
                        centerPadding: "0px",
                        slidesToShow: 1,
                    },
                },
            ],
        });
    },
};
