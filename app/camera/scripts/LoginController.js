angular
  .module('camera')
  .controller("LoginController", function ($scope, Usertable, supersonic) {
    $scope.logg = true;
    $scope.hello = "Taxi";
    $scope.userdata = {};
    $scope.userdatas = {};    

    
    Usertable.all().whenChanged( function (userdatas) {
         $scope.userdatas = userdatas;         
    });

    $scope.loginButton1 = "Patient Login";
    $scope.loginButton2 = "Coordinator Login";

    $scope.clickLogin1 = function() {
      $scope.flag = false;
      $scope.username = "patient";
      $scope.password = "patient";
      if ($scope.userdatas[0].username == $scope.username)
        $scope.flag = true
      for (i = 0; i < $scope.userdatas.length; i++){
        if ($scope.username != "" && $scope.password != "" && $scope.userdatas[i].username == $scope.username && $scope.userdatas[i].password == $scope.password){           
          $scope.flag = true;
          document.getElementById("login-password").value = "";
          localStorage.username2=$scope.username;
          localStorage.objectId=$scope.userdatas[i].id;
          if ($scope.userdatas.length !=1){
            supersonic.ui.initialView.dismiss();
          }
          break;
        }          
      }

        if ($scope.flag == false){
        alert("Invalid username or password!");
        }
        supersonic.ui.modal.show("camera#initialsurvey");
    }

    $scope.clickLogin2 = function() {
      $scope.flag = false;
      $scope.username = "studyCoordinator";
      $scope.password = "studyCoordinator";

      for (i = 0; i < $scope.userdatas.length; i++){
        if ($scope.username != "" && $scope.password != "" && $scope.userdatas[i].username == $scope.username && $scope.userdatas[i].password == $scope.password){           
          $scope.flag = true;
          document.getElementById("login-password").value = "";
          localStorage.username2=$scope.username;
          localStorage.objectId=$scope.userdatas[i].id;
          if ($scope.userdatas.length !=1){
            supersonic.ui.initialView.dismiss();
          }
          break;
        }          
      }

      if ($scope.flag == false){
        alert("Invalid username or password!");
      }
    }

    $scope.clickLogin = function() {
      $scope.flag = false;
      $scope.username = document.getElementById('login-username').value;
      $scope.password = document.getElementById('login-password').value;
    
      for (i = 0; i < $scope.userdatas.length; i++){
        if ($scope.username != "" && $scope.password != "" && $scope.userdatas[i].username == $scope.username && $scope.userdatas[i].password == $scope.password){           
          $scope.flag = true;
          document.getElementById("login-password").value = "";
          localStorage.username2=$scope.username;
          localStorage.objectId=$scope.userdatas[i].id;
          supersonic.ui.initialView.dismiss();
          break;
        }          
      }

      if ($scope.flag == false){
        alert("Invalid username or password!");
      }
    };
    
    $scope.signupButton = "Sign Up";
    $scope.clickSignup = function() {
      if ($scope.signupButton == "Sign Up"){
        $scope.flag = false;
        $scope.userdata['username'] = document.getElementById('signup-username').value;
        $scope.userdata['password'] = document.getElementById('signup-password').value;
        for (i = 0; i < $scope.userdatas.length; i++){
          if ($scope.userdata['username']  ==  $scope.userdatas[i].username ){           
            $scope.flag = true;
            break;
          }          
        }
        if ($scope.userdata['firstName'] == "" || $scope.userdata['lastName'] == "" || $scope.userdata['username'] == "" || $scope.userdata['password'] == "" || $scope.userdata['phoneNumber'] == ""){
         alert("Please fill in all blank areas!");
        } else {
          if ($scope.flag == false){
            newuserdata = new Usertable($scope.userdata);
            newuserdata.save();

            localStorage.username2=$scope.userdata['username'];

            alert("Successfully sign up!");
            supersonic.ui.initialView.dismiss();
          }
          else {
            alert("Same username existed!! Input a new one:)");
          }
        }
        document.getElementById("signup-firstname").value = "";
        document.getElementById("signup-lastname").value = "";
        document.getElementById("signup-username").value = "";
        document.getElementById("signup-password").value = "";
        document.getElementById("signup-phonenumber").value = "";
      }
    };

});