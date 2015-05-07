angular
  .module('progresstable')
  .controller("EditController", function ($scope, Progresstable, supersonic) {
    $scope.progresstable = null;
    $scope.showSpinner = true;

    // Fetch an object based on id from the database
    Progresstable.find(steroids.view.params.id).then( function (progresstable) {
      $scope.$apply(function() {
        $scope.progresstable = progresstable;
        $scope.showSpinner = false;
      });
    });

    $scope.submitForm = function() {
      $scope.showSpinner = true;
      $scope.progresstable.save().then( function () {
        supersonic.ui.modal.hide();
      });
    }

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }

  });
