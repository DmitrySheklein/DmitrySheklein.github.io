ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [56.320592, 44.032657],
            zoom: 18,
            controls: []
        }, {
            searchControlProvider: 'yandex#search'
        }),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'ул. М. Горького, д. 195',
            balloonContent: 'улица Максима Горького, 195'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/mark.png',
            // Размеры метки.
            iconImageSize: [50, 72],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-3, -42]
        });

    myMap.geoObjects.add(myPlacemark);
});
