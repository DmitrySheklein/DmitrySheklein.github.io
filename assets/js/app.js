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
        // animateText($mainDescr, '.project-item__title');

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsIm1hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaFdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIC8qXHJcbiAgUGFyYWxsYXhcclxuICAqL1xyXG4gIGlmKCQoXCIjc2NlbmVcIikubGVuZ3RoKXtcclxuICAgICQoJyNzY2VuZScpLnBhcmFsbGF4KHtcclxuICAgICAgICBzY2FsYXJYOiAzLFxyXG4gICAgICAgIHNjYWxhclk6IDMsXHJcbiAgICAgICAgZnJpY3Rpb25YOiAwLjUsXHJcbiAgICAgICAgZnJpY3Rpb25ZOiAwLjUgICAgXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qXHJcbiAgSGFtYnVyZ2VyIG1lbnVcclxuICAqL1xyXG4gIChmdW5jdGlvbigpe1xyXG4gICAgICB2YXIgYmdNZW51ID0gJCgnLm1haW4tbWVudScpLFxyXG4gICAgICAgICAgY29udGVudCA9ICQoJy5tYWluLW1lbnVfX2xpc3QnKSxcclxuICAgICAgICAgIGhhbWJ1cmdlciA9ICQoJy5oYW1idXJnZXInKTtcclxuXHJcbiAgICAkKCdidXR0b24uaGFtYnVyZ2VyJykub24oJ2NsaWNrJywgb25DbGlja1RvZ2dsZSk7XHJcbiAgLy8gICAkKCcubWFpbi1tZW51X19saXN0Jykub24oJ2NsaWNrJywgb25DbGlja1RvZ2dsZSk7XHJcbiAgICAvLyAkKFwiLm1haW4tbWVudV9faXRlbVwiKS5lYWNoKGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAvLyAgIHZhciBpdGVtX2RlbGF5ID0gMC4zKzAuMSppbmRleDtcclxuICAgICAgLy8gJCh0aGlzKS5jc3MoXCJ0cmFuc2l0aW9uLWRlbGF5XCIsIGl0ZW1fZGVsYXkgKyBcInNcIik7XHJcbiAgICAvLyB9KTtcclxuICAgIGZ1bmN0aW9uIG9uQ2xpY2tUb2dnbGUoZSl7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgYmdNZW51LnRvZ2dsZUNsYXNzKCdhY3RpdmUnKTtcclxuICAgICAgY29udGVudC50b2dnbGVDbGFzcygnbGlzdC1hY3RpdmUnKTtcclxuICAgICAgaGFtYnVyZ2VyLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKTsgICAgXHJcbiAgICB9IFxyXG4gIH0pKClcclxuICBcclxuICAgIC8qXHJcbiAgICBTY3JvbGwgRG93biBidXR0b25cclxuICAgICovXHJcbiAgICQoJy5hcnJvdy1kb3duJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIHNlbGVjdG9yID0gJCh0aGlzKS5hdHRyKCdocmVmJyk7IFxyXG4gICAgICAgIHZhciBoID0gJChzZWxlY3Rvcik7IFxyXG4gICAgICAgIFxyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiBoLm9mZnNldCgpLnRvcFxyXG4gICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgXHJcbiAgICB9KTsgICAgXHJcbiAgICAvKlxyXG4gICAgU2Nyb2xsIHBhcmFsbGF4XHJcbiAgICAqL1xyXG4gICAgdmFyIHBhcmFsbGF4ID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gdmFyIGJnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xyXG4gICAgdmFyIHVzZXJBdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyX19hdmF0YXInKTtcclxuICAgIHZhciB1c2VyTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyX19uYW1lJyk7XHJcbiAgICB2YXIgdXNlckRlc2NyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnVzZXJfX2Rlc2NyJyk7XHJcbiAgICB2YXIgc2VjdGlvbkltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy51c2VyX19iZycpO1xyXG5cclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBtb3ZlOiBmdW5jdGlvbiggYmxvY2ssIHdpbmRvd1Njcm9sbCxzdHJhZmVBbW91bnQpIHtcclxuICAgICAgICAgICAgdmFyIHN0cmFmZSA9IHdpbmRvd1Njcm9sbCAvIC1zdHJhZmVBbW91bnQgKyAnJSc7XHJcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1TdHJpbmcgPSAndHJhbnNsYXRlM2QoMCwnICsgc3RyYWZlICsgJywwKSdcclxuXHJcblxyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBibG9jay5zdHlsZTtcclxuXHJcblxyXG4gICAgICAgICAgICBzdHlsZS50b3AgPSBzdHJhZmU7XHJcbiAgICAgICAgICAgIHN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVN0cmluZztcclxuICAgICAgICAgICAgc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtU3RyaW5nO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgaW5pdDogZnVuY3Rpb24od1Njcm9sbCkge1xyXG4gICAgICAgICAgICAvLyB0aGlzLm1vdmUoYmcsd1Njcm9sbCw0NSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZShzZWN0aW9uSW1nLHdTY3JvbGwsMTUpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUodXNlckRlc2NyLHdTY3JvbGwsMSk7XHJcbiAgICAgICAgICAgIHRoaXMubW92ZSh1c2VyTmFtZSx3U2Nyb2xsLDEpO1xyXG4gICAgICAgICAgICB0aGlzLm1vdmUodXNlckF2LHdTY3JvbGwsMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgfSgpKTtcclxuICAgIC8qXHJcbiAgICBTdmcgZHJvd1xyXG4gICAgKi8gIFxyXG5cclxuXHJcbiAgd2luZG93Lm9uc2Nyb2xsID0gZnVuY3Rpb24oKXtcclxuICAgIHZhciB3U2Nyb2xsID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xyXG4gICAgcGFyYWxsYXguaW5pdCh3U2Nyb2xsKTtcclxuICAgIC8vICBzdmdTY3JvbGwuZ3Jvdyh3U2Nyb2xsKTtcclxuICB9XHJcbi8qXHJcbi8vIFByZWxvYWRlclxyXG4qL1xyXG52YXIgcHJlbG9hZGVyID0gKGZ1bmN0aW9uICgpIHtcclxuICB2YXIgcGVyY2VudHNUb3RhbCA9IDAsXHJcbiAgICBwcmVsb2FkZXIgPSAkKCcucHJlbG9hZGVyJyk7XHJcblxyXG4gIHZhciBpbWdQYXRoID0gJCgnKicpLm1hcChmdW5jdGlvbiAobmR4LCBlbGVtZW50KSB7XHJcbiAgICB2YXIgYmFja2dyb3VuZCA9ICQoZWxlbWVudCkuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJyksXHJcbiAgICAgIGltZyA9ICQoZWxlbWVudCkuaXMoJ2ltZycpLFxyXG4gICAgICBwYXRoID0gJyc7XHJcblxyXG4gICAgaWYgKGJhY2tncm91bmQgIT0gJ25vbmUnKSB7XHJcbiAgICAgIHBhdGggPSBiYWNrZ3JvdW5kLnJlcGxhY2UoJ3VybChcIicsICcnKS5yZXBsYWNlKCdcIiknLCAnJyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGltZykge1xyXG4gICAgICBwYXRoID0gJChlbGVtZW50KS5hdHRyKCdzcmMnKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAocGF0aCkgcmV0dXJuIHBhdGhcclxuXHJcbiAgfSk7XHJcblxyXG4gIHZhciBzZXRQZXJjZW50cyA9IGZ1bmN0aW9uICh0b3RhbCwgY3VycmVudCkge1xyXG4gICAgdmFyIHBlcnNlbnRzID0gTWF0aC5jZWlsKGN1cnJlbnQgLyB0b3RhbCAqIDEwMCk7XHJcblxyXG4gICAgJCgnLnByZWxvYWRlcl9fcGVyY2VudHMnKS50ZXh0KHBlcnNlbnRzICsgJyUnKTtcclxuXHJcbiAgICBpZiAocGVyc2VudHMgPj0gMTAwKSB7XHJcbiAgICAgIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgbG9hZEltYWdlcyA9IGZ1bmN0aW9uIChpbWFnZXMpIHtcclxuXHJcbiAgICBpZiAoIWltYWdlcy5sZW5ndGgpIHByZWxvYWRlci5mYWRlT3V0KCk7XHJcblxyXG4gICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZywgaSwgaW1hZ2VzKSB7XHJcbiAgICAgIHZhciBmYWtlSW1hZ2UgPSAkKCc8aW1nPicsIHtcclxuICAgICAgICBhdHRyOiB7XHJcbiAgICAgICAgICBzcmM6IGltZ1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICBmYWtlSW1hZ2Uub24oJ2xvYWQgZXJyb3InLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgcGVyY2VudHNUb3RhbCsrO1xyXG4gICAgICAgIHNldFBlcmNlbnRzKGltYWdlcy5sZW5ndGgsIHBlcmNlbnRzVG90YWwpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdmFyIGltZ3MgPSBpbWdQYXRoLnRvQXJyYXkoKTtcclxuXHJcbiAgICAgIGxvYWRJbWFnZXMoaW1ncyk7XHJcbiAgICB9XHJcbiAgfVxyXG59KCkpO1xyXG5wcmVsb2FkZXIuaW5pdCgpO1xyXG4vKlxyXG4vLyBTbGlkZXJcclxuKi9cclxuJChmdW5jdGlvbigpe1xyXG4gIHZhciBcclxuICAgICRuZXh0QnRuID0gJCgnLnBvcnRmb2xpby1idG5fX25leHQnKSxcclxuICAgICRwcmV2QnRuID0gJCgnLnBvcnRmb2xpby1idG5fX3ByZXYnKSxcclxuICAgICRzbGlkZUl0ZW1SaWdodCA9ICRuZXh0QnRuLm5leHQoJy5wb3J0Zm9saW8tdGh1bWJuYWlscycpLmZpbmQoJy5wb3J0Zm9saW8tdGh1bWJuYWlsJyksXHJcbiAgICAkc2xpZGVJdGVtTGVmdCA9ICRwcmV2QnRuLm5leHQoJy5wb3J0Zm9saW8tdGh1bWJuYWlscycpLmZpbmQoJy5wb3J0Zm9saW8tdGh1bWJuYWlsJyksXHJcbiAgICAkbWFpblNsaWRlID0gJCgnLnBvcnRmb2xpby1zbGlkZXJfX3ByZXZpZXcgaW1nJyksXHJcbiAgICAkbWFpbkRlc2NyID0gJCgnLnBvcnRmb2xpby1zbGlkZXJfX3Byb2plY3RzIC5wcm9qZWN0LWl0ZW0nKSxcclxuICAgIGN1cnJlbnRTbGlkZUluZGV4ID0gMDtcclxuXHJcbiAgICAkbmV4dEJ0bi5vbignY2xpY2snLCBjaGFuZ2VTbGlkZSk7XHJcbiAgICAkcHJldkJ0bi5vbignY2xpY2snLCBjaGFuZ2VTbGlkZSk7XHJcblxyXG4gICAgZnVuY3Rpb24gY2hhbmdlU2xpZGUoZSkge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XHJcblxyXG4gICAgICBpZigkdGhpcy5oYXNDbGFzcygncG9ydGZvbGlvLWJ0bl9fcHJldicpKSB7XHJcbiAgICAgICAgaWYoY3VycmVudFNsaWRlSW5kZXggLSAxIDwgMCkge1xyXG4gICAgICAgICAgY3VycmVudFNsaWRlSW5kZXggPSAkc2xpZGVJdGVtUmlnaHQubGVuZ3RoIC0gMTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRTbGlkZUluZGV4IC09IDE7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIGlmICgkdGhpcy5oYXNDbGFzcygncG9ydGZvbGlvLWJ0bl9fbmV4dCcpKSB7XHJcbiAgICAgICAgICBpZiAoY3VycmVudFNsaWRlSW5kZXggKyAxID4gJHNsaWRlSXRlbVJpZ2h0Lmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgY3VycmVudFNsaWRlSW5kZXggPSAwO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY3VycmVudFNsaWRlSW5kZXggKz0gMVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhbmdlTWFpblBpYygkc2xpZGVJdGVtUmlnaHQpO1xyXG4gICAgICAgIGNoYW5nZURlc2NyKCRtYWluRGVzY3IpO1xyXG4gICAgICAgIC8vIGFuaW1hdGVUZXh0KCRtYWluRGVzY3IsICcucHJvamVjdC1pdGVtX190aXRsZScpO1xyXG5cclxuICAgICAgICBzbGlkZVJpZ2h0UHJldmlldygkc2xpZGVJdGVtUmlnaHQpXHJcbiAgICAgICAgc2xpZGVMZWZ0UHJldmlldygkc2xpZGVJdGVtTGVmdClcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNoYW5nZURlc2NyKHNsaWRlSXRlbXMpe1xyXG4gICAgICBzbGlkZUl0ZW1zLmZpbHRlcignLnByb2plY3QtaXRlbV9fYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ3Byb2plY3QtaXRlbV9fYWN0aXZlJyk7XHJcbiAgICAgIHNsaWRlSXRlbXMuZXEoY3VycmVudFNsaWRlSW5kZXgpLmFkZENsYXNzKCdwcm9qZWN0LWl0ZW1fX2FjdGl2ZScpO1xyXG4gICAgICBcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGNoYW5nZU1haW5QaWMgKHNsaWRlSXRlbXMpIHtcclxuICAgICAgdmFyIG5leHRJbWdTcmMgPSBzbGlkZUl0ZW1zLmVxKGN1cnJlbnRTbGlkZUluZGV4KS5maW5kKCdpbWcnKS5hdHRyKCdzcmMnKTtcclxuICAgICAgdmFyIG5leHRJbWdBbHQgPSBzbGlkZUl0ZW1zLmVxKGN1cnJlbnRTbGlkZUluZGV4KS5maW5kKCdpbWcnKS5hdHRyKCdhbHQnKTtcclxuICAgICAgJG1haW5TbGlkZS5mYWRlT3V0KCc1MCcsZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJG1haW5TbGlkZS5hdHRyKCdzcmMnLCBuZXh0SW1nU3JjKTtcclxuICAgICAgICAkbWFpblNsaWRlLmF0dHIoJ2FsdCcsIG5leHRJbWdBbHQpO1xyXG4gICAgICAgICQodGhpcykuZmFkZUluKCcxMDAnKVxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2xpZGVSaWdodFByZXZpZXcgKHNsaWRlSXRlbXMpe1xyXG4gICAgICB2YXIgbmV4dEltZ0luZGV4O1xyXG4gICAgICBpZiAoY3VycmVudFNsaWRlSW5kZXggKyAxID49IHNsaWRlSXRlbXMubGVuZ3RoKXtcclxuICAgICAgICBuZXh0SW1nSW5kZXggPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG5leHRJbWdJbmRleCA9IGN1cnJlbnRTbGlkZUluZGV4ICsgMTtcclxuICAgICAgfVxyXG4gICAgICBzbGlkZUl0ZW1zLmZpbHRlcignLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKS5hZGRDbGFzcygnbW92ZVVwJyk7XHJcbiAgICAgIHNsaWRlSXRlbXMuZXEobmV4dEltZ0luZGV4KS5hZGRDbGFzcygnYWN0aXZlJykuYWRkQ2xhc3MoJ21vdmVVcCcpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gc2xpZGVMZWZ0UHJldmlldyAoc2xpZGVJdGVtcyl7XHJcbiAgICAgIHZhciBuZXh0SW1nSW5kZXg7XHJcbiAgICAgIGlmIChjdXJyZW50U2xpZGVJbmRleCA9PSAwKXtcclxuICAgICAgICBuZXh0SW1nSW5kZXggPSBzbGlkZUl0ZW1zLmxlbmd0aCAtIDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgbmV4dEltZ0luZGV4ID0gY3VycmVudFNsaWRlSW5kZXggLSAxO1xyXG4gICAgICB9XHJcbiAgICAgIHNsaWRlSXRlbXMuZmlsdGVyKCcuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdtb3ZlRG93bicpO1xyXG4gICAgICBzbGlkZUl0ZW1zLmVxKG5leHRJbWdJbmRleCkuYWRkQ2xhc3MoJ2FjdGl2ZScpLmFkZENsYXNzKCdtb3ZlRG93bicpO1xyXG4gICAgfVxyXG59KVxyXG4vKlxyXG4vLyBUZXh0IGFuaW1hdGlvblxyXG4qL1xyXG5mdW5jdGlvbiBhbmltYXRlVGV4dCAobWFpbkJsb2NrLCBibG9ja1RleHQpe1xyXG4gIHZhciBibG9jayA9IG1haW5CbG9jay5maWx0ZXIoJy5wcm9qZWN0LWl0ZW1fX2FjdGl2ZScpLmZpbmQoYmxvY2tUZXh0KSxcclxuICAgICAgc3RyaW5nID0gYmxvY2sudGV4dCgpLnRyaW0oKSxcclxuICAgICAgc3RyaW5nQXJyYXkgPSBzdHJpbmcuc3BsaXQoJycpLFxyXG4gICAgICB3b3JkPSAnJyxcclxuICAgICAgYW5pbWF0aW9uU3RhdGUgPSAkLkRlZmVycmVkKCk7XHJcblxyXG4gICAgICBzdHJpbmdBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGxldHRlcil7XHJcbiAgICAgICAgaWYobGV0dGVyICE9IFwiIFwiKXtcclxuICAgICAgICAgIHZhciBsZXR0ZXJIdG1sID0gJzxzcGFuIGNsYXNzPVwibGV0dGVyLXNwYW5cIj4nICsgbGV0dGVyICsgJzwvc3Bhbj4nO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2YXIgbGV0dGVySHRtbCA9ICc8c3BhbiBjbGFzcz1cImxldHRlci1zcGFuX3NwYWNlXCI+JyArIGxldHRlciArICc8L3NwYW4+JztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdvcmQgKz0gbGV0dGVySHRtbDtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBibG9jay5odG1sKHdvcmQpXHJcbiAgICAgIFxyXG4gICAgICB2YXIgbGV0dGVyID0gYmxvY2suZmluZCgnLmxldHRlci1zcGFuJyksXHJcbiAgICAgICAgICBjb3VudGVyID0gMCxcclxuICAgICAgICAgIHRpbWVyLFxyXG4gICAgICAgICAgZHVyYXRpb24gPSA1MDAgLyBzdHJpbmdBcnJheS5sZW5ndGg7XHJcbiAgICAgIGZ1bmN0aW9uIHNob3dMZXR0ZXJzKCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50TGV0dGVyID0gbGV0dGVyLmVxKGNvdW50ZXIpO1xyXG4gICAgICAgIGN1cnJlbnRMZXR0ZXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIGNvdW50ZXIrK1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHRpbWVyICE9ICd1bmRlZmluZWQnKXtcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aW1lciA9IHNldFRpbWVvdXQoc2hvd0xldHRlcnMsIGR1cmF0aW9uKTtcclxuICAgICAgfTtcclxuICAgICAgc2hvd0xldHRlcnMoKTtcclxufVxyXG5cclxuXHJcblxyXG5cclxuLypcclxuLy8gQmx1clxyXG4qL1xyXG5cdGZ1bmN0aW9uIHNldF9ibHVyKCl7XHJcblx0XHR2YXIgc2VjdGlvbiA9ICQoXCIuZmVlZGJhY2stYmxvY2tcIiksXHJcblx0XHRcdGZvcm1fYmcgPSAkKFwiLmNvbnRhY3QtZm9ybV9fYmdcIiksXHJcblx0XHRcdGJnX29mZnNldCA9IHNlY3Rpb24ub2Zmc2V0KCkudG9wIC0gZm9ybV9iZy5vZmZzZXQoKS50b3A7XHJcblxyXG5cclxuXHRcdGZvcm1fYmcuY3NzKHtcclxuXHRcdFx0XCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIgOiBcImNlbnRlciBcIiArIGJnX29mZnNldCArIFwicHhcIlxyXG5cdFx0fSk7XHJcblxyXG5cclxuXHR9XHJcblxyXG5cdGlmKCQoXCIuZmVlZGJhY2stYmxvY2tcIikubGVuZ3RoKXtcclxuXHRcdCQod2luZG93KS5vbihcImxvYWRcIiwgZnVuY3Rpb24oKSB7XHJcblx0XHRcdHNldF9ibHVyKCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHQkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRzZXRfYmx1cigpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuICAvKlxyXG4gIEFqYXggZm9ybVxyXG4gICovXHJcblxyXG4gIGlmKCQoJyNjb250YWN0JykubGVuZ3RoKXtcclxuICAgICAgJCgnI2NvbnRhY3QnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICB2YXIgICBuYW1lID0gJCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgpLFxyXG4gICAgICAgICAgICAgICAgcmVwbHl0byA9ICQoJ2lucHV0W25hbWU9ZW1haWxdJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlVGV4dCA9ICQoJ3RleHRhcmVhW25hbWU9bWVzc2FnZV0nKS52YWwoKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly9mb3Jtc3ByZWUuaW8vc2hla2xlaW4uZGltYUBnbWFpbC5jb21cIixcclxuICAgICAgICAgICAgLy91cmw6IFwiI1wiLFxyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICAgICDQmNC80Y86IG5hbWUsXHJcbiAgICAgICAgICAgICAgICDQntGCOiByZXBseXRvLFxyXG4gICAgICAgICAgICAgICAg0KHQvtC+0LHRidC10L3QuNC1OiBtZXNzYWdlVGV4dFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICQoJy5jb250YWN0LWZvcm1fX2ZpZWxkJykuY3NzKHsnb3BhY2l0eSc6IDB9KVxyXG4gICAgICAgICAgICAgICAkKCcuYWpheGxvYWRlcicpLmFkZENsYXNzKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKCcuYWpheGxvYWRlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKSAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgJCgnLmNvbnRhY3RzLXdyYXBwZXInKS5hZGRDbGFzcygnYWN0aXZlIHN1Y2Nlc3MnKVxyXG4gICAgICAgICAgICAkKCcuY29udGFjdHMtd3JhcHBlcl9fdGV4dCcpLnRleHQoJ9Ch0L7QvtCx0YnQtdC90LjQtSDQvtGC0L/RgNCw0LLQu9C10L3QvicpXHJcbiAgICAgICAgICAgIGNsZWFyRm9ybSgpXHJcbiAgICAgICAgICAgICQoJyNjb250YWN0JylbMF0ucmVzZXQoKTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJy5hamF4bG9hZGVyJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAkKCcuY29udGFjdHMtd3JhcHBlcicpLmFkZENsYXNzKCdhY3RpdmUgZmFpbCcpXHJcbiAgICAgICAgICAgICQoJy5jb250YWN0cy13cmFwcGVyX190ZXh0JykudGV4dCgn0J7RiNC40LHQutCwINC+0YLQv9GA0LDQstC60LgnKVxyXG4gICAgICAgICAgICBjbGVhckZvcm0oKSAgICAgICAgIFxyXG4gICAgICAgIH0pICAgICBcclxuICAgICAgICBmdW5jdGlvbiBjbGVhckZvcm0oKXtcclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgJCgnLmNvbnRhY3QtZm9ybV9fZmllbGQnKS5jc3MoeydvcGFjaXR5JzogMX0pXHJcbiAgICAgICAgICAgICAgICAkKCcuY29udGFjdHMtd3JhcHBlcicpLnJlbW92ZUNsYXNzKCdhY3RpdmUgc3VjY2VzcyBmYWlsJylcclxuICAgICAgICAgICAgfSwgMjAwMCk7ICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gIH1cclxuICAvKlxyXG4gIFpvb20gaW1hZ2VcclxuICAqL1xyXG4gIFx0ICAkKCcuem9vbS1pbWFnZScpLmhvdmVyKGZ1bmN0aW9uKCkge1x0ICAgIFxyXG4gICAgICAkKHRoaXMpLnNpYmxpbmdzKCcuem9vbS1pbWFnZScpLmNzcygnei1pbmRleCcsIDEwKTtcclxuICAgICAgJCh0aGlzKS5jc3MoJ3otaW5kZXgnLCA5OSk7XHJcblx0ICB9KVxyXG5cclxuXHJcbn0pKCk7IiwiaWYgKCQoJyNtYXBraXQtMzM3NCcpLmxlbmd0aCl7XHJcbiAgICBnb29nbGUubWFwcy5ldmVudC5hZGREb21MaXN0ZW5lcih3aW5kb3csICdsb2FkJywgaW5pdCk7XHJcbiAgICB2YXIgbWFwLCBtYXJrZXJzQXJyYXkgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBiaW5kSW5mb1dpbmRvdyhtYXJrZXIsIG1hcCwgbG9jYXRpb24pIHtcclxuICAgICAgICBnb29nbGUubWFwcy5ldmVudC5hZGRMaXN0ZW5lcihtYXJrZXIsICdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBmdW5jdGlvbiBjbG9zZShsb2NhdGlvbikge1xyXG4gICAgICAgICAgICAgICAgbG9jYXRpb24uaWIuY2xvc2UoKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYiA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChsb2NhdGlvbi5pbmZvV2luZG93VmlzaWJsZSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgY2xvc2UobG9jYXRpb24pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWFya2Vyc0FycmF5LmZvckVhY2goZnVuY3Rpb24obG9jLCBpbmRleCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvYy5pYiAmJiBsb2MuaWIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xvc2UobG9jKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICB2YXIgYm94VGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgYm94VGV4dC5zdHlsZS5jc3NUZXh0ID0gJ2JhY2tncm91bmQ6ICNmZmY7JztcclxuICAgICAgICAgICAgICAgIGJveFRleHQuY2xhc3NMaXN0LmFkZCgnbWQtd2hpdGVmcmFtZS0yZHAnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBidWlsZFBpZWNlcyhsb2NhdGlvbiwgZWwsIHBhcnQsIGljb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRpb25bcGFydF0gPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvY2F0aW9uLml3W3BhcnRdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaChlbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdwaG90byc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvY2F0aW9uLnBob3RvKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctcGhvdG9cIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnICsgbG9jYXRpb24ucGhvdG8gKyAnKTtcIj48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnaXctdG9vbGJhcic6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctdG9vbGJhclwiPjxoMyBjbGFzcz1cIm1kLXN1YmhlYWRcIj4nICsgbG9jYXRpb24udGl0bGUgKyAnPC9oMz48L2Rpdj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnZGl2JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2gocGFydCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ2VtYWlsJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPjxhIGhyZWY9XCJtYWlsdG86JyArIGxvY2F0aW9uLmVtYWlsICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBsb2NhdGlvbi5lbWFpbCArICc8L2E+PC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSAnd2ViJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGRpdiBjbGFzcz1cIml3LWRldGFpbHNcIj48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjojNDI4NWY0O1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxzcGFuPjxhIGhyZWY9XCInICsgbG9jYXRpb24ud2ViICsgJ1wiIHRhcmdldD1cIl9ibGFua1wiPicgKyBsb2NhdGlvbi53ZWJfZm9ybWF0dGVkICsgJzwvYT48L3NwYW4+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlICdkZXNjJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnPGxhYmVsIGNsYXNzPVwiaXctZGVzY1wiIGZvcj1cImNiX2RldGFpbHNcIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCJjYl9kZXRhaWxzXCIvPjxoMyBjbGFzcz1cIml3LXgtZGV0YWlsc1wiPkRldGFpbHM8L2gzPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgdG9nZ2xlLW9wZW4tZGV0YWlsc1wiPjxpbWcgc3JjPVwiLy9jZG4ubWFwa2l0LmlvL3YxL2ljb25zLycgKyBpY29uICsgJy5zdmdcIi8+PC9pPjxwIGNsYXNzPVwiaXcteC1kZXRhaWxzXCI+JyArIGxvY2F0aW9uLmRlc2MgKyAnPC9wPjwvbGFiZWw+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICc8ZGl2IGNsYXNzPVwiaXctZGV0YWlsc1wiPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48c3Bhbj4nICsgbG9jYXRpb25bcGFydF0gKyAnPC9zcGFuPjwvZGl2Pic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgJ29wZW5faG91cnMnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpdGVtcyA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2NhdGlvbi5vcGVuX2hvdXJzLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxvY2F0aW9uLm9wZW5faG91cnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICE9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtcyArPSAnPGxpPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbaV0uZGF5ICsgJzwvc3Ryb25nPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbaV0uaG91cnMgKyc8L3N0cm9uZz48L2xpPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSAnPGxpPjxsYWJlbCBmb3I9XCJjYl9ob3Vyc1wiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cImNiX2hvdXJzXCIvPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbMF0uZGF5ICsgJzwvc3Ryb25nPjxzdHJvbmc+JyArIGxvY2F0aW9uLm9wZW5faG91cnNbMF0uaG91cnMgKyc8L3N0cm9uZz48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zIHRvZ2dsZS1vcGVuLWhvdXJzXCI+PGltZyBzcmM9XCIvL2Nkbi5tYXBraXQuaW8vdjEvaWNvbnMva2V5Ym9hcmRfYXJyb3dfZG93bi5zdmdcIi8+PC9pPjx1bD4nICsgaXRlbXMgKyAnPC91bD48L2xhYmVsPjwvbGk+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJzxkaXYgY2xhc3M9XCJpdy1saXN0XCI+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29ucyBmaXJzdC1tYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6IzQyODVmNDtcIj48aW1nIHNyYz1cIi8vY2RuLm1hcGtpdC5pby92MS9pY29ucy8nICsgaWNvbiArICcuc3ZnXCIvPjwvaT48dWw+JyArIGZpcnN0ICsgJzwvdWw+PC9kaXY+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJveFRleHQuaW5uZXJIVE1MID0gXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdwaG90bycsICdwaG90bycsICcnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdpdy10b29sYmFyJywgJ3RpdGxlJywgJycpICtcclxuICAgICAgICAgICAgICAgICAgICBidWlsZFBpZWNlcyhsb2NhdGlvbiwgJ2RpdicsICdhZGRyZXNzJywgJ2xvY2F0aW9uX29uJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ3dlYicsICdwdWJsaWMnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnZW1haWwnLCAnZW1haWwnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAndGVsJywgJ3Bob25lJykgK1xyXG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkUGllY2VzKGxvY2F0aW9uLCAnZGl2JywgJ2ludF90ZWwnLCAncGhvbmUnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdvcGVuX2hvdXJzJywgJ29wZW5faG91cnMnLCAnYWNjZXNzX3RpbWUnKSArXHJcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRQaWVjZXMobG9jYXRpb24sICdkaXYnLCAnZGVzYycsICdrZXlib2FyZF9hcnJvd19kb3duJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIG15T3B0aW9ucyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGlnbkJvdHRvbTogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50OiBib3hUZXh0LFxyXG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVBdXRvUGFuOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBpeGVsT2Zmc2V0OiBuZXcgZ29vZ2xlLm1hcHMuU2l6ZSgtMTQwLCAtNDApLFxyXG4gICAgICAgICAgICAgICAgICAgIHpJbmRleDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICBib3hTdHlsZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJzI4MHB4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VCb3hNYXJnaW46ICcwcHggMHB4IDBweCAwcHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGluZm9Cb3hDbGVhcmFuY2U6IG5ldyBnb29nbGUubWFwcy5TaXplKDEsIDEpLFxyXG4gICAgICAgICAgICAgICAgICAgIGlzSGlkZGVuOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgICAgICBwYW5lOiAnZmxvYXRQYW5lJyxcclxuICAgICAgICAgICAgICAgICAgICBlbmFibGVFdmVudFByb3BhZ2F0aW9uOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYiA9IG5ldyBJbmZvQm94KG15T3B0aW9ucyk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5pYi5vcGVuKG1hcCwgbWFya2VyKTtcclxuICAgICAgICAgICAgICAgIGxvY2F0aW9uLmluZm9XaW5kb3dWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICAgICAgdmFyIG1hcE9wdGlvbnMgPSB7XHJcbiAgICAgICAgICAgIGNlbnRlcjogbmV3IGdvb2dsZS5tYXBzLkxhdExuZyg1Ni4yOSw0NC4wNSksXHJcbiAgICAgICAgICAgIHpvb206IDEyLFxyXG4gICAgICAgICAgICBnZXN0dXJlSGFuZGxpbmc6ICdhdXRvJyxcclxuICAgICAgICAgICAgZnVsbHNjcmVlbkNvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICB6b29tQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIGRpc2FibGVEb3VibGVDbGlja1pvb206IGZhbHNlLFxyXG4gICAgICAgICAgICBtYXBUeXBlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjYWxlQ29udHJvbDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNjcm9sbHdoZWVsOiBmYWxzZSxcclxuICAgICAgICAgICAgc3RyZWV0Vmlld0NvbnRyb2w6IGZhbHNlLFxyXG4gICAgICAgICAgICBkcmFnZ2FibGUgOiBmYWxzZSxcclxuICAgICAgICAgICAgY2xpY2thYmxlSWNvbnM6IGZhbHNlLFxyXG4gICAgICAgICAgICBtYXBUeXBlSWQ6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5ST0FETUFQLFxyXG4gICAgICAgICAgICBzdHlsZXM6IFtcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwiYWRtaW5pc3RyYXRpdmVcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLnRleHQuZmlsbFwiLFxyXG4gICAgICAgIFwic3R5bGVyc1wiOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIFwiY29sb3JcIjogXCIjNDQ0NDQ0XCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcImxhbmRzY2FwZVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcImNvbG9yXCI6IFwiI2YyZjJmMlwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICAgIFwiZmVhdHVyZVR5cGVcIjogXCJwb2lcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJ2aXNpYmlsaXR5XCI6IFwib2ZmXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWRcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJzYXR1cmF0aW9uXCI6IC0xMDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJsaWdodG5lc3NcIjogNDVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuaGlnaHdheVwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJzaW1wbGlmaWVkXCJcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF1cclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgICAgXCJmZWF0dXJlVHlwZVwiOiBcInJvYWQuYXJ0ZXJpYWxcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwibGFiZWxzLmljb25cIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwidHJhbnNpdFwiLFxyXG4gICAgICAgIFwiZWxlbWVudFR5cGVcIjogXCJhbGxcIixcclxuICAgICAgICBcInN0eWxlcnNcIjogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvZmZcIlxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgXVxyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgICBcImZlYXR1cmVUeXBlXCI6IFwid2F0ZXJcIixcclxuICAgICAgICBcImVsZW1lbnRUeXBlXCI6IFwiYWxsXCIsXHJcbiAgICAgICAgXCJzdHlsZXJzXCI6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgXCJjb2xvclwiOiBcIiM1NjZjNzZcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBcInZpc2liaWxpdHlcIjogXCJvblwiXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdXHJcbiAgICB9XHJcbl1cclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG1hcEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFwa2l0LTMzNzQnKTtcclxuICAgICAgICB2YXIgbWFwID0gbmV3IGdvb2dsZS5tYXBzLk1hcChtYXBFbGVtZW50LCBtYXBPcHRpb25zKTtcclxuICAgICAgICB2YXIgbG9jYXRpb25zID0gW1xyXG4gICAgICAgICAgICBcclxuICAgICAgICBdO1xyXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsb2NhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbWFya2VyID0gbmV3IGdvb2dsZS5tYXBzLk1hcmtlcih7XHJcbiAgICAgICAgICAgICAgICBpY29uOiBsb2NhdGlvbnNbaV0ubWFya2VyLFxyXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBnb29nbGUubWFwcy5MYXRMbmcobG9jYXRpb25zW2ldLmxhdCwgbG9jYXRpb25zW2ldLmxuZyksXHJcbiAgICAgICAgICAgICAgICBtYXA6IG1hcCxcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBsb2NhdGlvbnNbaV0udGl0bGUsXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBsb2NhdGlvbnNbaV0uYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgIGRlc2M6IGxvY2F0aW9uc1tpXS5kZXNjLFxyXG4gICAgICAgICAgICAgICAgdGVsOiBsb2NhdGlvbnNbaV0udGVsLFxyXG4gICAgICAgICAgICAgICAgaW50X3RlbDogbG9jYXRpb25zW2ldLmludF90ZWwsXHJcbiAgICAgICAgICAgICAgICB2aWNpbml0eTogbG9jYXRpb25zW2ldLnZpY2luaXR5LFxyXG4gICAgICAgICAgICAgICAgb3BlbjogbG9jYXRpb25zW2ldLm9wZW4sXHJcbiAgICAgICAgICAgICAgICBvcGVuX2hvdXJzOiBsb2NhdGlvbnNbaV0ub3Blbl9ob3VycyxcclxuICAgICAgICAgICAgICAgIHBob3RvOiBsb2NhdGlvbnNbaV0ucGhvdG8sXHJcbiAgICAgICAgICAgICAgICB0aW1lOiBsb2NhdGlvbnNbaV0udGltZSxcclxuICAgICAgICAgICAgICAgIGVtYWlsOiBsb2NhdGlvbnNbaV0uZW1haWwsXHJcbiAgICAgICAgICAgICAgICB3ZWI6IGxvY2F0aW9uc1tpXS53ZWIsXHJcbiAgICAgICAgICAgICAgICBpdzogbG9jYXRpb25zW2ldLml3XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBtYXJrZXJzQXJyYXkucHVzaChtYXJrZXIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGxvY2F0aW9uc1tpXS5pdy5lbmFibGUgPT09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgYmluZEluZm9XaW5kb3cobWFya2VyLCBtYXAsIGxvY2F0aW9uc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgfSJdfQ==
