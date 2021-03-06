"use strict";

if (!Array.from) {
  Array.from = (function () {
    var toStr = Object.prototype.toString;
    var isCallable = function (fn) {
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };
    var toInteger = function (value) {
      var number = Number(value);
      if (isNaN(number)) { return 0; }
      if (number === 0 || !isFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };
    var maxSafeInteger = Math.pow(2, 53) - 1;
    var toLength = function (value) {
      var len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      var C = this;

      // 2. Let items be ToObject(arrayLike).
      var items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (arrayLike == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      var T;
      if (typeof mapFn !== 'undefined') {
        // 5. else
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (!isCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      var len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      var A = isCallable(C) ? Object(new C(len)) : new Array(len);

      // 16. Let k be 0.
      var k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      var kValue;
      while (k < len) {
        kValue = items[k];
        if (mapFn) {
          A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }
        k += 1;
      }
      // 18. Let putStatus be Put(A, "length", len, true).
      A.length = len;
      // 20. Return A.
      return A;
    };
  }());
}

// Message animation code below.

var messages = Array.from(document.querySelectorAll('.messages li'));
var viewportHeight = window.innerHeight;

var showHideMessage = function showHideMessage(scrollPosition) {
  for (var i = 0; i < messages.length; i++) {
    if (messages[i].offsetTop <= scrollPosition) {
      messages[i].classList.add('js-message');
    } else {
      messages[i].classList.remove('js-message');
    }
  }
};

showHideMessage(window.pageYOffset + (viewportHeight - 100));

window.addEventListener('scroll', function (e) {
  // changed to pageYOffset from scrollY due to incompatibility with IE
  var last_known_scroll_position = window.pageYOffset + (viewportHeight - 100);
  showHideMessage(last_known_scroll_position);
  //console.log(last_known_scroll_position);
});

// Menu toggle below

var menuClosed = true;

document.getElementById("mobile-menu").addEventListener("click", function() {
  var mobileMenu = document.getElementById('mobile-nav');
  if (menuClosed) {
    mobileMenu.classList.add('open');
    menuClosed = false;
  } else {
    mobileMenu.classList.remove('open');
    menuClosed = true;
  }
  console.log("menu clicked");
});

// Apentu card height

// var featureCards = Array.from(document.querySelectorAll('.apentu-card'));
//
// var getApentuCardMaxHeight = function() {
//   var maxHeight = 0;
//   for (var i = 0; i < featureCards.length; i++) {
//     var cardHeight = featureCards[i].offsetHeight;
//     if(cardHeight > maxHeight) {
//       maxHeight = cardHeight;
//     }
//   }
//   return maxHeight;
// }
//
// var setApentuCardHeight = function() {
//   var heightToSet = String(getApentuCardMaxHeight());
//   var heightPixels = heightToSet + "px";
//   for (var i = 0; i < featureCards.length; i++) {
//     featureCards[i].style.height = heightPixels;
//   }
// }
//
// //setApentuCardHeight();
