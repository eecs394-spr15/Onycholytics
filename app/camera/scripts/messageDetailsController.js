angular
  .module('camera')
  .controller("messageDetailsController", function ($scope, Usertable, Usermessage, Coormessage, supersonic) {
    $scope.message = null;
    $scope.dataId = undefined;
    $scope.userType = null;


   var _refreshViewData = function () {
    if ($scope.userType == "true") {
        Usermessage.find($scope.dataId).then( function (message) {
            $scope.$apply( function () {
              $scope.message = message;
            });
        });
      } else {
        Coormessage.find($scope.dataId).then( function (message) {
            $scope.$apply( function () {
              $scope.message = message;
            });
        });
      }
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });
    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.xid;
      $scope.userType = values.zid;
      _refreshViewData();
    });  

});