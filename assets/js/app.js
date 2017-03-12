"use strict";

var messages = Array.from(document.querySelectorAll('.messages li'));
var viewportHeight = window.innerHeight;

var showHideMessage = function showHideMessage(scrollPosition) {
  console.log("function ran");
  console.log(scrollPosition);
  console.log(messages);
  for (var i = 0; i < messages.length; i++) {
    console.log("in for loop" + i);
    if (messages[i].offsetTop <= scrollPosition) {
      messages[i].classList.add('js-message');
    } else {
      messages[i].classList.remove('js-message');
    }
  }
};

window.addEventListener('scroll', function (e) {
  var last_known_scroll_position = window.scrollY + (viewportHeight - 100);
  showHideMessage(last_known_scroll_position);
  console.log(last_known_scroll_position);
});
