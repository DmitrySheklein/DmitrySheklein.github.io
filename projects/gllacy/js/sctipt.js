$(function () {
  $('.slider_item img').equalHeights();
  var slider = $('.slider').bxSlider({
    mode: 'fade'
    , //                auto: true,
    pause: 3000
    , controls: false
    , captions: true
    , onSlideBefore: function () {
      var current = slider.getCurrentSlide()
        , slideQty = slider.getSlideCount()
        , colors = ['#849d8f', '#8996a6', '#9d8b84'];
      $('body').css({
        'background-color': colors[current]
      })
    }
  });
  
  //Feedback form
  var overlay = $('.overlay'),
      form = $('.modal_form'),
      openBtn = $('.contacts_btn '),
      closeBtn = $('.form_close_btn');
               
  function close(){
    overlay.removeClass('showOverlay');
    form.removeClass('showForm');    
  }
  
  function show(){
    overlay.addClass('showOverlay');
    form.addClass('showForm');
  }
  
  openBtn.on('click', function(e){
    e.preventDefault()
    show()
  })
  closeBtn.on('click', function(e){
    e.preventDefault()
    close()
  })
});