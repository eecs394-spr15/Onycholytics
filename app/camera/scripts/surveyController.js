angular
  .module('camera')
  .controller("surveyController", function ($scope, Progresstable, supersonic) {

	$scope.Finish = function(){
       supersonic.ui.modal.hideAll();
    }
    $scope.FinishInitial = function(){
       supersonic.ui.modal.hideAll();
    }
});