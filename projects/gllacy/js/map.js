ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [59.938631, 30.32311],
            zoom: 17,
            controls: ['zoomControl']
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Мы находимся здесь',
            balloonContent: 'ул. Большая Конюшенная 19/8, Санкт-Петербург'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/pin.png',
            // Размеры метки.
            iconImageSize: [210, 130],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-30, -130]
        });
    myMap.behaviors.disable(['scrollZoom', 'rightMouseButtonMagnifier']);
    myMap.geoObjects
        .add(myPlacemark);
});