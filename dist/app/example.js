angular.module('example', [
  // Declare here all AngularJS dependencies that are shared by the example module.
  'supersonic'
]);


angular
  .module('example')
  .controller('GettingStartedController', function($scope, supersonic) {

	var options = {
	  quality: 100,
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

	$scope.logOut = function() {
      supersonic.ui.initialView.show();
    };
 

	   

  });

angular
  .module('example')
  .controller('LearnMoreController', function($scope, supersonic) {

    $scope.navbarTitle = "Learn More";

  });

angular
  .module('example')
  .controller('SettingsController', function($scope, supersonic) {
    $scope.navbarTitle = "Settings";
  });
