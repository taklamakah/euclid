$(document).ready(function() {
    $('.work__btn').click(function(e){
        e.preventDefault();
        $('.work__btn').removeClass('work__btn-active');
        $('.work__content').addClass('visually-hidden');
        $(this).addClass('work__btn-active');
        $($(this).attr('href')).removeClass('visually-hidden');
    });
    $('.work__btn:first').click();
});
