angular
  .module('camera')
  .controller("ImageController", function ($scope, Progresstable, supersonic) {

    var draggable = document.getElementById('draggable');
        draggable.addEventListener('touchmove', function(event) {
            var touch = event.targetTouches[0];
     
        // Place element where the finger is
            draggable.style.left = touch.pageX-25 + 'px';
            draggable.style.top = touch.pageY-25 + 'px';
            event.preventDefault();
      }, false);

});