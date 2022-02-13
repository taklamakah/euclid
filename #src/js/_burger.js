
$(document).ready(function() {
    $('.header__burger').click(function(event) {
        $('.header__burger,.nav,.rect1,.rect2,.rect3').toggleClass('active-burger');
        $('body').toggleClass('lock');
    });
});

