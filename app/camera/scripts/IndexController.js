angular
  .module('camera')
  .controller('IndexController', function($scope, supersonic) {
    var options = {
	  quality: 50,
	  targetWidth: 300,
	  targetHeight: 300,
	  saveToPhotoAlbum: true
	};
	
	$scope.takePhoto = function() {
		supersonic.media.camera.takePicture(options).then( function(result){
  		// Do something with the image URI
  		alert(result);
		});
	}
	
  });
