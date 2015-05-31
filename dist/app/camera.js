angular.module('camera', [
  // Declare any module-specific AngularJS dependencies here
  'common'
]);

angular
  .module('camera')
  .controller("ImageController", function ($scope, Progresstable, Usertable, supersonic) {
    $scope.times=0;
    $scope.zoomchange=1;  
    var photoSaved={};
    $scope.progresstable = {};
  	$scope.progresstables = null;
    $scope.photoToken=null;
    $scope.bool = false;

      
    $scope.Back = function(){
        supersonic.ui.modal.hide();
    }

    function show_image(src, width, height) {
        var img = document.createElement("img");
        img.name = "myImage";
        img.src = src;
        img.width = width;
        img.height = height;

        // This next line will just add it to the <body> tag
        document.getElementById("draggable").appendChild(img);
        //document.body.appendChild(img);

}

    if (localStorage.imageURL) {
        $scope.photo = "data:image/png;base64,"+localStorage.imageURL;
    }
    else{
        $scope.photo = "/images/bigtoe.png"
    }

   
    var myElement = document.getElementById("draggable");

    var mc = new Hammer.Manager(myElement);
      
    // create a pinch and rotate recognizer
    // these require 2 pointers
    var pinch = new Hammer.Pinch();
    var pan = new Hammer.Pan();
    //var rotate = new Hammer.Rotate();

    // we want to detect both the same time
    //pinch.recognizeWith(rotate);

    // add to the Manager
    mc.add([pinch, pan]);

    //var ratio = document.myImage.width/document.myImage.height;

    mc.on("pinchout", function(ev) {
        if(document.myImage.width <400 && document.myImage.height<400) {
            document.myImage.width *= 1.02;
            document.myImage.height *= 1.02;
            //myElement.textContent += ev.scale +" ";
        }
    });

    mc.on("pinchin", function(ev) {
        if(document.myImage.width > 200 && document.myImage.height>200){
            document.myImage.width /=1.02;
            document.myImage.height /=1.02;
        }
        
        //myElement.textContent += ev.scale +" ";
    });

    //drag stuff below
    var tempLeft = 0;
    var tempTop = 0;
    mc.on("panleft panright panup pandown", function(ev) {
        //myElement.textContent = ev.type +" gesture detected.";
        myElement.style.left = (ev.center.x - document.myImage.width/2.0) + "px";
        myElement.style.top = (ev.center.y - document.myImage.height/4.0) + "px";
        tempLeft = ev.center.x - document.myImage.width/2.0;
        tempTop = ev.center.y - document.myImage.height/4.0;
    });


    var originalWidth = 300;
    var originalHeight = 300;
    
    $scope.resetImage=function(){ 
        document.myImage.width = originalWidth; 
        document.myImage.height = originalHeight; 
        myElement.style.left = 20 + "px";
        myElement.style.top = 200 + "px";
        myElement.reset();
 
    } 



    $scope.imagechange=function(){
        //alert(originalHeight + "," + originalWidth);
        var startHeight = 150;
        var tempHeight =  startHeight - tempTop;
        var tempWidth = (screen.width/2) - 75 - tempLeft;
        var top = tempHeight;
        var left = tempWidth;
        var right = tempWidth + 150;
        var bottom = tempHeight + 220;
        
        $scope.zoomchange=document.getElementById("editImage").width/300;
        //draggable.style.clip = "save()";
        draggable.style.clip = "rect("+top+"px "+right+"px " +bottom+"px "+left+"px)";
        var can = document.getElementById("myCanvas");
        var ctx = can.getContext("2d");
        var img = document.getElementById("editImage");
        var canvasWidth=150/$scope.zoomchange;
        var canvasHeight=220/$scope.zoomchange;
        var left = left/$scope.zoomchange;
        var top = top/$scope.zoomchange;
        var canvasW = 150;
        var canvasH = 220;
        var startY = 0;
        var startX = 0;
        
        //image is too small
        if(canvasHeight>=295 || canvasWidth>=295)
        {
            alert("too small! keep whole picture");
            canvasHeight=299;
            canvasWidth=299;
            left = 0;
            top = 0;
            canvasW = 150;
            canvasH = 150;
            startY = 25;
        }
        //image's size suitbale for clip
        else{
            //image is too bottom and too left
            if (top < 0 && right > document.getElementById("editImage").width){
                alert("image is too bottom and too left");
                top = 0;
                canvasWidth = document.getElementById("editImage").width - left;
                canvasHeight = bottom;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
                startY = tempTop - startHeight - 15;
            }

            //image is too bottom and too right 
            else if (top < 0 && left < 0){
                alert("image is too bottom and too left");
                top = 0;
                left = 0;
                canvasWidth = right;
                canvasHeight = bottom;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
                startY = tempTop - startHeight - 15;
                startX = -tempWidth;
            }

            //image is too top and too left
            else if (bottom > document.getElementById("editImage").height && right > document.getElementById("editImage").width){
                alert("image is too top and too left");
                canvasWidth = document.getElementById("editImage").width - left;
                canvasHeight = document.getElementById("editImage").height - top;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
            }

            //image is too top and right
            else if (bottom > document.getElementById("editImage").height && left < 0){
                alert("image is too top and too right");
                left = 0;
                canvasWidth = right;
                canvasHeight = document.getElementById("editImage").height - top;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
                startX = -tempWidth;
            }

            //image is too bottom
            else if (top < 0){
                alert("image is too bottom");
                top = 0;
                canvasWidth = 150;
                canvasHeight = bottom;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
                startY = tempTop - startHeight -15;
            } 
            
            //image is too top
            else if (bottom > document.getElementById("editImage").height)
            {   
                alert("image is too top");
                //left += 20;
                canvasWidth = 150;
                canvasHeight = document.getElementById("editImage").height - top;               
                canvasW = canvasWidth;
                canvasH = canvasHeight;
                startX = 0;
            }
            
            //image is too left
            else if (right > document.getElementById("editImage").width){
                alert("image is too left");
                canvasWidth = document.getElementById("editImage").width - left;
                canvasHeight = 220;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
            }

            //image is too right
            else if (left < 0){
                alert("image is too right");
                left = 0;
                canvasWidth = right;
                canvasHeight = 220;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
                startX = -tempWidth;
            }

        }
        
        ctx.drawImage(img, left, top, canvasWidth,canvasHeight, startX, startY, canvasW, canvasH);
        var canvas = document.getElementById("myCanvas");
        photoSaved= canvas.toDataURL();
 
    }
    
    Progresstable.all().whenChanged( function (progresstables) {
        $scope.$apply( function () {
          $scope.progresstables = progresstables;
        });
        Usertable.find(localStorage.objectId).then( function (user) {
            if ($scope.bool == true) {
                $scope.bool = false;
                $scope.$apply( function () {
                    $scope.myPhotos = user['myPhotos'];
                    $scope.myPhotos.push(progresstables[progresstables.length-1].id);
                    user['myPhotos'] = $scope.myPhotos;
                    user.save();
                });
                alert("Photo Saved!");
                $scope.$apply( function () {
                    $scope.showSpinner = false;
                });
                supersonic.ui.modal.show("camera#survey");
            }
        });
    });

    $scope.imageSave=function(){
        $scope.progresstable['photo']=photoSaved.substr(22);
        //document.getElementById("theimage").src;
        newprogresstable = new Progresstable($scope.progresstable);
        newprogresstable.save();
        $scope.bool = true;
        $scope.showSpinner = true;
        /*.then( function () {
            //supersonic.ui.modal.hide();    
        });*/
    }

    
     
});
angular
  .module('camera')
  .controller('IndexController', function ($scope, Progresstable, supersonic) {
  	$scope.progresstable = {};
  	$scope.progresstables = null;
    $scope.photoToken=null;
  	$scope.numImage = 0;
  	$scope.totalImage = 0;

    var options = {
	  quality: 100,
	  targetWidth: 300,
	  targetHeight: 300,
	  saveToPhotoAlbum: false,
	  destinationType: "dataURL"
	};

    Progresstable.all().whenChanged( function (progresstables) {
        $scope.$apply( function () {
          $scope.progresstables = progresstables;
          $scope.totalImage = progresstables.length;
        });
    });

    $scope.previousImage = function() {
    	$scope.numImage = Math.max(0, ($scope.numImage - 1)% $scope.totalImage);

    	//alert('Previous Image');

    }

    $scope.nextImage = function() {
      if($scope.numImage!=$scope.totalImage-1){
        $scope.numImage = ($scope.numImage + 1) % $scope.totalImage;
      }
    	
    	//alert('Next Image');
    }

	// $scope.takePhoto = function() {
	// 	supersonic.media.camera.takePicture(options).then( function(result){
 //  		// Do something with the image URI
 //  			$scope.progresstable['photo'] = result;
	//   		newprogresstable = new Progresstable($scope.progresstable);
	//      	newprogresstable.save().then( function () {
	//         	alert("Photo saved");
 //            $scope.photoToken=result;
	//       	});
	// 	});
	
	// }
	
  });

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

    $scope.loginButton1 = "Patient Login";
    $scope.loginButton2 = "Coordinator Login";

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
      supersonic.ui.modal.show("camera#initialsurvey");
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
angular
  .module('camera')
  .constant('Progresstable', supersonic.data.model('progresstable'));
angular
  .module('camera')
  .constant('Usertable',  supersonic.data.model('usertable'));

angular
  .module('camera')
  .constant('Usermessage',  supersonic.data.model('usermessage'));

angular
  .module('camera')
  .constant('Coormessage',  supersonic.data.model('coormessage'));
  
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



});
angular
  .module('camera')
  .controller("messageDetailsController", function ($scope, Usertable, Usermessage, Coormessage, supersonic) {
    $scope.message = null;
    $scope.dataId = undefined;
    $scope.userType = null;


   var _refreshViewData = function () {
    if ($scope.userType == "true") {
        Usermessage.find($scope.dataId).then( function (message) {
            $scope.$apply( function () {
              $scope.message = message;
            });
        });
      } else {
        Coormessage.find($scope.dataId).then( function (message) {
            $scope.$apply( function () {
              $scope.message = message;
            });
        });
      }
    }

    supersonic.ui.views.current.whenVisible( function () {
      if ( $scope.dataId ) {
        _refreshViewData();
      }
    });
    supersonic.ui.views.current.params.onValue( function (values) {
      $scope.dataId = values.xid;
      $scope.userType = values.zid;
      //$scope.userType = values.uType;
      _refreshViewData();
    });  

});
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
angular
  .module('camera')
  .controller("try", function ($scope, Progresstable,  supersonic) {

      
    $scope.zoomIn = function() {
          document.myImage.width = currentWidth*1.2; 
    document.myImage.height = currentHeight*1.2; 
    zoomLevel = zoomLevel + 1; 
    update(); 
    }
    $scope.zoomOut=function(){ 
        document.myImage.width = currentWidth/1.2; 
        document.myImage.height = currentHeight/1.2; 
        zoomLevel = zoomLevel - 1; 
        update(); 
    } 
    $scope.resetImage=function(){ 
        document.myImage.width = originalWidth; 
        document.myImage.height = originalHeight; 
        zoomLevel = 0; 
        update(); 
    } 
  /* $scope.initial=function(){ 
    currentWidth = document.myImage.width; 
    currentHeight = document.myImage.height; 
    originalWidth = currentWidth; 
    originalHeight = currentHeight; 
    update(); 
    }
    
  


    $scope.update=function(){ 
        currentWidth = document.myImage.width; 
        currentHeight = document.myImage.height; 
        zoomsize.innerText = zoomLevel; 
        imgsize.innerText = currentWidth + "X" + currentHeight; 
    } */
  });

var zoomLevel = 0; 
var currentWidth = 0; 
var currentHeight = 0; 
var originalWidth = 0; 
var originalHeight = 0; 
function initial(){ 
    currentWidth = document.myImage.width; 
    currentHeight = document.myImage.height; 
    originalWidth = currentWidth; 
    originalHeight = currentHeight; 
    update(); 
} /*
function zoomIn(){ 
    document.myImage.width = currentWidth*1.2; 
    document.myImage.height = currentHeight*1.2; 
    zoomLevel = zoomLevel + 1; 
    update(); 
} 
function zoomOut(){ 
    document.myImage.width = currentWidth/1.2; 
    document.myImage.height = currentHeight/1.2; 
    zoomLevel = zoomLevel - 1; 
    update(); 
} 
function resetImage(){ 
    document.myImage.width = originalWidth; 
    document.myImage.height = originalHeight; 
    zoomLevel = 0; 
    update(); 
} */

function update(){ 
    currentWidth = document.myImage.width; 
    currentHeight = document.myImage.height; 
    zoomsize.innerText = zoomLevel; 
    imgsize.innerText = currentWidth + "X" + currentHeight; 
} 