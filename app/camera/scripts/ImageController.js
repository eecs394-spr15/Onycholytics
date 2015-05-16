angular
  .module('camera')
  .controller("ImageController", function ($scope, Progresstable, supersonic) {

    var draggable = document.getElementById('draggable');
    var template = document.getElementById('template');
    draggable.addEventListener('touchmove', function(event) {
        var touch = event.targetTouches[0];
        var topmax = 310, topmin = 120; 
    // Place element where the finger is
        draggable.style.left = touch.pageX-100 + 'px';
        if (touch.pageY+20 < topmin)
            draggable.style.top = topmin + 'px';
        else if (touch.pageY+20 > topmax)
            draggable.style.top = topmax + 'px';
        else
            draggable.style.top = touch.pageY+20 + 'px';
        
        event.preventDefault();
    }, false);
    $scope.zoomIn = function() {
        if (document.myImage.width < screen.width && document.myImage.height < screen.height) {
            document.myImage.width = currentWidth*1.2; 
            document.myImage.height = currentHeight*1.2; 
            zoomLevel = zoomLevel + 1; 
            update(); 
        }
        else {
            alert("This does not make up for your small dick.");
        }
    }
    $scope.zoomOut=function(){ 
        if (document.myImage.width < 20 || document.myImage.height < 20) {
            alert("This is the size of your dick.")
        }
        else {
            document.myImage.width = currentWidth/1.2; 
            document.myImage.height = currentHeight/1.2; 
            zoomLevel = zoomLevel - 1; 
            update(); 
        }
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