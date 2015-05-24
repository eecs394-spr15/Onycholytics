
angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {

	var options = {
	  quality: 25,
	  allowEdit: false,
	  targetWidth: 400,
	  targetHeight: 400,
	  encodingType: "png",
	  saveToPhotoAlbum: false,
	  destinationType: "dataURL",
      cameraDirection: "back",
      correctOrientation:false
	};
		
	$scope.takePhoto = function() {
		supersonic.media.camera.takePicture(options).then( function(result){
  	 		supersonic.ui.modal.show("camera#image?photo=" + result);
		});
	}	

	   

  });
