angular
  .module('camera')
  .controller("ImageController", function ($scope, Progresstable, supersonic) {

    var draggable = document.getElementById('draggable');
    var template = document.getElementById('template');
    draggable.addEventListener('touchmove', function(event) {
        var touch = event.targetTouches[0];
        var top = 310;
    // Place element where the finger is
        draggable.style.left = touch.pageX-100 + 'px';
        if (touch.pageY+20 > top)
            draggable.style.top = top + 'px';
        else
            draggable.style.top = touch.pageY+20 + 'px';
        
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
        //template.style.left = 200;
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