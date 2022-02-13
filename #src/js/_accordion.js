$(document).ready(function() {
    $( function() {
        $( "#accordion" ).accordion({
          heightStyle: "content",
          active: false,
          collapsible: true
        });
      } );
});

$('.faq__item').click(function(e){
  $('.faq__item-plus').not(this).removeClass('faq__item-plus-active');
  $(this).children('.faq__item-plus').addClass('faq__item-plus-active');
});



