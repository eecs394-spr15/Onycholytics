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

    }

    if (localStorage.imageURL) {
        $scope.photo = "data:image/png;base64,"+localStorage.imageURL;
    }
    else{
        $scope.photo = "/images/bigtoe.png"
    }

   
    var myElement = document.getElementById("draggable");

    var mc = new Hammer.Manager(myElement);
      
    var pinch = new Hammer.Pinch();
    var pan = new Hammer.Pan();
    mc.add([pinch, pan]);
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
    });

    //drag stuff below
    var tempLeft = 0;
    var tempTop = 0;
    mc.on("panleft panright panup pandown", function(ev) {
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
                top = 0;
                canvasWidth = document.getElementById("editImage").width - left;
                canvasHeight = bottom;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
                startY = tempTop - startHeight - 15;
            }

            //image is too bottom and too right 
            else if (top < 0 && left < 0){
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
                canvasWidth = document.getElementById("editImage").width - left;
                canvasHeight = document.getElementById("editImage").height - top;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
            }

            //image is too top and right
            else if (bottom > document.getElementById("editImage").height && left < 0){
                left = 0;
                canvasWidth = right;
                canvasHeight = document.getElementById("editImage").height - top;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
                startX = -tempWidth;
            }

            //image is too bottom
            else if (top < 0){
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
                canvasWidth = 150;
                canvasHeight = document.getElementById("editImage").height - top;               
                canvasW = canvasWidth;
                canvasH = canvasHeight;
                startX = 0;
            }
            
            //image is too left
            else if (right > document.getElementById("editImage").width){
                canvasWidth = document.getElementById("editImage").width - left;
                canvasHeight = 220;
                canvasW = canvasWidth;
                canvasH = canvasHeight;
            }

            //image is too right
            else if (left < 0){
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
        // save the image for current user
        Usertable.find(localStorage.objectId).then( function (user) {
            // after clicking save button, the bool will be true
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
        /* save image button function 
        delete the first 22 characters which are "data:image/png;base64,", then the rest will be the real image data that we want to save */
        $scope.progresstable['photo']=photoSaved.substr(22);
        newprogresstable = new Progresstable($scope.progresstable);
        newprogresstable.save();
        $scope.bool = true;
        $scope.showSpinner = true;
    }
        

    
     
});