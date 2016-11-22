$(document).ready(function() {
    $('.button').on('click', 'a', function() {
      $('.overlay').fadeToggle(400);
      $(this).toggleClass('btn-open').toggleClass('btn-close');
    });
});
$('.overlay').on('click', function(){
    $(".overlay").fadeToggle(400);   
    $(".button a").toggleClass('btn-open').toggleClass('btn-close');
    open = false;
});