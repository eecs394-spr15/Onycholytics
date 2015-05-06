//testing
//another test
angular
  .module('camera')
  .controller('IndexController', function($scope, supersonic) {
  	$scope.image = "";
//11s
//2
    var options = {
	  quality: 50,
	  targetWidth: 300,
	  targetHeight: 300,
	  saveToPhotoAlbum: true,
	  destinationType: "dataURL"
	};
	
	$scope.takePhoto = function() {
		supersonic.media.camera.takePicture(options).then( function(result){
  		// Do something with the image URI
  		alert(result);
  		$scope.image = result;
		});
	}
	
  });
