angular.module('camera', [
  // Declare any module-specific AngularJS dependencies here
  'common'
]);

angular
  .module('camera')
  .controller('IndexController', function($scope, supersonic) {
  	$scope.image = "";

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
