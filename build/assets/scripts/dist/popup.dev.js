"use strict";

// popup show and hide
var popupLinks = document.querySelectorAll('.promotions__popup-link');
console.log(popupLinks);
var body = document.querySelector('body');
var lockPadding = document.querySelectorAll('.lock-padding');
var unlock = true;
var timeout = 800;

if (popupLinks && body && lockPadding && unlock && timeout) {
  (function () {
    var popupOpen = function popupOpen(currentPopup) {
      if (currentPopup && unlock) {
        var popupActive = document.querySelector('.promotions__popup._active');

        if (popupActive) {
          popupClose(popupActive, false);
        } else {
          bodyLock();
        }

        currentPopup.classList.add('_active');
        currentPopup.addEventListener("click", function (e) {
          if (!e.target.closest('.promotions__popup-content')) {
            popupClose(e.target.closest('.promotions__popup'));
          }
        });
      }
    };

    var popupClose = function popupClose(popupActive) {
      var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      if (unlock) {
        popupActive.classList.remove('_active');

        if (doUnlock) {
          bodyUnlock();
        }
      }
    };

    var bodyLock = function bodyLock() {
      var lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

      if (lockPadding.length > 0) {
        for (var _index2 = 0; _index2 < lockPadding.length; _index2++) {
          var el = lockPadding[_index2];
          el.style.paddingRight = lockPaddingValue;
        }
      }

      body.style.paddingRight = lockPaddingValue;
      body.classList.add('_lock');
      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, timeout);
    };

    var bodyUnlock = function bodyUnlock() {
      setTimeout(function () {
        if (lockPadding.length > 0) {
          for (var _index3 = 0; _index3 < lockPadding.length; _index3++) {
            var el = lockPadding[_index3];
            el.style.paddingRight = '0px';
          }
        }

        body.style.paddingRight = '0px';
        body.classList.remove('_lock');
      }, timeout);
      unlock = false;
      setTimeout(function () {
        unlock = true;
      }, timeout);
    };

    if (popupLinks.length > 0) {
      var _loop = function _loop(index) {
        var popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
          var popupName = popupLink.getAttribute('href').replace('#', '');
          var currentPopup = document.getElementById(popupName);
          popupOpen(currentPopup);
          e.preventDefault;
        });
      };

      for (var index = 0; index < popupLinks.length; index++) {
        _loop(index);
      }
    }

    ;
    var popupCloseIcon = document.querySelectorAll('.close-popup');

    if (popupCloseIcon.length > 0) {
      var _loop2 = function _loop2(_index) {
        var el = popupCloseIcon[_index];
        el.addEventListener("click", function (e) {
          e.preventDefault;
          popupClose(el.closest('.promotions__popup'));
        });
      };

      for (var _index = 0; _index < popupCloseIcon.length; _index++) {
        _loop2(_index);
      }
    }

    ;
    ;
    ;
    ;
    ;
    document.addEventListener('keydown', function (e) {
      if (e.key === "Escape") {
        var popupActive = document.querySelector('.promotions__popup._active');
        popupClose(popupActive);
      }
    });
  })();
}

;