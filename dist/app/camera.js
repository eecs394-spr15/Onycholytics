angular.module('camera', [
  // Declare any module-specific AngularJS dependencies here
  'common'
]);

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
angular
  .module('camera')
  .controller('IndexController', function ($scope, Progresstable, supersonic) {
  	$scope.progresstable = {};
  	$scope.progresstables = null;
  	$scope.numImage = 0;
  	$scope.totalImage = 0;

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
          $scope.totalImage = progresstables.length;
        });
    });

    $scope.previousImage = function() {
    	$scope.numImage = Math.max(0, ($scope.numImage - 1)% $scope.totalImage);

    	//alert('Previous Image');

    }

    $scope.nextImage = function() {
      if($scope.numImage!=$scope.totalImage-1){
        $scope.numImage = ($scope.numImage + 1) % $scope.totalImage;
      }
    	
    	//alert('Next Image');
    }

	$scope.takePhoto = function() {
		supersonic.media.camera.takePicture(options).then( function(result){
  		// Do something with the image URI
  			$scope.progresstable['photo'] = result;
	  		newprogresstable = new Progresstable($scope.progresstable);
	     	newprogresstable.save().then( function () {
	        	alert("Photo saved");
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