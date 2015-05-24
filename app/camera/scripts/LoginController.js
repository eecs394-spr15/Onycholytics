angular
  .module('camera')
  .controller("LoginController", function ($scope, Usertable, supersonic) {
    $scope.logg = true;
    $scope.hello = "Taxi";
    $scope.userdata = {};
    $scope.userdatas = null;    
    //$scope.users = null;

    
    Usertable.all().whenChanged( function (userdatas) {
         $scope.userdatas = userdatas;         
    });

    $scope.loginButton1 = "Log In As Patient";
    $scope.loginButton2 = "Log In As Study Coordinator";

    $scope.clickLogin1 = function() {
      var flag = false;
      $scope.username = "patient";
      $scope.password = "patient";
    
      for (i = 0; i < $scope.userdatas.length; i++){
        if ($scope.username != "" && $scope.password != "" && $scope.userdatas[i].username == $scope.username && $scope.userdatas[i].password == $scope.password){           
          flag = true;
          document.getElementById("login-password").value = "";
          localStorage.username2=$scope.username;
          //localStorage.firstName=$scope.userdatas[i].firstName;
          localStorage.objectId=$scope.userdatas[i].id;

          supersonic.ui.initialView.dismiss();
          //window.open("getting-started.html")
          break;
        }          
      }

      if (flag == false){
        alert("Invalid username or password!");
      }

    }

    $scope.clickLogin2 = function() {
      var flag = false;
      $scope.username = "studyCoordinator";
      $scope.password = "studyCoordinator";
    
      for (i = 0; i < $scope.userdatas.length; i++){
        if ($scope.username != "" && $scope.password != "" && $scope.userdatas[i].username == $scope.username && $scope.userdatas[i].password == $scope.password){           
          flag = true;
          document.getElementById("login-password").value = "";
          localStorage.username2=$scope.username;
          //localStorage.firstName=$scope.userdatas[i].firstName;
          localStorage.objectId=$scope.userdatas[i].id;

          supersonic.ui.initialView.dismiss();
          //window.open("getting-started.html")
          break;
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
          //localStorage.firstName=$scope.userdatas[i].firstName;
          localStorage.objectId=$scope.userdatas[i].id;

          supersonic.ui.initialView.dismiss();
          //window.open("getting-started.html")
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
        //$scope.userdata['firstName'] = document.getElementById('signup-firstname').value;
        //$scope.userdata['lastName'] = document.getElementById('signup-lastname').value;
        $scope.userdata['username'] = document.getElementById('signup-username').value;
        $scope.userdata['password'] = document.getElementById('signup-password').value;
        //$scope.userdata['phoneNumber'] = document.getElementById('signup-phonenumber').value;
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




    /*
    var usert = supersonic.data.model('userTable');
    var query = {"lastName": "Diaz"};
    usert.findAll({query: JSON.stringify(query)}).then(function(users){
      $scope.$apply( function () {
        $scope.users = users;
        supersonic.logger.log(users);
      });
    });
    */

  });