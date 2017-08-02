$(document).ready(function () {
  $("[type='tel']").mask("+7 (999) 999-9999");  
  $('.fancybox').fancybox();
  $('a[href*="#advantage"]').anchor({
    foo: 'bar'
    , transitionDuration: 500
  });
  $('.single-item').slick({
    arrows: false
    , dots: false
  });
  $('.team-list').slick({
    dots: false
    , arrows: false
    , infinite: false
    , speed: 300
    , slidesToShow: 4
    , slidesToScroll: 4
    , responsive: [
      {
        breakpoint: 1024
        , settings: {
          slidesToShow: 3
          , slidesToScroll: 3
          , infinite: true
          , dots: false
        }
      }
      , {
        breakpoint: 600
        , settings: {
          slidesToShow: 2
          , slidesToScroll: 2
        }
      }
      , {
        breakpoint: 480
        , settings: {
          slidesToShow: 1
          , slidesToScroll: 1
          , centerMode: true
          , variableWidth: true
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
  $('.features-list').slick({
    dots: false
    , arrows: false
    , infinite: true
    , speed: 300
    , slidesToShow: 3
    , slidesToScroll: 3
    , responsive: [
      {
        breakpoint: 1024
        , settings: {
          slidesToShow: 3
          , slidesToScroll: 3
          , infinite: true
          , dots: true
        }
      }
      , {
        breakpoint: 600
        , settings: {
          slidesToShow: 2
          , slidesToScroll: 2
        }
      }
      , {
        breakpoint: 480
        , settings: {
          dots: true
          , slidesToShow: 1
          , slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });
});
$(document).ready(function () {
  
    $('.review-list').slick({
      mobileFirst: true,
      dots: false
      , arrows: false
      , infinite: true
      , speed: 300
      , slidesToShow: 3
      , slidesToScroll: 3
      , responsive: [
        {
          breakpoint: 1366,
          settings: "unslick"
                  }
        ,        
        {
          breakpoint: 1024
          , settings: {
            slidesToShow: 2
            , slidesToScroll: 2
            , infinite: true
            , dots: true
          }
                  }
        , {
          breakpoint: 768
          , settings: {
            slidesToShow: 2
            , slidesToScroll: 2
          }
                  }
        , {
          breakpoint: 319
          , settings: {
            dots: true
            , slidesToShow: 1
            , slidesToScroll: 1
          }
                  }
                  // You can unslick at a given breakpoint now by adding:
                  // settings: "unslick"
                  // instead of a settings object
                ]
    });
  
});