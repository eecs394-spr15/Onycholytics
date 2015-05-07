angular
  .module('progresstable')
  .controller("ShowController", function ($scope, Progresstable, supersonic) {
    $scope.progresstable = null;
    $scope.showSpinner = true;
    $scope.dataId = undefined;

    var _refreshViewData = function () {
      Progresstable.find($scope.dataId).then( function (progresstable) {
        $scope.$apply( function () {
          $scope.progresstable = progresstable;
          $scope.showSpinner = false;
        });
      });
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });

    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.id;
      _refreshViewData();
    });

    $scope.remove = function (id) {
      $scope.showSpinner = true;
      $scope.progresstable.delete().then( function () {
        supersonic.ui.layers.pop();
      });
    }
  });