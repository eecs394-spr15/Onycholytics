angular
  .module('progresstable')
  .controller("IndexController", function ($scope, Progresstable, supersonic) {
    $scope.progresstables = null;
    $scope.showSpinner = true;

    Progresstable.all().whenChanged( function (progresstables) {
        $scope.$apply( function () {
          $scope.progresstables = progresstables;
          $scope.showSpinner = false;
        });
    });
  });