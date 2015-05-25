angular.module('progresstable', [
  /* Declare any module-specific dependencies here */
  'common'
]);
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
angular
  .module('progresstable')
  .constant('Progresstable', supersonic.data.model('progresstable'));
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