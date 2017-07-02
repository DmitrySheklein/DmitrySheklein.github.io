(function() {
  'use strict';

  /*
  Parallax
  */
  if($("#scene").length){
    $('#scene').parallax({
        scalarX: 3,
        scalarY: 3,
        frictionX: 0.5,
        frictionY: 0.5    
    });
  }

  /*
  Hamburger menu
  */
  (function(){
      var bgMenu = $('.main-menu'),
          content = $('.main-menu__list'),
          hamburger = $('.hamburger');

    $('button.hamburger').on('click', onClickToggle);
  //   $('.main-menu__list').on('click', onClickToggle);
    // $(".main-menu__item").each(function(index) {
    //   var item_delay = 0.3+0.1*index;
      // $(this).css("transition-delay", item_delay + "s");
    // });
    function onClickToggle(e){
      e.preventDefault();
      bgMenu.toggleClass('active');
      content.toggleClass('list-active');
      hamburger.toggleClass('is-active');    
    } 
  })()
  
    /*
    Scroll Down button
    */
   $('.arrow-down').on('click', function (e) {
        e.preventDefault();
        var selector = $(this).attr('href'); 
        var h = $(selector); 
        
        $('html, body').animate({
            scrollTop: h.offset().top
        }, 500);
        
        
    });    
    /*
    Scroll parallax
    */
    var parallax = (function() {
    // var bg = document.querySelector('.header');
    var userAv = document.querySelector('.user__avatar');
    var userName = document.querySelector('.user__name');
    var userDescr = document.querySelector('.user__descr');
    var sectionImg = document.querySelector('.user__bg');

      return {
        move: function( block, windowScroll,strafeAmount) {
            var strafe = windowScroll / -strafeAmount + '%';
            var transformString = 'translate3d(0,' + strafe + ',0)'


            var style = block.style;


            style.top = strafe;
            style.transform = transformString;
            style.webkitTransform = transformString;
        },
        init: function(wScroll) {
            // this.move(bg,wScroll,45);
            this.move(sectionImg,wScroll,15);
            this.move(userDescr,wScroll,1);
            this.move(userName,wScroll,1);
            this.move(userAv,wScroll,1);
        }
      }
  }());
    /*
    Svg drow
    */  


  window.onscroll = function(){
    var wScroll = window.pageYOffset;
    parallax.init(wScroll);
    //  svgScroll.grow(wScroll);
  }
/*
// Preloader
*/
var preloader = (function () {
  var percentsTotal = 0,
    preloader = $('.preloader');

  var imgPath = $('*').map(function (ndx, element) {
    var background = $(element).css('background-image'),
      img = $(element).is('img'),
      path = '';

    if (background != 'none') {
      path = background.replace('url("', '').replace('")', '');
    }

    if (img) {
      path = $(element).attr('src');
    }

    if (path) return path

  });

  var setPercents = function (total, current) {
    var persents = Math.ceil(current / total * 100);

    $('.preloader__percents').text(persents + '%');

    if (persents >= 100) {
      preloader.fadeOut();
    }
  }

  var loadImages = function (images) {

    if (!images.length) preloader.fadeOut();

    images.forEach(function (img, i, images) {
      var fakeImage = $('<img>', {
        attr: {
          src: img
        }
      });

      fakeImage.on('load error', function () {
        percentsTotal++;
        setPercents(images.length, percentsTotal);
      });
    });
  }

  return {
    init: function () {
      var imgs = imgPath.toArray();

      loadImages(imgs);
    }
  }
}());
preloader.init();
/*
// Slider
*/
$(function(){
  var 
    $nextBtn = $('.portfolio-btn__next'),
    $prevBtn = $('.portfolio-btn__prev'),
    $slideItemRight = $nextBtn.next('.portfolio-thumbnails').find('.portfolio-thumbnail'),
    $slideItemLeft = $prevBtn.next('.portfolio-thumbnails').find('.portfolio-thumbnail'),
    $mainSlide = $('.portfolio-slider__preview img'),
    $mainDescr = $('.portfolio-slider__projects .project-item'),
    currentSlideIndex = 0;

    $nextBtn.on('click', changeSlide);
    $prevBtn.on('click', changeSlide);

    function changeSlide(e) {
      e.preventDefault();
      var $this = $(this);

      if($this.hasClass('portfolio-btn__prev')) {
        if(currentSlideIndex - 1 < 0) {
          currentSlideIndex = $slideItemRight.length - 1;
          } else {
            currentSlideIndex -= 1;
          }
        } else if ($this.hasClass('portfolio-btn__next')) {
          if (currentSlideIndex + 1 > $slideItemRight.length - 1) {
            currentSlideIndex = 0;
          } else {
            currentSlideIndex += 1
          }
        }

        changeMainPic($slideItemRight);
        changeDescr($mainDescr);
        animateText($mainDescr, '.project-item__title');

        slideRightPreview($slideItemRight)
        slideLeftPreview($slideItemLeft)
    }
    function changeDescr(slideItems){
      slideItems.filter('.project-item__active').removeClass('project-item__active');
      slideItems.eq(currentSlideIndex).addClass('project-item__active');
      
    }
    function changeMainPic (slideItems) {
      var nextImgSrc = slideItems.eq(currentSlideIndex).find('img').attr('src');
      var nextImgAlt = slideItems.eq(currentSlideIndex).find('img').attr('alt');
      $mainSlide.fadeOut('50',function() {
        $mainSlide.attr('src', nextImgSrc);
        $mainSlide.attr('alt', nextImgAlt);
        $(this).fadeIn('100')
      })
    }
    function slideRightPreview (slideItems){
      var nextImgIndex;
      if (currentSlideIndex + 1 >= slideItems.length){
        nextImgIndex = 0;
      } else {
        nextImgIndex = currentSlideIndex + 1;
      }
      slideItems.filter('.active').removeClass('active').addClass('moveUp');
      slideItems.eq(nextImgIndex).addClass('active').addClass('moveUp');
    }
    function slideLeftPreview (slideItems){
      var nextImgIndex;
      if (currentSlideIndex == 0){
        nextImgIndex = slideItems.length - 1;
      } else {
        nextImgIndex = currentSlideIndex - 1;
      }
      slideItems.filter('.active').removeClass('active').addClass('moveDown');
      slideItems.eq(nextImgIndex).addClass('active').addClass('moveDown');
    }
})
/*
// Text animation
*/
function animateText (mainBlock, blockText){
  var block = mainBlock.filter('.project-item__active').find(blockText),
      string = block.text().trim(),
      stringArray = string.split(''),
      word= '',
      animationState = $.Deferred();

      stringArray.forEach(function(letter){
        if(letter != " "){
          var letterHtml = '<span class="letter-span">' + letter + '</span>';
        } else {
          var letterHtml = '<span class="letter-span_space">' + letter + '</span>';
        }

        word += letterHtml;
      });

      block.html(word)
      
      var letter = block.find('.letter-span'),
          counter = 0,
          timer,
          duration = 500 / stringArray.length;
      function showLetters() {
        var currentLetter = letter.eq(counter);
        currentLetter.addClass('active');
        counter++

        if (typeof timer != 'undefined'){
          clearTimeout(timer);
        }

        timer = setTimeout(showLetters, duration);
      };
      showLetters();
}




/*
// Blur
*/
	function set_blur(){
		var section = $(".feedback-block"),
			form_bg = $(".contact-form__bg"),
			bg_offset = section.offset().top - form_bg.offset().top;


		form_bg.css({
			"background-position" : "center " + bg_offset + "px"
		});


	}

	if($(".feedback-block").length){
		$(window).on("load", function() {
			set_blur();
		});

		$(window).resize(function() {
			set_blur();
		});
	}

  /*
  Ajax form
  */

  if($('#contact').length){
      $('#contact').on('submit', function(e){
          e.preventDefault();
          var   name = $('input[name=name]').val(),
                replyto = $('input[name=email]').val(),
                messageText = $('textarea[name=message]').val();
        $.ajax({
            url: "https://formspree.io/sheklein.dima@gmail.com",
            //url: "#",
            method: "POST",
            data: {
                Имя: name,
                От: replyto,
                Сообщение: messageText
            },
            dataType: "json",
            beforeSend: function(){
               $('.contact-form__field').css({'opacity': 0})
               $('.ajaxloader').addClass('active')
            }
        }).done(function(){
            $('.ajaxloader').removeClass('active')                      
            $('.contacts-wrapper').addClass('active success')
            $('.contacts-wrapper__text').text('Сообщение отправлено')
            clearForm()
            $('#contact')[0].reset();
        }).fail(function(){
            $('.ajaxloader').removeClass('active')                      
            $('.contacts-wrapper').addClass('active fail')
            $('.contacts-wrapper__text').text('Ошибка отправки')
            clearForm()         
        })     
        function clearForm(){
            setTimeout(function(){
                $('.contact-form__field').css({'opacity': 1})
                $('.contacts-wrapper').removeClass('active success fail')
            }, 2000);   
        }
      })
  }

  


})();
if ($('#mapkit-3374').length){
    google.maps.event.addDomListener(window, 'load', init);
    var map, markersArray = [];

    function bindInfoWindow(marker, map, location) {
        google.maps.event.addListener(marker, 'click', function() {
            function close(location) {
                location.ib.close();
                location.infoWindowVisible = false;
                location.ib = null;
            }

            if (location.infoWindowVisible === true) {
                close(location);
            } else {
                markersArray.forEach(function(loc, index){
                    if (loc.ib && loc.ib !== null) {
                        close(loc);
                    }
                });

                var boxText = document.createElement('div');
                boxText.style.cssText = 'background: #fff;';
                boxText.classList.add('md-whiteframe-2dp');

                function buildPieces(location, el, part, icon) {
                    if (location[part] === '') {
                        return '';
                    } else if (location.iw[part]) {
                        switch(el){
                            case 'photo':
                                if (location.photo){
                                    return '<div class="iw-photo" style="background-image: url(' + location.photo + ');"></div>';
                                 } else {
                                    return '';
                                }
                                break;
                            case 'iw-toolbar':
                                return '<div class="iw-toolbar"><h3 class="md-subhead">' + location.title + '</h3></div>';
                                break;
                            case 'div':
                                switch(part){
                                    case 'email':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="mailto:' + location.email + '" target="_blank">' + location.email + '</a></span></div>';
                                        break;
                                    case 'web':
                                        return '<div class="iw-details"><i class="material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span><a href="' + location.web + '" target="_blank">' + location.web_formatted + '</a></span></div>';
                                        break;
                                    case 'desc':
                                        return '<label class="iw-desc" for="cb_details"><input type="checkbox" id="cb_details"/><h3 class="iw-x-details">Details</h3><i class="material-icons toggle-open-details"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><p class="iw-x-details">' + location.desc + '</p></label>';
                                        break;
                                    default:
                                        return '<div class="iw-details"><i class="material-icons"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><span>' + location[part] + '</span></div>';
                                    break;
                                }
                                break;
                            case 'open_hours':
                                var items = '';
                                if (location.open_hours.length > 0){
                                    for (var i = 0; i < location.open_hours.length; ++i) {
                                        if (i !== 0){
                                            items += '<li><strong>' + location.open_hours[i].day + '</strong><strong>' + location.open_hours[i].hours +'</strong></li>';
                                        }
                                        var first = '<li><label for="cb_hours"><input type="checkbox" id="cb_hours"/><strong>' + location.open_hours[0].day + '</strong><strong>' + location.open_hours[0].hours +'</strong><i class="material-icons toggle-open-hours"><img src="//cdn.mapkit.io/v1/icons/keyboard_arrow_down.svg"/></i><ul>' + items + '</ul></label></li>';
                                    }
                                    return '<div class="iw-list"><i class="material-icons first-material-icons" style="color:#4285f4;"><img src="//cdn.mapkit.io/v1/icons/' + icon + '.svg"/></i><ul>' + first + '</ul></div>';
                                 } else {
                                    return '';
                                }
                                break;
                         }
                    } else {
                        return '';
                    }
                }

                boxText.innerHTML = 
                    buildPieces(location, 'photo', 'photo', '') +
                    buildPieces(location, 'iw-toolbar', 'title', '') +
                    buildPieces(location, 'div', 'address', 'location_on') +
                    buildPieces(location, 'div', 'web', 'public') +
                    buildPieces(location, 'div', 'email', 'email') +
                    buildPieces(location, 'div', 'tel', 'phone') +
                    buildPieces(location, 'div', 'int_tel', 'phone') +
                    buildPieces(location, 'open_hours', 'open_hours', 'access_time') +
                    buildPieces(location, 'div', 'desc', 'keyboard_arrow_down');

                var myOptions = {
                    alignBottom: true,
                    content: boxText,
                    disableAutoPan: true,
                    maxWidth: 0,
                    pixelOffset: new google.maps.Size(-140, -40),
                    zIndex: null,
                    boxStyle: {
                        opacity: 1,
                        width: '280px'
                    },
                    closeBoxMargin: '0px 0px 0px 0px',
                    infoBoxClearance: new google.maps.Size(1, 1),
                    isHidden: false,
                    pane: 'floatPane',
                    enableEventPropagation: false
                };

                location.ib = new InfoBox(myOptions);
                location.ib.open(map, marker);
                location.infoWindowVisible = true;
            }
        });
    }

    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(56.29,44.05),
            zoom: 12,
            gestureHandling: 'auto',
            fullscreenControl: false,
            zoomControl: false,
            disableDoubleClickZoom: false,
            mapTypeControl: false,
            scaleControl: false,
            scrollwheel: false,
            streetViewControl: false,
            draggable : false,
            clickableIcons: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#566c76"
            },
            {
                "visibility": "on"
            }
        ]
    }
]
        }
        var mapElement = document.getElementById('mapkit-3374');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
            
        ];
        for (i = 0; i < locations.length; i++) {
            marker = new google.maps.Marker({
                icon: locations[i].marker,
                position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
                map: map,
                title: locations[i].title,
                address: locations[i].address,
                desc: locations[i].desc,
                tel: locations[i].tel,
                int_tel: locations[i].int_tel,
                vicinity: locations[i].vicinity,
                open: locations[i].open,
                open_hours: locations[i].open_hours,
                photo: locations[i].photo,
                time: locations[i].time,
                email: locations[i].email,
                web: locations[i].web,
                iw: locations[i].iw
            });
            markersArray.push(marker);

            if (locations[i].iw.enable === true){
                bindInfoWindow(marker, map, locations[i]);
            }
        }
    }

    }
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xyXG4gICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgLypcclxuICBQYXJhbGxheFxyXG4gICovXHJcbiAgaWYoJChcIiNzY2VuZVwiKS5sZW5ndGgpe1xyXG4gICAgJCgnI3NjZW5lJykucGFyYWxsYXgoe1xyXG4gICAgICAgIHNjYWxhclg6IDMsXHJcbiAgICAgICAgc2NhbGFyWTogMyxcclxuICAgICAgICBmcmljdGlvblg6IDAuNSxcclxuICAgICAgICBmcmljdGlvblk6IDAuNSAgICBcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLypcclxuICBIYW1idXJnZXIgbWVudVxyXG4gICovXHJcbiAgKGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZhciBiZ01lbnUgPSAkKCcubWFpbi1tZW51JyksXHJcbiAgICAgICAgICBjb250ZW50ID0gJCgnLm1haW4tbWVudV9fbGlzdCcpLFxyXG4gICAgICAgICAgaGFtYnVyZ2VyID0gJCgnLmhhbWJ1cmdlcicpO1xyXG5cclxuICAgICQoJ2J1dHRvbi5oYW1idXJnZXInKS5vbignY2xpY2snLCBvbkNsaWNrVG9nZ2xlKTtcclxuICAvLyAgICQoJy5tYWluLW1lbnVfX2xpc3QnKS5vbignY2xpY2snLCBvbkNsaWNrVG9nZ2xlKTtcclxuICAgIC8vICQoXCIubWFpbi1tZW51X19pdGVtXCIpLmVhY2goZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgIC8vICAgdmFyIGl0ZW1fZGVsYXkgPSAwLjMrMC4xKmluZGV4O1xyXG4gICAgICAvLyAkKHRoaXMpLmNzcyhcInRyYW5zaXRpb24tZGVsYXlcIiwgaXRlbV9kZWxheSArIFwic1wiKTtcclxuICAgIC8vIH0pO1xyXG4gICAgZnVuY3Rpb24gb25DbGlja1RvZ2dsZShlKXtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICBiZ01lbnUudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICBjb250ZW50LnRvZ2dsZUNsYXNzKCdsaXN0LWFjdGl2ZScpO1xyXG4gICAgICBoYW1idXJnZXIudG9nZ2xlQ2xhc3MoJ2lzLWFjdGl2ZScpOyAgICBcclxuICAgIH0gXHJcbiAgfSkoKVxyXG4gIFxyXG4gICAgLypcclxuICAgIFNjcm9sbCBEb3duIGJ1dHRvblxyXG4gICAgKi9cclxuICAgJCgnLmFycm93LWRvd24nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgc2VsZWN0b3IgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTsgXHJcbiAgICAgICAgdmFyIGggPSAkKHNlbGVjdG9yKTsgXHJcbiAgICAgICAgXHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBzY3JvbGxUb3A6IGgub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICBcclxuICAgICAgICBcclxuICAgIH0pOyAgICBcclxuICAgIC8qXHJcbiAgICBTY3JvbGwgcGFyYWxsYXhcclxuICAgICovXHJcbiAgICB2YXIgcGFyYWxsYXggPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAvLyB2YXIgYmcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVhZGVyJyk7XHJcbiAgICB2YXIgdXNlckF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXJfX2F2YXRhcicpO1xyXG4gICAgdmFyIHVzZXJOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXJfX25hbWUnKTtcclxuICAgIHZhciB1c2VyRGVzY3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudXNlcl9fZGVzY3InKTtcclxuICAgIHZhciBzZWN0aW9uSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXJfX2JnJyk7XHJcblxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIG1vdmU6IGZ1bmN0aW9uKCBibG9jaywgd2luZG93U2Nyb2xsLHN0cmFmZUFtb3VudCkge1xyXG4gICAgICAgICAgICB2YXIgc3RyYWZlID0gd2luZG93U2Nyb2xsIC8gLXN0cmFmZUFtb3VudCArICclJztcclxuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybVN0cmluZyA9ICd0cmFuc2xhdGUzZCgwLCcgKyBzdHJhZmUgKyAnLDApJ1xyXG5cclxuXHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGJsb2NrLnN0eWxlO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHN0eWxlLnRvcCA9IHN0cmFmZTtcclxuICAgICAgICAgICAgc3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgICAgICBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1TdHJpbmc7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBpbml0OiBmdW5jdGlvbih3U2Nyb2xsKSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMubW92ZShiZyx3U2Nyb2xsLDQ1KTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHNlY3Rpb25JbWcsd1Njcm9sbCwxNSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyRGVzY3Isd1Njcm9sbCwxKTtcclxuICAgICAgICAgICAgdGhpcy5tb3ZlKHVzZXJOYW1lLHdTY3JvbGwsMSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyQXYsd1Njcm9sbCwxKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICB9KCkpO1xyXG4gICAgLypcclxuICAgIFN2ZyBkcm93XHJcbiAgICAqLyAgXHJcblxyXG5cclxuICB3aW5kb3cub25zY3JvbGwgPSBmdW5jdGlvbigpe1xyXG4gICAgdmFyIHdTY3JvbGwgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICBwYXJhbGxheC5pbml0KHdTY3JvbGwpO1xyXG4gICAgLy8gIHN2Z1Njcm9sbC5ncm93KHdTY3JvbGwpO1xyXG4gIH1cclxuLypcclxuLy8gUHJlbG9hZGVyXHJcbiovXHJcbnZhciBwcmVsb2FkZXIgPSAoZnVuY3Rpb24gKCkge1xyXG4gIHZhciBwZXJjZW50c1RvdGFsID0gMCxcclxuICAgIHByZWxvYWRlciA9ICQoJy5wcmVsb2FkZXInKTtcclxuXHJcbiAgdmFyIGltZ1BhdGggPSAkKCcqJykubWFwKGZ1bmN0aW9uIChuZHgsIGVsZW1lbnQpIHtcclxuICAgIHZhciBiYWNrZ3JvdW5kID0gJChlbGVtZW50KS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnKSxcclxuICAgICAgaW1nID0gJChlbGVtZW50KS5pcygnaW1nJyksXHJcbiAgICAgIHBhdGggPSAnJztcclxuXHJcbiAgICBpZiAoYmFja2dyb3VuZCAhPSAnbm9uZScpIHtcclxuICAgICAgcGF0aCA9IGJhY2tncm91bmQucmVwbGFjZSgndXJsKFwiJywgJycpLnJlcGxhY2UoJ1wiKScsICcnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaW1nKSB7XHJcbiAgICAgIHBhdGggPSAkKGVsZW1lbnQpLmF0dHIoJ3NyYycpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChwYXRoKSByZXR1cm4gcGF0aFxyXG5cclxuICB9KTtcclxuXHJcbiAgdmFyIHNldFBlcmNlbnRzID0gZnVuY3Rpb24gKHRvdGFsLCBjdXJyZW50KSB7XHJcbiAgICB2YXIgcGVyc2VudHMgPSBNYXRoLmNlaWwoY3VycmVudCAvIHRvdGFsICogMTAwKTtcclxuXHJcbiAgICAkKCcucHJlbG9hZGVyX19wZXJjZW50cycpLnRleHQocGVyc2VudHMgKyAnJScpO1xyXG5cclxuICAgIGlmIChwZXJzZW50cyA+PSAxMDApIHtcclxuICAgICAgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBsb2FkSW1hZ2VzID0gZnVuY3Rpb24gKGltYWdlcykge1xyXG5cclxuICAgIGlmICghaW1hZ2VzLmxlbmd0aCkgcHJlbG9hZGVyLmZhZGVPdXQoKTtcclxuXHJcbiAgICBpbWFnZXMuZm9yRWFjaChmdW5jdGlvbiAoaW1nLCBpLCBpbWFnZXMpIHtcclxuICAgICAgdmFyIGZha2VJbWFnZSA9ICQoJzxpbWc+Jywge1xyXG4gICAgICAgIGF0dHI6IHtcclxuICAgICAgICAgIHNyYzogaW1nXHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGZha2VJbWFnZS5vbignbG9hZCBlcnJvcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBwZXJjZW50c1RvdGFsKys7XHJcbiAgICAgICAgc2V0UGVyY2VudHMoaW1hZ2VzLmxlbmd0aCwgcGVyY2VudHNUb3RhbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4ge1xyXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xyXG4gICAgICB2YXIgaW1ncyA9IGltZ1BhdGgudG9BcnJheSgpO1xyXG5cclxuICAgICAgbG9hZEltYWdlcyhpbWdzKTtcclxuICAgIH1cclxuICB9XHJcbn0oKSk7XHJcbnByZWxvYWRlci5pbml0KCk7XHJcbi8qXHJcbi8vIFNsaWRlclxyXG4qL1xyXG4kKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIFxyXG4gICAgJG5leHRCdG4gPSAkKCcucG9ydGZvbGlvLWJ0bl9fbmV4dCcpLFxyXG4gICAgJHByZXZCdG4gPSAkKCcucG9ydGZvbGlvLWJ0bl9fcHJldicpLFxyXG4gICAgJHNsaWRlSXRlbVJpZ2h0ID0gJG5leHRCdG4ubmV4dCgnLnBvcnRmb2xpby10aHVtYm5haWxzJykuZmluZCgnLnBvcnRmb2xpby10aHVtYm5haWwnKSxcclxuICAgICRzbGlkZUl0ZW1MZWZ0ID0gJHByZXZCdG4ubmV4dCgnLnBvcnRmb2xpby10aHVtYm5haWxzJykuZmluZCgnLnBvcnRmb2xpby10aHVtYm5haWwnKSxcclxuICAgICRtYWluU2xpZGUgPSAkKCcucG9ydGZvbGlvLXNsaWRlcl9fcHJldmlldyBpbWcnKSxcclxuICAgICRtYWluRGVzY3IgPSAkKCcucG9ydGZvbGlvLXNsaWRlcl9fcHJvamVjdHMgLnByb2plY3QtaXRlbScpLFxyXG4gICAgY3VycmVudFNsaWRlSW5kZXggPSAwO1xyXG5cclxuICAgICRuZXh0QnRuLm9uKCdjbGljaycsIGNoYW5nZVNsaWRlKTtcclxuICAgICRwcmV2QnRuLm9uKCdjbGljaycsIGNoYW5nZVNsaWRlKTtcclxuXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VTbGlkZShlKSB7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuXHJcbiAgICAgIGlmKCR0aGlzLmhhc0NsYXNzKCdwb3J0Zm9saW8tYnRuX19wcmV2JykpIHtcclxuICAgICAgICBpZihjdXJyZW50U2xpZGVJbmRleCAtIDEgPCAwKSB7XHJcbiAgICAgICAgICBjdXJyZW50U2xpZGVJbmRleCA9ICRzbGlkZUl0ZW1SaWdodC5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudFNsaWRlSW5kZXggLT0gMTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2UgaWYgKCR0aGlzLmhhc0NsYXNzKCdwb3J0Zm9saW8tYnRuX19uZXh0JykpIHtcclxuICAgICAgICAgIGlmIChjdXJyZW50U2xpZGVJbmRleCArIDEgPiAkc2xpZGVJdGVtUmlnaHQubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGVJbmRleCA9IDA7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjdXJyZW50U2xpZGVJbmRleCArPSAxXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjaGFuZ2VNYWluUGljKCRzbGlkZUl0ZW1SaWdodCk7XHJcbiAgICAgICAgY2hhbmdlRGVzY3IoJG1haW5EZXNjcik7XHJcbiAgICAgICAgYW5pbWF0ZVRleHQoJG1haW5EZXNjciwgJy5wcm9qZWN0LWl0ZW1fX3RpdGxlJyk7XHJcblxyXG4gICAgICAgIHNsaWRlUmlnaHRQcmV2aWV3KCRzbGlkZUl0ZW1SaWdodClcclxuICAgICAgICBzbGlkZUxlZnRQcmV2aWV3KCRzbGlkZUl0ZW1MZWZ0KVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY2hhbmdlRGVzY3Ioc2xpZGVJdGVtcyl7XHJcbiAgICAgIHNsaWRlSXRlbXMuZmlsdGVyKCcucHJvamVjdC1pdGVtX19hY3RpdmUnKS5yZW1vdmVDbGFzcygncHJvamVjdC1pdGVtX19hY3RpdmUnKTtcclxuICAgICAgc2xpZGVJdGVtcy5lcShjdXJyZW50U2xpZGVJbmRleCkuYWRkQ2xhc3MoJ3Byb2plY3QtaXRlbV9fYWN0aXZlJyk7XHJcbiAgICAgIFxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gY2hhbmdlTWFpblBpYyAoc2xpZGVJdGVtcykge1xyXG4gICAgICB2YXIgbmV4dEltZ1NyYyA9IHNsaWRlSXRlbXMuZXEoY3VycmVudFNsaWRlSW5kZXgpLmZpbmQoJ2ltZycpLmF0dHIoJ3NyYycpO1xyXG4gICAgICB2YXIgbmV4dEltZ0FsdCA9IHNsaWRlSXRlbXMuZXEoY3VycmVudFNsaWRlSW5kZXgpLmZpbmQoJ2ltZycpLmF0dHIoJ2FsdCcpO1xyXG4gICAgICAkbWFpblNsaWRlLmZhZGVPdXQoJzUwJyxmdW5jdGlvbigpIHtcclxuICAgICAgICAkbWFpblNsaWRlLmF0dHIoJ3NyYycsIG5leHRJbWdTcmMpO1xyXG4gICAgICAgICRtYWluU2xpZGUuYXR0cignYWx0JywgbmV4dEltZ0FsdCk7XHJcbiAgICAgICAgJCh0aGlzKS5mYWRlSW4oJzEwMCcpXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzbGlkZVJpZ2h0UHJldmlldyAoc2xpZGVJdGVtcyl7XHJcbiAgICAgIHZhciBuZXh0SW1nSW5kZXg7XHJcbiAgICAgIGlmIChjdXJyZW50U2xpZGVJbmRleCArIDEgPj0gc2xpZGVJdGVtcy5sZW5ndGgpe1xyXG4gICAgICAgIG5leHRJbWdJbmRleCA9IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV4dEltZ0luZGV4ID0gY3VycmVudFNsaWRlSW5kZXggKyAxO1xyXG4gICAgICB9XHJcbiAgICAgIHNsaWRlSXRlbXMuZmlsdGVyKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdtb3ZlVXAnKTtcclxuICAgICAgc2xpZGVJdGVtcy5lcShuZXh0SW1nSW5kZXgpLmFkZENsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnbW92ZVVwJyk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBzbGlkZUxlZnRQcmV2aWV3IChzbGlkZUl0ZW1zKXtcclxuICAgICAgdmFyIG5leHRJbWdJbmRleDtcclxuICAgICAgaWYgKGN1cnJlbnRTbGlkZUluZGV4ID09IDApe1xyXG4gICAgICAgIG5leHRJbWdJbmRleCA9IHNsaWRlSXRlbXMubGVuZ3RoIC0gMTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBuZXh0SW1nSW5kZXggPSBjdXJyZW50U2xpZGVJbmRleCAtIDE7XHJcbiAgICAgIH1cclxuICAgICAgc2xpZGVJdGVtcy5maWx0ZXIoJy5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ21vdmVEb3duJyk7XHJcbiAgICAgIHNsaWRlSXRlbXMuZXEobmV4dEltZ0luZGV4KS5hZGRDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ21vdmVEb3duJyk7XHJcbiAgICB9XHJcbn0pXHJcbi8qXHJcbi8vIFRleHQgYW5pbWF0aW9uXHJcbiovXHJcbmZ1bmN0aW9uIGFuaW1hdGVUZXh0IChtYWluQmxvY2ssIGJsb2NrVGV4dCl7XHJcbiAgdmFyIGJsb2NrID0gbWFpbkJsb2NrLmZpbHRlcignLnByb2plY3QtaXRlbV9fYWN0aXZlJykuZmluZChibG9ja1RleHQpLFxyXG4gICAgICBzdHJpbmcgPSBibG9jay50ZXh0KCkudHJpbSgpLFxyXG4gICAgICBzdHJpbmdBcnJheSA9IHN0cmluZy5zcGxpdCgnJyksXHJcbiAgICAgIHdvcmQ9ICcnLFxyXG4gICAgICBhbmltYXRpb25TdGF0ZSA9ICQuRGVmZXJyZWQoKTtcclxuXHJcbiAgICAgIHN0cmluZ0FycmF5LmZvckVhY2goZnVuY3Rpb24obGV0dGVyKXtcclxuICAgICAgICBpZihsZXR0ZXIgIT0gXCIgXCIpe1xyXG4gICAgICAgICAgdmFyIGxldHRlckh0bWwgPSAnPHNwYW4gY2xhc3M9XCJsZXR0ZXItc3BhblwiPicgKyBsZXR0ZXIgKyAnPC9zcGFuPic7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZhciBsZXR0ZXJIdG1sID0gJzxzcGFuIGNsYXNzPVwibGV0dGVyLXNwYW5fc3BhY2VcIj4nICsgbGV0dGVyICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd29yZCArPSBsZXR0ZXJIdG1sO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGJsb2NrLmh0bWwod29yZClcclxuICAgICAgXHJcbiAgICAgIHZhciBsZXR0ZXIgPSBibG9jay5maW5kKCcubGV0dGVyLXNwYW4nKSxcclxuICAgICAgICAgIGNvdW50ZXIgPSAwLFxyXG4gICAgICAgICAgdGltZXIsXHJcbiAgICAgICAgICBkdXJhdGlvbiA9IDUwMCAvIHN0cmluZ0FycmF5Lmxlbmd0aDtcclxuICAgICAgZnVuY3Rpb24gc2hvd0xldHRlcnMoKSB7XHJcbiAgICAgICAgdmFyIGN1cnJlbnRMZXR0ZXIgPSBsZXR0ZXIuZXEoY291bnRlcik7XHJcbiAgICAgICAgY3VycmVudExldHRlci5hZGRDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgY291bnRlcisrXHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgdGltZXIgIT0gJ3VuZGVmaW5lZCcpe1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRpbWVyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dChzaG93TGV0dGVycywgZHVyYXRpb24pO1xyXG4gICAgICB9O1xyXG4gICAgICBzaG93TGV0dGVycygpO1xyXG59XHJcblxyXG5cclxuXHJcblxyXG4vKlxyXG4vLyBCbHVyXHJcbiovXHJcblx0ZnVuY3Rpb24gc2V0X2JsdXIoKXtcclxuXHRcdHZhciBzZWN0aW9uID0gJChcIi5mZWVkYmFjay1ibG9ja1wiKSxcclxuXHRcdFx0Zm9ybV9iZyA9ICQoXCIuY29udGFjdC1mb3JtX19iZ1wiKSxcclxuXHRcdFx0Ymdfb2Zmc2V0ID0gc2VjdGlvbi5vZmZzZXQoKS50b3AgLSBmb3JtX2JnLm9mZnNldCgpLnRvcDtcclxuXHJcblxyXG5cdFx0Zm9ybV9iZy5jc3Moe1xyXG5cdFx0XHRcImJhY2tncm91bmQtcG9zaXRpb25cIiA6IFwiY2VudGVyIFwiICsgYmdfb2Zmc2V0ICsgXCJweFwiXHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH1cclxuXHJcblx0aWYoJChcIi5mZWVkYmFjay1ibG9ja1wiKS5sZW5ndGgpe1xyXG5cdFx0JCh3aW5kb3cpLm9uKFwibG9hZFwiLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0c2V0X2JsdXIoKTtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcblx0XHRcdHNldF9ibHVyKCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG4gIC8qXHJcbiAgQWpheCBmb3JtXHJcbiAgKi9cclxuXHJcbiAgaWYoJCgnI2NvbnRhY3QnKS5sZW5ndGgpe1xyXG4gICAgICAkKCcjY29udGFjdCcpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgIHZhciAgIG5hbWUgPSAkKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICByZXBseXRvID0gJCgnaW5wdXRbbmFtZT1lbWFpbF0nKS52YWwoKSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VUZXh0ID0gJCgndGV4dGFyZWFbbmFtZT1tZXNzYWdlXScpLnZhbCgpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHVybDogXCJodHRwczovL2Zvcm1zcHJlZS5pby9zaGVrbGVpbi5kaW1hQGdtYWlsLmNvbVwiLFxyXG4gICAgICAgICAgICAvL3VybDogXCIjXCIsXHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgINCY0LzRjzogbmFtZSxcclxuICAgICAgICAgICAgICAgINCe0YI6IHJlcGx5dG8sXHJcbiAgICAgICAgICAgICAgICDQodC+0L7QsdGJ0LXQvdC40LU6IG1lc3NhZ2VUZXh0XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiBcImpzb25cIixcclxuICAgICAgICAgICAgYmVmb3JlU2VuZDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgJCgnLmNvbnRhY3QtZm9ybV9fZmllbGQnKS5jc3MoeydvcGFjaXR5JzogMH0pXHJcbiAgICAgICAgICAgICAgICQoJy5hamF4bG9hZGVyJykuYWRkQ2xhc3MoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJy5hamF4bG9hZGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKCcuY29udGFjdHMtd3JhcHBlcicpLmFkZENsYXNzKCdhY3RpdmUgc3VjY2VzcycpXHJcbiAgICAgICAgICAgICQoJy5jb250YWN0cy13cmFwcGVyX190ZXh0JykudGV4dCgn0KHQvtC+0LHRidC10L3QuNC1INC+0YLQv9GA0LDQstC70LXQvdC+JylcclxuICAgICAgICAgICAgY2xlYXJGb3JtKClcclxuICAgICAgICAgICAgJCgnI2NvbnRhY3QnKVswXS5yZXNldCgpO1xyXG4gICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgJCgnLmFqYXhsb2FkZXInKS5yZW1vdmVDbGFzcygnYWN0aXZlJykgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoJy5jb250YWN0cy13cmFwcGVyJykuYWRkQ2xhc3MoJ2FjdGl2ZSBmYWlsJylcclxuICAgICAgICAgICAgJCgnLmNvbnRhY3RzLXdyYXBwZXJfX3RleHQnKS50ZXh0KCfQntGI0LjQsdC60LAg0L7RgtC/0YDQsNCy0LrQuCcpXHJcbiAgICAgICAgICAgIGNsZWFyRm9ybSgpICAgICAgICAgXHJcbiAgICAgICAgfSkgICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGNsZWFyRm9ybSgpe1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAkKCcuY29udGFjdC1mb3JtX19maWVsZCcpLmNzcyh7J29wYWNpdHknOiAxfSlcclxuICAgICAgICAgICAgICAgICQoJy5jb250YWN0cy13cmFwcGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZSBzdWNjZXNzIGZhaWwnKVxyXG4gICAgICAgICAgICB9LCAyMDAwKTsgICBcclxuICAgICAgICB9XHJcbiAgICAgIH0pXHJcbiAgfVxyXG5cclxuICBcclxuXHJcblxyXG59KSgpOyIsImlmICgkKCcjbWFwa2l0LTMzNzQnKS5sZW5ndGgpe1xyXG4gICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkRG9tTGlzdGVuZXIod2luZG93LCAnbG9hZCcsIGluaXQpO1xyXG4gICAgdmFyIG1hcCwgbWFya2Vyc0FycmF5ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gYmluZEluZm9XaW5kb3cobWFya2VyLCBtYXAsIGxvY2F0aW9uKSB7XHJcbiAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXIobWFya2VyLCAnY2xpY2snLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgZnVuY3Rpb24gY2xvc2UobG9jYXRpb24pIHtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmliLmNsb3NlKCk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAobG9jYXRpb24uaW5mb1dpbmRvd1Zpc2libGUgPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlKGxvY2F0aW9uKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1hcmtlcnNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGxvYywgaW5kZXgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2MuaWIgJiYgbG9jLmliICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsb3NlKGxvYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGJveFRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGJveFRleHQuc3R5bGUuY3NzVGV4dCA9ICdiYWNrZ3JvdW5kOiAjZmZmOyc7XHJcbiAgICAgICAgICAgICAgICBib3hUZXh0LmNsYXNzTGlzdC5hZGQoJ21kLXdoaXRlZnJhbWUtMmRwJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gYnVpbGRQaWVjZXMobG9jYXRpb24sIGVsLCBwYXJ0LCBpY29uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uW3BhcnRdID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2NhdGlvbi5pd1twYXJ0XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2goZWwpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAncGhvdG8nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5waG90byl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LXBob3RvXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJyArIGxvY2F0aW9uLnBob3RvICsgJyk7XCI+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2l3LXRvb2xiYXInOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LXRvb2xiYXJcIj48aDMgY2xhc3M9XCJtZC1zdWJoZWFkXCI+JyArIGxvY2F0aW9uLnRpdGxlICsgJzwvaDM+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2Rpdic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHBhcnQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdlbWFpbCc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj48YSBocmVmPVwibWFpbHRvOicgKyBsb2NhdGlvbi5lbWFpbCArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgbG9jYXRpb24uZW1haWwgKyAnPC9hPjwvc3Bhbj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ3dlYic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1kZXRhaWxzXCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj48YSBocmVmPVwiJyArIGxvY2F0aW9uLndlYiArICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj4nICsgbG9jYXRpb24ud2ViX2Zvcm1hdHRlZCArICc8L2E+PC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGVzYyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxsYWJlbCBjbGFzcz1cIml3LWRlc2NcIiBmb3I9XCJjYl9kZXRhaWxzXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiY2JfZGV0YWlsc1wiLz48aDMgY2xhc3M9XCJpdy14LWRldGFpbHNcIj5EZXRhaWxzPC9oMz48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRvZ2dsZS1vcGVuLWRldGFpbHNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48cCBjbGFzcz1cIml3LXgtZGV0YWlsc1wiPicgKyBsb2NhdGlvbi5kZXNjICsgJzwvcD48L2xhYmVsPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHNwYW4+JyArIGxvY2F0aW9uW3BhcnRdICsgJzwvc3Bhbj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdvcGVuX2hvdXJzJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbXMgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb24ub3Blbl9ob3Vycy5sZW5ndGggPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsb2NhdGlvbi5vcGVuX2hvdXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbXMgKz0gJzxsaT48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzW2ldLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzW2ldLmhvdXJzICsnPC9zdHJvbmc+PC9saT4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gJzxsaT48bGFiZWwgZm9yPVwiY2JfaG91cnNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9ob3Vyc1wiLz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmRheSArICc8L3N0cm9uZz48c3Ryb25nPicgKyBsb2NhdGlvbi5vcGVuX2hvdXJzWzBdLmhvdXJzICsnPC9zdHJvbmc+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyB0b2dnbGUtb3Blbi1ob3Vyc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zL2tleWJvYXJkX2Fycm93X2Rvd24uc3ZnXCIvPjwvaT48dWw+JyArIGl0ZW1zICsgJzwvdWw+PC9sYWJlbD48L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctbGlzdFwiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgZmlyc3QtbWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOiM0Mjg1ZjQ7XCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMvJyArIGljb24gKyAnLnN2Z1wiLz48L2k+PHVsPicgKyBmaXJzdCArICc8L3VsPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBib3hUZXh0LmlubmVySFRNTCA9IFxyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAncGhvdG8nLCAncGhvdG8nLCAnJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnaXctdG9vbGJhcicsICd0aXRsZScsICcnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnYWRkcmVzcycsICdsb2NhdGlvbl9vbicpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICd3ZWInLCAncHVibGljJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2VtYWlsJywgJ2VtYWlsJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3RlbCcsICdwaG9uZScpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdpbnRfdGVsJywgJ3Bob25lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnb3Blbl9ob3VycycsICdvcGVuX2hvdXJzJywgJ2FjY2Vzc190aW1lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2Rlc2MnLCAna2V5Ym9hcmRfYXJyb3dfZG93bicpO1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBteU9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxpZ25Cb3R0b206IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogYm94VGV4dCxcclxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlQXV0b1BhbjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aDogMCxcclxuICAgICAgICAgICAgICAgICAgICBwaXhlbE9mZnNldDogbmV3IGdvb2dsZS5tYXBzLlNpemUoLTE0MCwgLTQwKSxcclxuICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgYm94U3R5bGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICcyODBweCdcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlQm94TWFyZ2luOiAnMHB4IDBweCAwcHggMHB4JyxcclxuICAgICAgICAgICAgICAgICAgICBpbmZvQm94Q2xlYXJhbmNlOiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgxLCAxKSxcclxuICAgICAgICAgICAgICAgICAgICBpc0hpZGRlbjogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFuZTogJ2Zsb2F0UGFuZScsXHJcbiAgICAgICAgICAgICAgICAgICAgZW5hYmxlRXZlbnRQcm9wYWdhdGlvbjogZmFsc2VcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIgPSBuZXcgSW5mb0JveChteU9wdGlvbnMpO1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIub3BlbihtYXAsIG1hcmtlcik7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0KCkge1xyXG4gICAgICAgIHZhciBtYXBPcHRpb25zID0ge1xyXG4gICAgICAgICAgICBjZW50ZXI6IG5ldyBnb29nbGUubWFwcy5MYXRMbmcoNTYuMjksNDQuMDUpLFxyXG4gICAgICAgICAgICB6b29tOiAxMixcclxuICAgICAgICAgICAgZ2VzdHVyZUhhbmRsaW5nOiAnYXV0bycsXHJcbiAgICAgICAgICAgIGZ1bGxzY3JlZW5Db250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgem9vbUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBkaXNhYmxlRG91YmxlQ2xpY2tab29tOiBmYWxzZSxcclxuICAgICAgICAgICAgbWFwVHlwZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY2FsZUNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBzY3JvbGx3aGVlbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHN0cmVldFZpZXdDb250cm9sOiBmYWxzZSxcclxuICAgICAgICAgICAgZHJhZ2dhYmxlIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNsaWNrYWJsZUljb25zOiBmYWxzZSxcclxuICAgICAgICAgICAgbWFwVHlwZUlkOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuUk9BRE1BUCxcclxuICAgICAgICAgICAgc3R5bGVzOiBbXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImFkbWluaXN0cmF0aXZlXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy50ZXh0LmZpbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiIzQ0NDQ0NFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJsYW5kc2NhcGVcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiNmMmYyZjJcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwicG9pXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwidmlzaWJpbGl0eVwiOiBcIm9mZlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwic2F0dXJhdGlvblwiOiAtMTAwXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwibGlnaHRuZXNzXCI6IDQ1XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmhpZ2h3YXlcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwic2ltcGxpZmllZFwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJyb2FkLmFydGVyaWFsXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImxhYmVscy5pY29uXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInRyYW5zaXRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcIndhdGVyXCIsXHJcbiAgICAgICAgXCJlbGVtZW50VHlwZVwiOiBcImFsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNTY2Yzc2XCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib25cIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG5dXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBtYXBFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcGtpdC0zMzc0Jyk7XHJcbiAgICAgICAgdmFyIG1hcCA9IG5ldyBnb29nbGUubWFwcy5NYXAobWFwRWxlbWVudCwgbWFwT3B0aW9ucyk7XHJcbiAgICAgICAgdmFyIGxvY2F0aW9ucyA9IFtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgXTtcclxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbG9jYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIG1hcmtlciA9IG5ldyBnb29nbGUubWFwcy5NYXJrZXIoe1xyXG4gICAgICAgICAgICAgICAgaWNvbjogbG9jYXRpb25zW2ldLm1hcmtlcixcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgZ29vZ2xlLm1hcHMuTGF0TG5nKGxvY2F0aW9uc1tpXS5sYXQsIGxvY2F0aW9uc1tpXS5sbmcpLFxyXG4gICAgICAgICAgICAgICAgbWFwOiBtYXAsXHJcbiAgICAgICAgICAgICAgICB0aXRsZTogbG9jYXRpb25zW2ldLnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogbG9jYXRpb25zW2ldLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICBkZXNjOiBsb2NhdGlvbnNbaV0uZGVzYyxcclxuICAgICAgICAgICAgICAgIHRlbDogbG9jYXRpb25zW2ldLnRlbCxcclxuICAgICAgICAgICAgICAgIGludF90ZWw6IGxvY2F0aW9uc1tpXS5pbnRfdGVsLFxyXG4gICAgICAgICAgICAgICAgdmljaW5pdHk6IGxvY2F0aW9uc1tpXS52aWNpbml0eSxcclxuICAgICAgICAgICAgICAgIG9wZW46IGxvY2F0aW9uc1tpXS5vcGVuLFxyXG4gICAgICAgICAgICAgICAgb3Blbl9ob3VyczogbG9jYXRpb25zW2ldLm9wZW5faG91cnMsXHJcbiAgICAgICAgICAgICAgICBwaG90bzogbG9jYXRpb25zW2ldLnBob3RvLFxyXG4gICAgICAgICAgICAgICAgdGltZTogbG9jYXRpb25zW2ldLnRpbWUsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogbG9jYXRpb25zW2ldLmVtYWlsLFxyXG4gICAgICAgICAgICAgICAgd2ViOiBsb2NhdGlvbnNbaV0ud2ViLFxyXG4gICAgICAgICAgICAgICAgaXc6IGxvY2F0aW9uc1tpXS5pd1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgbWFya2Vyc0FycmF5LnB1c2gobWFya2VyKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbnNbaV0uaXcuZW5hYmxlID09PSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGJpbmRJbmZvV2luZG93KG1hcmtlciwgbWFwLCBsb2NhdGlvbnNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIH0iXX0=
