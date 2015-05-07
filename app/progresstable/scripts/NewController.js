angular
  .module('progresstable')
  .controller("NewController", function ($scope, Progresstable, supersonic) {
    $scope.progresstable = {};

    $scope.submitForm = function () {
      $scope.showSpinner = true;
      newprogresstable = new Progresstable($scope.progresstable);
      newprogresstable.save().then( function () {
        supersonic.ui.modal.hide();
      });
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });