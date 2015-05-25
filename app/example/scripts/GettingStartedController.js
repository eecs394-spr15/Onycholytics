
angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {

	var options = {
	  quality: 50,
	  allowEdit: false,
	  targetWidth: 300,
	  targetHeight: 300,
	  encodingType: "png",
	  saveToPhotoAlbum: false,
	  destinationType: "dataURL",
      cameraDirection: "back",
	};


	$scope.takePhoto = function() {
		supersonic.media.camera.takePicture(options).then( function(result){
			localStorage.imageURL = result;
  	 		supersonic.ui.modal.show("camera#image");
		});
	}	

	   

  });
