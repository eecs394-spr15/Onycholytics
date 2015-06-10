angular
  .module('camera')
  .controller("newCoorMessageController", function ($scope, Usertable, Usermessage, Coormessage, supersonic) {
  	$scope.message = {};


  	$scope.submitForm = function () {
      //store info in parse

      $scope.message['message'] = {};
      if (document.getElementById("messageTitle") == true){
      $scope.message['message']['title'] = document.getElementById("messageTitle").value;}
      if (document.getElementById("messageBody") == true){
      $scope.message['message']['text'] = document.getElementById("messageBody").value;}
      $scope.message['patientID'] = "tQ9kOyUEJE";
      $scope.message['coorID'] = "oG0991GOPA";

      newusermessage = new Usermessage($scope.message);

      if (newusermessage==true){
      newusermessage.save().then( function () {
          // update the information for this user
        document.getElementById("newMessageForm").reset();
        supersonic.ui.modal.hide();
      });
     }
    };

    $scope.cancel = function () {
      supersonic.ui.modal.hide();
    }


});