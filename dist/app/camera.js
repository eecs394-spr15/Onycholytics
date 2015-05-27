angular.module('camera', [
  // Declare any module-specific AngularJS dependencies here
  'common'
]);

angular
  .module('camera')
  .controller("ImageController", function ($scope, Progresstable, supersonic) {
    $scope.times=0;
    $scope.zoomchange=1;  

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
    if (steroids.view.params.photo) {
        $scope.photo = "data:image/png;base64," + steroids.view.params.photo;

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
            $scope.times+=1;
            document.myImage.width *= 1.02;
            document.myImage.height *= 1.02;
            //myElement.textContent += ev.scale +" ";
        }
    });

    mc.on("pinchin", function(ev) {
        if(document.myImage.width > 200 && document.myImage.height>200){
            $scope.times-=1;
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
        myElement.style.left = (ev.center.x - document.myImage.width/4.0) + "px";
        myElement.style.top = (ev.center.y - document.myImage.height/4.0) + "px";
        tempLeft = ev.center.x - document.myImage.width/4.0;
        tempTop = ev.center.y - document.myImage.height/4.0;
    });

    // mc.on("rotate", function(ev) {
    //     document.getElementById("login-button").innerHTML = ev.angle;
    //     $("#draggable").rotateRight(45);
    // });

    // $scope.showimage=false;

    // if(steroids.view.params.photo){
    //   $scope.photo = "data:image/png;base64," + steroids.view.params.photo;
    // }
    // else
    // {
    //   $scope.photo = "/images/finger.png";  
    // }

    //drag stuff below
    // var draggable = document.getElementById('draggable');
    // var template = document.getElementById('template');
    // draggable.addEventListener('touchmove', function(event) {
    //     var touch = event.targetTouches[0];
    //     var topmax = 290, topmin = 120; 
    //     var leftmax = 20, rightmax = 330;
    // // Place element where the finger is
    //     if (touch.pageX < leftmax)
    //         draggable.style.left = leftmax;
    //     else if (touch.pageX > rightmax)
    //         draggable.style.left = rightmax;
    //     else
    //         draggable.style.left = touch.pageX + 'px';
    //     if (touch.pageY < topmin)
    //         draggable.style.top = topmin + 'px';
    //     else if (touch.pageY > topmax)
    //         draggable.style.top = topmax + 'px';
    //     else
    //         draggable.style.top = touch.pageY + 'px';
    //     tempLeft = touch.pageX;
    //     tempTop = touch.pageY;
    //     event.preventDefault();
    // }, false);

    //old version of zoomin and zoomout 
    // $scope.zoomIn = function() {
    //     if (document.myImage.width < screen.width && document.myImage.height < screen.height) {
    //         document.myImage.width = currentWidth*1.2; 
    //         document.myImage.height = currentHeight*1.2; 
    //         zoomLevel = zoomLevel + 1; 
    //         update(); 
    //     }
    //     else {
    //         alert("Too Big!");
    //     }
    // }
    // $scope.zoomOut=function(){ 
    //     if (document.myImage.width < 20 || document.myImage.height < 20) {
    //         alert("Too Small!")
    //     }
    //     else {
    //         document.myImage.width = currentWidth/1.2; 
    //         document.myImage.height = currentHeight/1.2; 
    //         zoomLevel = zoomLevel - 1; 
    //         update(); 
    //     }
    // } 
    var originalWidth = 300;
    var originalHeight = 300;
    $scope.resetImage=function(){ 
        document.myImage.width = originalWidth; 
        document.myImage.height = originalHeight; 
        zoomLevel = 0; 
        //update(); 
    } 

   $scope.initial=function(){ 
        //template.style.left = 200;
        var currentWidth = document.myImage.width; 
        var currentHeight = document.myImage.height; 
        originalWidth = 300; 
        originalHeight = 300; 
        //update(); 
    }
    $scope.update=function(){ 
        currentWidth = document.myImage.width; 
        currentHeight = document.myImage.height; 
        zoomsize.innerText = zoomLevel; 
        imgsize.innerText = currentWidth + "X" + currentHeight; 
    }

    $scope.imagechange=function(){
        //alert(originalHeight + "," + originalWidth)
        var tempHeight =  150 - tempTop;
        var tempWidth = (screen.width/2) - 75 - tempLeft;
        var top = tempHeight;
        var left = tempWidth ;
        var right = tempWidth + 150;
        var bottom = tempHeight + 220;
        $scope.zoomchange=Math.pow(1.02,$scope.times);
        $scope.originalW=document.getElementById("editImage").width/$scope.zoomchange;
        $scope.originalH=document.getElementById("editImage").height/$scope.zoomchange;
        draggable.style.clip = "rect("+top+"px "+right+"px " +bottom+"px "+left+"px)";
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var img = document.getElementById("editImage");
        var drawWidth = 150;
        var drawHeight = 220;
        var canvasWidth=150/$scope.zoomchange;
        var canvasHeight=220/$scope.zoomchange;
        if (canvasWidth>= $scope.originalW  )
        {
            left= 0;
            canvasWidth= $scope.originalW;
            drawWidth=document.getElementById("editImage").width;            
        }        
        if ( canvasHeight >= $scope.originalH)
        {
            top=0;
            canvasHeight= $scope.originalH;
            drawHeight=document.getElementById("editImage").height;
        }
        alert($scope.times+","+$scope.zoomchange+ ", #### " + left+ ", " + top+ ", " + canvasWidth+ ", " + canvasHeight+", ####"+$scope.originalW+","+$scope.originalH +",####"+document.getElementById("editImage").width+","+document.getElementById("editImage").height);
        //ctx.drawImage(img, leftCanvas*$scope.zoomchange, topCanvas*$scope.zoomchange, 102*$scope.zoomchange,200*$scope.zoomchange, 0, 0, 102,200);
        if (top < 0)
            top = 0;
        ctx.drawImage(img, left, top, canvasWidth,canvasHeight, 0, 0, drawWidth,drawHeight);
        var canvas = document.getElementById("myCanvas");
        document.getElementById("theimage").src = canvas.toDataURL();
        
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
        }); });

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