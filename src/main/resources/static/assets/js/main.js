
(function ($) {
	"use Strict";
	$('.hm-minicart-trigger').on('click', function (e) {
	  e.preventDefault();
	  $(this).toggleClass('is-active');
	  $(this).siblings('.minicart').slideToggle();
	});
     
	$('.ht-setting-trigger.is-active').siblings('.catmenu-body').slideDown();
	new WOW().init();
})(jQuery);
