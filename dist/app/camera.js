angular.module('camera', [
  // Declare any module-specific AngularJS dependencies here
  'common'
]);

angular
  .module('camera')
  .controller("ImageController", function ($scope, Progresstable, supersonic) {
    var myElement = document.getElementById("draggable");
    var mc = new Hammer.Manager(myElement);
    var myElementImage = document.getElementById("dragImage");      
    $scope.zoomchange=1;
    $scope.zoom0=0;
    // create a pinch and rotate recognizer
    // these require 2 pointers
    var pinch = new Hammer.Pinch();
    //var rotate = new Hammer.Rotate();

    // we want to detect both the same time
    //pinch.recognizeWith(rotate);

    // add to the Manager
    mc.add([pinch]);


    mc.on("pinchout", function(ev) {
        document.myImage.width *= 1.1;
        document.myImage.height *= 1.1;
        //myElement.textContent += ev.scale +" ";
    });

    mc.on("pinchin", function(ev) {
        document.myImage.width /= 1.1;
        document.myImage.height /= 1.1;
        //myElement.textContent += ev.scale +" ";
    });

    $scope.showimage=false;

    if(steroids.view.params.photo){
      $scope.photo = "data:image/png;base64," + steroids.view.params.photo;
    }
    else
    {
      $scope.photo = "/images/finger.png";  
    }

    var tempLeft = 0;
    var tempTop = 0;
    //drag stuff below
    var draggable = document.getElementById('draggable');
    var template = document.getElementById('template');
    draggable.addEventListener('touchmove', function(event) {
        var touch = event.targetTouches[0];
        var topmax = 290, topmin = 120; 
        var leftmax = 20, rightmax = 330;
    // Place element where the finger is
        if (touch.pageX < leftmax)
            draggable.style.left = leftmax;
        else if (touch.pageX > rightmax)
            draggable.style.left = rightmax;
        else
            draggable.style.left = touch.pageX + 'px';
        if (touch.pageY < topmin)
            draggable.style.top = topmin + 'px';
        else if (touch.pageY > topmax)
            draggable.style.top = topmax + 'px';
        else
            draggable.style.top = touch.pageY + 'px';
        tempLeft = touch.pageX;
        tempTop = touch.pageY;
        event.preventDefault();
    }, false);

    //old version of zoomin and zoomout 
    $scope.zoomIn = function() {
        if (document.myImage.width < screen.width && document.myImage.height < screen.height) {
            document.myImage.width = currentWidth*1.2; 
            document.myImage.height = currentHeight*1.2; 
            zoomLevel = zoomLevel + 1; 
            $scope.zoom0+=1;
            update(); 
        }
        else {
            alert("Too Big!");
        }
    }
    $scope.zoomOut=function(){ 
        
        if (document.myImage.width < 20 || document.myImage.height < 20) {
            alert("Too Small!")
        }
        else {
            document.myImage.width = currentWidth/1.2; 
            document.myImage.height = currentHeight/1.2; 
            zoomLevel = zoomLevel - 1; 
            $scope.zoom0-=1;
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
    $scope.imagechange=function(){
        var tempHeight =  150 - tempTop;
        var tempWidth = (screen.width/2) - 51 - tempLeft;
        var top = tempHeight;
        var left = tempWidth;
        var right = tempWidth + 102;
        var bottom = tempHeight + 200;
        draggable.style.clip = "rect("+top+"px "+right+"px " +bottom+"px "+left+"px)";
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        topCanvas = tempHeight;
        if (topCanvas < 0)
            topCanvas = 0;
        
        //alert(tempHeight.toString());
        leftCanvas = tempWidth;
        canvasWidth=102;
        canvasHeight=200;
        if (leftCanvas < 0)
            leftCanvas = 0;
        if ($scope.zoom0>0){
            $scope.zoomchange=1.2*$scope.zoom0;
            leftCanvas = leftCanvas*$scope.zoomchange;
            topCanvas = topCanvas*$scope.zoomchange;
            canvasWidth=102*$scope.zoomchange;
            canvasHeight=200*$scope.zoomchange;
        }
        else if ($scope.zoom0<0) {
            $scope.zoomchange=Math.pow(1.2,$scope.zoom0);
            leftCanvas = leftCanvas/$scope.zoomchange;
            topCanvas = topCanvas/$scope.zoomchange;
            canvasWidth=102/$scope.zoomchange;
            canvasHeight=200/$scope.zoomchange;
        }
        else {$scope.zoomchange=1;}
        //alert($scope.zoomchange+ ", " +$scope.originalW+","+$scope.originalH);

        var img = document.getElementById("dragImage");
        $scope.originalW=document.getElementById("dragImage").clientWidth/$scope.zoomchange;
        $scope.originalH=document.getElementById("dragImage").clientHeight/$scope.zoomchange;
        if (canvasWidth>= $scope.originalW)
        {
                leftCanvas= 0;
                topCanvas= 0;
                canvasWidth= $scope.originalW;
                canvasHeight= $scope.originalH;
                //canvasHeight= $scope.originalH;
        }
        if (canvasWidth+leftCanvas>= $scope.originalW)
        {
            canvasWidth=$scope.originalW-leftCanvas;
        }
        alert($scope.zoomchange+ ", " + leftCanvas+ ", " + topCanvas+ ", " + canvasWidth+ ", " + canvasHeight+","+$scope.originalW+","+$scope.originalH +","+document.getElementById("dragImage").width+","+document.getElementById("dragImage").height);
        //ctx.drawImage(img, leftCanvas*$scope.zoomchange, topCanvas*$scope.zoomchange, 102*$scope.zoomchange,200*$scope.zoomchange, 0, 0, 102,200);
        ctx.drawImage(img, leftCanvas, topCanvas, canvasWidth,canvasHeight, 0, 0, 102,200);
        var canvas = document.getElementById("myCanvas");
        document.getElementById("theimage").src = canvas.toDataURL();
        

    }
    

/*
    $scope.to_image=function(){
        var canvas = document.getElementById("thecanvas");
        document.getElementById("theimage").src = canvas.toDataURL();
        Canvas2Image.saveAsPNG(canvas);
    }*/


});
angular
  .module('camera')
  .controller('IndexController', function ($scope, Progresstable, supersonic) {
  	$scope.progresstable = {};
  	$scope.progresstables = null;
    $scope.photoToken=null;

    var options = {
	  quality: 100,
	  targetWidth: 300,
	  targetHeight: 300,
	  saveToPhotoAlbum: false,
	  destinationType: "dataURL"
	};

    Progresstable.all().whenChanged( function (progresstables) {
        $scope.$apply( function () {
          $scope.progresstables = progresstables;
        });
    });
	
	$scope.takePhoto = function() {
		supersonic.media.camera.takePicture(options).then( function(result){
  		// Do something with the image URI
  			$scope.progresstable['photo'] = result;
	  		newprogresstable = new Progresstable($scope.progresstable);
	     	newprogresstable.save().then( function () {
	        	alert("Photo saved");
            $scope.photoToken=result;
	      	});
		});
	
	}
	
  });

angular
  .module('camera')
  .constant('Progresstable', supersonic.data.model('progresstable'));
angular
  .module('camera')
  .controller("try", function ($scope, Progresstable,  supersonic) {

      
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
  /* $scope.initial=function(){ 
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
    } */
  });

var zoomLevel = 0; 
var currentWidth = 0; 
var currentHeight = 0; 
var originalWidth = 0; 
var originalHeight = 0; 
function initial(){ 
    currentWidth = document.myImage.width; 
    currentHeight = document.myImage.height; 
    originalWidth = currentWidth; 
    originalHeight = currentHeight; 
    update(); 
} /*
function zoomIn(){ 
    document.myImage.width = currentWidth*1.2; 
    document.myImage.height = currentHeight*1.2; 
    zoomLevel = zoomLevel + 1; 
    update(); 
} 
function zoomOut(){ 
    document.myImage.width = currentWidth/1.2; 
    document.myImage.height = currentHeight/1.2; 
    zoomLevel = zoomLevel - 1; 
    update(); 
} 
function resetImage(){ 
    document.myImage.width = originalWidth; 
    document.myImage.height = originalHeight; 
    zoomLevel = 0; 
    update(); 
} */

function update(){ 
    currentWidth = document.myImage.width; 
    currentHeight = document.myImage.height; 
    zoomsize.innerText = zoomLevel; 
    imgsize.innerText = currentWidth + "X" + currentHeight; 
} 