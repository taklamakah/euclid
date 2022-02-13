$(document).ready(function() {
	$(function() {
		$("#accordion").accordion({
			heightStyle: "content",
			active: false,
			collapsible: true
		})
	})
});
$('.faq__item').click(function(e) {
	$('.faq__item-plus').not(this).removeClass('faq__item-plus-active');
	$(this).children('.faq__item-plus').addClass('faq__item-plus-active')
});
$(document).ready(function() {
	$('.header__burger').click(function(event) {
		$('.header__burger,.nav,.rect1,.rect2,.rect3').toggleClass('active-burger');
		$('body').toggleClass('lock')
	})
});
$(document).ready(function() {
	$('.work__btn').click(function(e) {
		e.preventDefault();
		$('.work__btn').removeClass('work__btn-active');
		$('.work__content').addClass('visually-hidden');
		$(this).addClass('work__btn-active');
		$($(this).attr('href')).removeClass('visually-hidden')
	});
	$('.work__btn:first').click()
});
var swiper = new Swiper('.swiper-container', {
	pagination: {
		el: '.swiper-pagination',
		dynamicBullets: true,
		clickable: true,
	},
});
$(document).ready(function() {
	lazyload()
});