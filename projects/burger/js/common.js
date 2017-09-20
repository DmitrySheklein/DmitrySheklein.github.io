$(function() {
	// Custom JS
	$("#fullpage").fullpage({
		responsiveWidth: 768,
		responsiveHeight: 740,
		verticalCentered: false,
		onLeave: function(index,nextIndex,direction){
			$('.fixed-menu .fixed-menu__item').eq(nextIndex - 1).addClass('active').siblings().removeClass('active')
		}
	})
	if($(window).width() < 480) {
		// $.fn.fullpage.setResponsive(true);
		$.fn.fullpage.destroy('all');
	}
	// Arrow down
	$('.arrow-down').on('click', function(e) {
		e.preventDefault();
		$.fn.fullpage.moveSectionDown();
	});
	//Humburger
	$('.hamburger').on('click',function(){
		$(this).toggleClass('active').parent().find('.nav').toggleClass('active');		
	})
	// Fixed menu
	$('.fixed-menu .fixed-menu__link').on('click', function(e){
		e.preventDefault()
		var $this = $(this),
			href = parseInt($this.attr('href'))
			console.log(href)
		$this.closest('li').addClass('active').siblings().removeClass('active')
		$.fn.fullpage.moveTo(href);
	})
	// Slider
 	$('.slider__wrapper').owlCarousel({
		dots : false,
		nav:false,
		slideSpeed : 800,
		paginationSpeed : 400,
		singleItem: true,
		items: 1
	})
	var slider = $('.slider__wrapper');
	$('.slider__arrow--left').on('click', function(e) {
		e.preventDefault();
		slider.trigger('prev.owl.carousel');
	});	
	$('.slider__arrow--right').on('click', function(e) {
		e.preventDefault();
		slider.trigger('next.owl.carousel');
	});	
	//Best
	$('.best__list').owlCarousel({
		loop:true,
		margin:10,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
				nav:false,
				mouseDrag: true,
				touchDrag: true,
				pullDrag: true,				
			},
			600:{
				items:1,
				nav:false,
				dots: true
			},
			1000:{
				items:3,
				nav:true,
				mouseDrag: false,
				touchDrag: false,
				pullDrag: false,
				loop:false
			}
		}		
	})
	//Accordeon vertical
	$('.team__accord .team__accord-link').on('click', function(e){
		e.preventDefault()
		var $this = $(this),
			content = $this.next();
		$('.team__accord .team__accord-info:visible').not(content).slideUp(300)
		$('.team__accord .team__accord-link').not($this).removeClass('active')
		$this.toggleClass('active')
		content.slideToggle(300)
	})
	//Accordeon gorizontal
	$('.menu-accord .menu-accord__link').on('click', function(e){
		e.preventDefault()
		var $this = $(this),
			item = $this.closest('.menu-accord__item');
		if(!item.hasClass('active')){
			item.addClass('active')
			.siblings()
			.removeClass('active')
		} else {
			item.removeClass('active')
		}
	})
	$(document).on('click', function(event) {
	var menu = $(event.target).closest('.menu-accord'),
		items = $('.menu-accord__item');

	if (!menu.length) {
		console.log(1)
		items.removeClass('is-active');
	}
	});	
	//Input mask
	$('input[type=tel]').inputmask("+7 (999) 999 99 99");
	//Map
	ymaps.ready(init);
	var myMap,
		myPlacemark;

	function init(){
		myMap = new ymaps.Map("map", {
		center: [59.938183,30.333675],
		zoom: 12,
		controls: ['zoomControl']
		});

		var coords = [
			[59.929482,30.305350],
			[59.899148,30.283673],
			[59.921218,30.452244],
			[59.964272,30.304320]
		],
			myCollection = new ymaps.GeoObjectCollection();
		// или myCollection = new ymaps.GeoObjectArray(...);

		for (var i = 0; i < coords.length; i++) {
		myCollection.add(new ymaps.Placemark(coords[i], {}, {
			iconLayout: 'default#image',
			iconImageHref: 'img/icons/map-marker.svg',
			iconImageSize: [46, 58]
		}));
		}

		myMap.geoObjects.add(myCollection);

		myMap.behaviors.disable('scrollZoom');
	}	


});
$(window).on('load', function(){
	$('.preloader').delay(10).fadeOut('slow');
  })