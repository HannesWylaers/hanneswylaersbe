$(document).ready(function(){
  
  //front: toggle the testimonials
  $('.person__btn').on('click', 'a', function(){
    $(this).closest('.person__btn').find('.clicked').slideToggle(300);
  });


  //scroll back to top
  $(window).scroll(function(){
      if ($(this).scrollTop() > 50) {
          $('#backToTop').fadeIn('slow');
      } else {
          $('#backToTop').fadeOut('slow');
      }
  });
  $('#backToTop').click(function(){
      $("html, body").animate({ scrollTop: 0 }, 500);
      return false;
  });   


  //smaller the height of the div to stay in the window
  $('.btn-save').on('click', function() {
      $('.btn-showSaved').show(500).css({'display':'block'});
      $('.l-sidenav .l-sidebar__content').click(function(){
        $(this).animate({'height':'35'})
      })
  });


  //resize the div with image on front
  $(window).ready(function() {
    $('.home-teaser').css('height', window.innerHeight+'px');
  });


  //when you left the page
    window.onblur = function () { document.title = 'Come back, Sunshine!'; }
  //when you are on the page
    window.onfocus = function () { document.title = 'Hello Sunshine! Welcome!'; }

});