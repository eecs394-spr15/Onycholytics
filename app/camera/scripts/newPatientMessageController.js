angular
  .module('camera')
  .controller("newPatientMessageController", function ($scope, Usertable, Usermessage, Coormessage, supersonic) {
  	$scope.message = {};


  	$scope.submitForm = function () {
      //store info in parse

      $scope.message['message'] = {};
      $scope.message['message']['title'] = document.getElementById("messageTitle").value;
      $scope.message['message']['text'] = document.getElementById("messageBody").value;
      $scope.message['patientID'] = "tQ9kOyUEJE";
      $scope.message['coorID'] = "oG0991GOPA";

      newusermessage = new Coormessage($scope.message);

        
      newusermessage.save().then( function () {
          // update the information for this user
        document.getElementById("newMessageForm").reset();
        supersonic.ui.modal.hide();
          
      });
     
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }


});