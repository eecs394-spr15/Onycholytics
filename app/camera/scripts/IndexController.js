angular
  .module('camera')
  .controller('IndexController', function ($scope, Progresstable, Usertable, supersonic) {
  	$scope.progresstable = {};
  	$scope.progresstables = null;
    $scope.photoToken=null;
  	$scope.numImage = 0;
  	$scope.totalImage = 0;

    var options = {
	  quality: 100,
	  targetWidth: 300,
	  targetHeight: 300,
	  saveToPhotoAlbum: false,
	  destinationType: "dataURL"
	};

    Usertable.all().whenChanged( function (users) {
        // only show the image for current user
        Usertable.find(localStorage.objectId).then( function (user) {
            $scope.$apply( function () {
                //show one users' own photos
                $scope.photoArray=[];
                $scope.photeDate=[];
                // get the photo array of current user and the number of photos under current user account
                $scope.myPhotos = user['myPhotos'];
                $scope.totalImage = user['myPhotos'].length;
                for (i=0; i < $scope.myPhotos.length; i ++){
                    Progresstable.find($scope.myPhotos[i]).then( function (progresstable) {
                        $scope.photoArray.push(progresstable['photo']);
                        $scope.photeDate.push(progresstable['createdAt']);
                    });
                }
            });
        });
    });
    Progresstable.all().whenChanged(function(progresstables){                          
    });
    $scope.previousImage = function() {
    	$scope.numImage = Math.max(0, ($scope.numImage - 1)% $scope.totalImage);
    }

    $scope.nextImage = function() {
      if($scope.numImage!=$scope.totalImage-1){
        $scope.numImage = ($scope.numImage + 1) % $scope.totalImage;
      }
    }    	
  });
