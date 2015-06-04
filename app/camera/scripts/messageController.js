angular
  .module('camera')
  .controller("messageController", function ($scope, Usertable, Usermessage, Coormessage, supersonic) {

    $scope.messages= null;    
    $scope.userType = null;

    Usertable.find(localStorage.objectId).then( function(row) {
        $scope.$apply( function () {
            $scope.userType = row["isPatient"];
        }); 
        if ($scope.userType == true ) {
            Usermessage.all().whenChanged( function (usermessages) {
                $scope.messages = usermessages;         
            });
        } else {
                Coormessage.all().whenChanged( function (usermessages) {
                $scope.messages = usermessages;         
            });
        }
    });

    $scope.buttonTapped = function () {

        if($scope.userType == true){
            supersonic.ui.modal.show("camera#newPatientMessage");
        }
        else{
            supersonic.ui.modal.show("camera#newCoorMessage");
        }
        
    }

});