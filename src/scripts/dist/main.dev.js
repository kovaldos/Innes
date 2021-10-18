"use strict";

$(document).ready(function () {
  /*Def скрипты*/
  if (document.title == 'Главная') {
    $(document).find('.header').addClass('white');
    $('.breadcrumbs').hide();
  }

  if (document.title == 'Карта сайта') {
    $('.header, .footer, .breadcrumbs').hide();
  }

  if (document.title == 'О компании') {
    $('.breadcrumbs').hide();
  }

  if (document.title == 'Регистрация') {
    $('.breadcrumbs').hide();
  }

  if (document.title == 'Вход') {
    $('.breadcrumbs').hide();
  }

  if (document.title == 'Текстовая страница') {
    $('.breadcrumbs').hide();
  }
  /*Def скрипты Конец*/


  var lazyLoadInstance = new LazyLoad({
    elements_selector: ".lazy"
  });
  $(document).find('.main-banner-slider').slick({
    lazyLoad: 'ondemand',
    draggable: false,
    swipe: false,
    arrows: false,
    fade: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000
  });

  if (document.documentElement.clientWidth < 768) {
    $(document).find('.main-blogslider-slider.slick-initialized').slick('unslick');
  } else {
    $(document).find('.main-blogslider-slider').slick({
      variableWidth: true,
      infinite: false
    });
  }

  $(document).find('.good-content-col-slider').slick({
    lazyLoad: 'ondemand',
    arrows: false,
    fade: true,
    draggable: false,
    swipe: false
  });
  $(document).find('.good-content-col-thumbs').slick({
    lazyLoad: 'ondemand',
    arrows: false,
    vertical: false,
    verticalSwiping: false,
    slidesToShow: 4,
    centerMode: false,
    initialSlide: 1,
    variableWidth: true,
    focusOnSelect: true,
    asNavFor: '.good-content-col-slider',
    responsive: [{
      breakpoint: 1024,
      settings: {
        vertical: false,
        verticalSwiping: false,
        slidesToShow: 3,
        variableWidth: true
      }
    }, {
      breakpoint: 768,
      settings: {
        vertical: false,
        verticalSwiping: false,
        slidesToShow: 2,
        variableWidth: true,
        lazyLoad: 'progressive'
      }
    }]
  });
  $('.bar').knob({
    'min': 0,
    'max': 5,
    'step': 0.1,
    'readOnly': true
  });
  $(document).find('.good-reviews-row-slider').slick({
    lazyLoad: 'ondemand',
    adaptiveHeight: true,
    responsive: [{
      breakpoint: 768,
      settings: {
        lazyLoad: 'progressive'
      }
    }]
  });

  if (document.documentElement.clientWidth < 768) {
    $(document).find('.about-clients-slider.slick-initialized').slick('unslick');
  } else {
    $(document).find('.about-clients-slider').slick({
      lazyLoad: 'ondemand',
      slidesToShow: 3,
      responsive: [{
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      }]
    });
  }

  if (document.documentElement.clientWidth < 768) {
    $(document).find('.about-clients-slider.slick-initialized').slick('unslick');
  } else {
    $(document).find('.about-clients-items').slick({
      lazyLoad: 'ondemand',
      slidesToShow: 4
    });
  }

  $(document).find('.catalog-main-filter-col').each(function (params) {
    var filterBlockOption = $(this).find('.catalog-main-filter-col-items-item'),
        blockHeight = 0;

    if (filterBlockOption.length > 9) {
      for (var _i = 0; _i < 9; _i++) {
        blockHeight += filterBlockOption.eq(_i).innerHeight();
      }

      blockHeight += 72;
      $(this).find('.catalog-main-filter-col-items').addClass('scroll');
      $(this).find('.catalog-main-filter-col-items-wrap').css('max-height', blockHeight);
    }

    if (document.documentElement.clientWidth < 1024) {
      setTimeout(function () {
        $('.catalog-main-filter').css('opacity', '1').removeClass('active');
        $('.catalog-main-filter-col-items').hide();
      }, 500);
    }
  });
  $(document).find('.catalog-main-filter-col-items__range').each(function (index) {
    var $range = $(this),
        $inputFrom = $(this).closest('.range-wrap').find('.range-from'),
        $inputTo = $(this).closest('.range-wrap').find('.range-to'),
        instance,
        min = $(this).data('min'),
        max = $(this).data('max'),
        from = 0,
        to = 0;
    $range.ionRangeSlider({
      skin: "big",
      type: "double",
      hide_min_max: true,
      hide_from_to: true,
      extra_classes: 'filter-range',
      onStart: updateInputs,
      onChange: updateInputs,
      onFinish: updateInputs
    });
    instance = $range.data("ionRangeSlider");

    function updateInputs(data) {
      from = data.from;
      to = data.to;
      $inputFrom.prop("value", from);
      $inputTo.prop("value", to);
    }

    $inputFrom.on("change", function () {
      var val = $(this).prop("value");

      if (val < min) {
        val = min;
      } else if (val > to) {
        val = to;
      }

      instance.update({
        from: val
      });
      $(this).prop("value", val);
    });
    $inputTo.on("change", function () {
      var val = $(this).prop("value");

      if (val < from) {
        val = from;
      } else if (val > max) {
        val = max;
      }

      instance.update({
        to: val
      });
      $(this).prop("value", val);
    });
  });
  /*Ограничение ввода в поле на странице товара*/

  var x = document.getElementsByName("range-input");

  for (i = 0; i < x.length; i++) {
    x[i].onkeypress = function (e) {
      e = e || event;
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      var chr = getChar(e); // с null надо осторожно в неравенствах,
      // т.к. например null >= '0' => true
      // на всякий случай лучше вынести проверку chr == null отдельно

      if (chr == null) return;

      if (chr < '0' || chr > '9') {
        return false;
      }
    };
  }

  function getChar(event) {
    if (event.which == null) {
      if (event.keyCode < 32) return null;
      return String.fromCharCode(event.keyCode); // IE
    }

    if (event.which != 0 && event.charCode != 0) {
      if (event.which < 32) return null;
      return String.fromCharCode(event.which); // остальные
    }

    return null; // специальная клавиша
  }
  /*Ограничения ввода в поле на странице товара конец*/

});
/*Табы*/

$(document).on('click', '.tabs-navigation-item', function (e) {
  // e.preventDefault();
  var tabContainers = $(this).closest('.tabs').find('.tabs-tab');
  tabContainers.hide();
  tabContainers.filter(this.hash).show();
  $(this).closest('.tabs').find('.tabs-navigation-item').removeClass('active');
  $(this).addClass('active');
});
/*Табы Конец*/

/*Избранное*/

$(document).on('click', '.good-content-col-row__fav, .basket-content-goods-item-btns__fav', function (e) {
  $(this).toggleClass('active');
});
/*Избранное Конец*/

/*Разворачивающиеся блоки (FAQ)*/

$(document).on('click', '.help-main-content-slide__title', function (e) {
  $(this).toggleClass('active');
  $(this).next().slideToggle();
});
/*Разворачивающиеся блоки (FAQ) Конец*/

/*Поле "Пароль"*/

$(document).on('click', '.login-auth__input[data-type="pass"] span', function (e) {
  if ($(this).prev().attr('type') == 'password') {
    $(this).prev().attr('type', 'text');
  } else {
    $(this).prev().attr('type', 'password');
  }
});
/*Поле "Пароль" Конец*/

/*Меню*/

var menuFlag = false;
$(document).on('click', '.icon-burger', function (e) {
  if (!$(this).hasClass('active')) {
    $('.overlay').fadeOut('fast');
    $('.overlay').fadeIn('fast');
  } else {
    $('.overlay').fadeOut('fast');
  }

  if ($('#header-popup-search').hasClass('active') && searchFlag == true) {
    $('header').addClass('white');
  }

  $('.icon-search').removeClass('active');
  $('#header-popup-search').removeClass('active');
  $(this).toggleClass('active');

  if ($('header').hasClass('white')) {
    $('header').removeClass('white');
    menuFlag = true;
  }

  if ($('#header-popup-menu').hasClass('active') && menuFlag == true) {
    $('header').addClass('white');
  }

  $('#header-popup-menu').toggleClass('active');
});
/*Меню Конец*/

/*Поиск*/

var searchFlag = false;
$(document).on('click', '.icon-search', function (e) {
  if (!$(this).hasClass('active')) {
    $('.overlay').fadeOut('fast');
    $('.overlay').fadeIn('fast');
  } else {
    $('.overlay').fadeOut('fast');
  }

  if ($('#header-popup-menu').hasClass('active') && menuFlag == true) {
    $('header').addClass('white');
  }

  $('.icon-burger').removeClass('active');
  $('#header-popup-menu').removeClass('active');
  $(this).toggleClass('active');

  if ($('header').hasClass('white')) {
    $('header').removeClass('white');
    searchFlag = true;
  }

  if ($('#header-popup-search').hasClass('active') && searchFlag == true) {
    $('header').addClass('white');
  }

  $('#header-popup-search').toggleClass('active');
});
/*Поиск Конец*/

$(document).on('click touchstart', '.overlay', function (e) {
  $('.icon-burger, .icon-search').removeClass('active');
  $('#header-popup-search, #header-popup-menu').removeClass('active');
  $('.overlay').fadeOut('fast');

  if (searchFlag == true || menuFlag == true) {
    $('header').addClass('white');
  }
});
/*Хедер Меню*/

$(document).on('click', '.header-popup-col-menu-col__title', function (e) {
  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
    $(this).next().slideUp();
  } else {
    $('.header-popup-col-menu-col-items').slideUp();
    $('.header-popup-col-menu-col__title').removeClass('active');
    $(this).addClass('active');
    $(this).next().slideDown();
  }
});
/*Хедер Меню Конец*/

/*Сортировка*/

$(document).on('click', '.catalog-top-sort__title', function (e) {
  $(this).toggleClass('active');
  $(this).next().toggleClass('active');
});
$(document).on('click', '.catalog-top-sort__options span', function (e) {
  $('.catalog-top-sort__options span').removeClass('active');
  $(this).toggleClass('active');
  $('.catalog-top-sort__options').removeClass('active');
  $('.catalog-top-sort__title').html($(this).html()).removeClass('active');
});
$(document).on('click touchstart', function (e) {
  if (!$('.catalog-top-sort__options').is(e.target) && $('.catalog-top-sort__options').has(e.target).length === 0 && !$('.catalog-top-sort__title').is(e.target) && $('.catalog-top-sort__title').has(e.target).length === 0) {
    $('.catalog-top-sort__options').removeClass('active');
    $('.catalog-top-sort__title').removeClass('active');
  }
});
/*Сортировка Конец*/

/*Фильтры и Сортировка на мобиле*/

$(document).on('click', '.catalog-top-btns__btn', function (e) {
  $('.catalog-top-mobilesort, .catalog-main-filter').removeClass('active');

  if ($(this).hasClass('active')) {
    $(this).removeClass('active');
  } else {
    $('.catalog-top-btns__btn').removeClass('active');
    $(this).addClass('active');

    if ($(this).data('type') == 'filter') {
      $('.catalog-main-filter').toggleClass('active');
      var offsetTopBtns = $('.catalog-top-btns').offset().top + $('.catalog-top-btns').height();
      $('.catalog-main-filter').css('top', offsetTopBtns);
    } else if ($(this).data('type') == 'sort') {
      $('.catalog-top-mobilesort').toggleClass('active');
    }
  }
});
$(document).on('click', '.catalog-top-mobilesort-btns__cancel, .catalog-top-mobilesort-btns__show', function (e) {
  $('.catalog-top-mobilesort, .catalog-main-filter').removeClass('active');
  $('.catalog-top-btns__btn').removeClass('active');
});
$(document).on('click', '.catalog-top-mobilesort-category__title, .catalog-main-filter-col__title', function (e) {
  $(this).toggleClass('active');
  $(this).next().slideToggle();
});
/*Фильтры и Сортировка на мобиле Конец*/

/* Ковер лого Начало */

var headerLogo = document.querySelector('.logo-box');
var headerMenuLinks = document.querySelectorAll('.header__link');

var onMenuMouseOver = function onMenuMouseOver(_ref) {
  var target = _ref.target;
  target.classList.add('show-cover');
  console.log(target);
};

var onMenuMouseOut = function onMenuMouseOut(_ref2) {
  var target = _ref2.target;
  target.classList.remove('show-cover');
};

headerMenuLinks.forEach(function (link) {
  link.addEventListener('mouseenter', onMenuMouseOver);
  link.addEventListener('mouseleave', onMenuMouseOut);
});
headerLogo.addEventListener('mouseenter', onMenuMouseOver);
headerLogo.addEventListener('mouseleave', onMenuMouseOut);
/* Ковер лого Конец */

/*Рэйтинг Начало*/

var ratings = document.querySelectorAll('.rating');

if (ratings.length > 0) {
  initRatings();
} // Main function Главная функция


function initRatings() {
  var ratingActive, ratingValue;

  for (var index = 0; index < ratings.length; index++) {
    var rating = ratings[index];
    initRating(rating);
  } // init current rating Инициализация конкретного рейтинга


  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();

    if (rating.classList.contains('rating_set')) {
      setRating(rating);
    }
  } // init vars Инициализация переменных


  function initRatingVars(rating) {
    ratingActive = rating.querySelector('.rating__active');
    ratingValue = rating.querySelector('.rating__value');
  } // take an active stars width Измерение ширины активных звезд


  function setRatingActiveWidth() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ratingValue.innerHTML;
    var ratingActiveWidth = index / 0.05;
    ratingActive.style.width = "".concat(ratingActiveWidth, "%");
  } // ability to rate Возможность устанавливать рэйтинг


  function setRating(rating) {
    var ratingItems = rating.querySelectorAll('.rating__item');

    var _loop = function _loop(_index) {
      var ratingItem = ratingItems[_index];
      ratingItem.addEventListener("mouseenter", function (e) {
        // updating vars обновление переменных
        initRatingVars(rating); // updating active stars обновление активных звезд

        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", function (e) {
        // updating active stars обновление активных звезд
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", function (e) {
        // updating vars обновление переменных
        initRatingVars(rating); //if (rating.dataset.ajax) {
        // "send to" server "Отправить" на сервер
        //	setRatingValue(ratingItem.value, rating);
        //} else {
        // show current rate Отобразить указанную оценку

        ratingValue.innerHTML = _index + 1;
        setRatingActiveWidth(); //}
      });
    };

    for (var _index = 0; _index < ratingItems.length; _index++) {
      _loop(_index);
    }
  }
}
/*Рэйтинг Конец*/