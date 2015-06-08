angular
  .module('camera')
  .controller("LoginController", function ($scope, Usertable, supersonic) {
    $scope.logg = true;
    $scope.hello = "Taxi";
    $scope.userdata = {};
    $scope.userdatas = null;    

    
    Usertable.all().whenChanged( function (userdatas) {
         $scope.userdatas = userdatas;         
    });

    $scope.loginButton1 = "Patient Login";
    $scope.loginButton2 = "Coordinator Login";

    $scope.clickLogin1 = function() {
      var flag = false;
      $scope.username = "patient";
      $scope.password = "patient";
      if ($scope.userdatas){
        for (i = 0; i < $scope.userdatas.length; i++){
          if ($scope.username != "" && $scope.password != "" && $scope.userdatas[i].username == $scope.username && $scope.userdatas[i].password == $scope.password){           
              flag = true;
              document.getElementById("login-password").value = "";
              localStorage.username2=$scope.username;
              localStorage.objectId=$scope.userdatas[i].id;
              supersonic.ui.initialView.dismiss();
              break;
            }          
        }
      }

        if (flag == false){
        alert("Invalid username or password!");
        }
        supersonic.ui.modal.show("camera#initialsurvey");
    }

    $scope.clickLogin2 = function() {
      var flag = false;
      $scope.username = "studyCoordinator";
      $scope.password = "studyCoordinator";
      if ($scope.userdatas){
        for (i = 0; i < $scope.userdatas.length; i++){
          if ($scope.username != "" && $scope.password != "" && $scope.userdatas[i].username == $scope.username && $scope.userdatas[i].password == $scope.password){           
            flag = true;
            document.getElementById("login-password").value = "";
            localStorage.username2=$scope.username;
            localStorage.objectId=$scope.userdatas[i].id;
            supersonic.ui.initialView.dismiss();
            break;
          }          
        }
      }
      if (flag == false){
        alert("Invalid username or password!");
      }
    }

    $scope.clickLogin = function() {
      var flag = false;
      $scope.username = document.getElementById('login-username').value;
      $scope.password = document.getElementById('login-password').value;
    
      for (i = 0; i < $scope.userdatas.length; i++){
        if ($scope.username != "" && $scope.password != "" && $scope.userdatas[i].username == $scope.username && $scope.userdatas[i].password == $scope.password){           
          flag = true;
          document.getElementById("login-password").value = "";
          localStorage.username2=$scope.username;
          localStorage.objectId=$scope.userdatas[i].id;
          supersonic.ui.initialView.dismiss();
          break;
        }          
      }

      if (flag == false){
        alert("Invalid username or password!");
      }
    };
    
    $scope.signupButton = "Sign Up";
    $scope.clickSignup = function() {
      if ($scope.signupButton == "Sign Up"){
        var flag = false;
        $scope.userdata['username'] = document.getElementById('signup-username').value;
        $scope.userdata['password'] = document.getElementById('signup-password').value;
        for (i = 0; i < $scope.userdatas.length; i++){
          if ($scope.userdata['username']  ==  $scope.userdatas[i].username ){           
            flag = true;
            break;
          }          
        }
        if ($scope.userdata['firstName'] == "" || $scope.userdata['lastName'] == "" || $scope.userdata['username'] == "" || $scope.userdata['password'] == "" || $scope.userdata['phoneNumber'] == ""){
         alert("Please fill in all blank areas!");
        } else {
          if (flag == false){
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