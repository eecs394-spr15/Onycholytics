angular
  .module('camera')
  .controller("ImageController", function ($scope, Progresstable, supersonic) {

    var draggable = document.getElementById('draggable');
    draggable.addEventListener('touchmove', function(event) {
        var touch = event.targetTouches[0];
 
    // Place element where the finger is
        draggable.style.left = touch.pageX-25 + 'px';
        draggable.style.top = touch.pageY-25 + 'px';
        draggable.width = currentWidth*1.2; 
        draggable.height = currentHeight*1.2; 
        event.preventDefault();
    }, false);
    $scope.zoomIn = function() {
        document.myImage.width = currentWidth*1.2; 
        document.myImage.height = currentHeight*1.2; 
        zoomLevel = zoomLevel + 1; 
        update(); 
    }
    $scope.zoomOut=function(){ 
        document.myImage.width = currentWidth/1.2; 
        document.myImage.height = currentHeight/1.2; 
        zoomLevel = zoomLevel - 1; 
        update(); 
    } 
    $scope.resetImage=function(){ 
        document.myImage.width = originalWidth; 
        document.myImage.height = originalHeight; 
        zoomLevel = 0; 
        update(); 
    } 
   $scope.initial=function(){ 
        currentWidth = document.myImage.width; 
        currentHeight = document.myImage.height; 
        originalWidth = currentWidth; 
        originalHeight = currentHeight; 
        update(); 
    }
    $scope.update=function(){ 
        currentWidth = document.myImage.width; 
        currentHeight = document.myImage.height; 
        zoomsize.innerText = zoomLevel; 
        imgsize.innerText = currentWidth + "X" + currentHeight; 
    }
});