angular
  .module('camera')
  .controller("messageController", function ($scope, Usertable, Usermessage, Coormessage, supersonic) {

    $scope.messages= null;    
    $scope.userType = null;

    Usertable.find(localStorage.objectId).then( function(row) {
        $scope.$apply( function () {
            $scope.userType = row["isPatient"];
        }); 
    });    


    Usermessage.all().whenChanged( function (usermessages) {
        $scope.$apply( function () {
            if($scope.userType == true){
               $scope.messages = usermessages; 
            }
        });       
    });
       
    Coormessage.all().whenChanged( function (usermessages) {
        $scope.$apply( function () {
            if($scope.userType != null && $scope.userType == false){
                $scope.messages = usermessages;
            }
        });        
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