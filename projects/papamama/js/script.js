$(function () {
  $('.fancybox').fancybox();
  $('.tech-item-img').fancybox({
    'overlayShow': false
    //  'overlayOpacity' : 0
  });
  $('.carousel').carousel({
    interval: 5000
  })
  $("[type='tel']").mask("+7 (999) 999-9999");
  $('a[href*="#header"],a[href*="#call-block"]').anchor({
    foo: 'bar',
    transitionDuration: 500
  });


  function equalHeight(group) {
    var maxHeight = 0;
    setTimeout(function () {
      $(group).each(function () {
        maxHeight = maxHeight < $(this).height() ? $(this).height() : maxHeight;
      });
      $(group).height(maxHeight);
    }, 300);
  }
  equalHeight('#example-generic .item');
})

$(window).on('resize',function(){
  equalHeight('#example-generic .item');
})