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
        myElement.style.left = 20 + "px";
        myElement.style.top = 200 + "px";      
        //update(); 
    } 
    /*
   $scope.initial=function(){ 
        //template.style.left = 200;
        currentWidth = document.myImage.width; 
        currentHeight = document.myImage.height; 
        
        //update(); 
    }
    $scope.update=function(){ 
        currentWidth = document.myImage.width; 
        currentHeight = document.myImage.height; 
        //zoomsize.innerText = zoomLevel; 
        imgsize.innerText = currentWidth + "X" + currentHeight; 
    }
    */

    $scope.imagechange=function(){
        //alert(originalHeight + "," + originalWidth);
        var tempHeight =  150 - tempTop;
        var tempWidth = (screen.width/2) - 75 - tempLeft;
        var top = tempHeight;
        var left = tempWidth ;
        var right = tempWidth + 150;
        var bottom = tempHeight + 220;
        $scope.zoomchange=document.getElementById("editImage").width/300;
        draggable.style.clip = "rect("+top+"px "+right+"px " +bottom+"px "+left+"px)";
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        var img = document.getElementById("editImage");
        var canvasWidth=150/$scope.zoomchange;
        var canvasHeight=220/$scope.zoomchange;
        $scope.originalW=300;
        $scope.originalH=300;
        //ctx.drawImage(img, leftCanvas*$scope.zoomchange, topCanvas*$scope.zoomchange, 102*$scope.zoomchange,200*$scope.zoomchange, 0, 0, 102,200);
        if (top < 0) /*too bottom*/
            top = 0;
        if (tempHeight>=document.getElementById("editImage").height)
            //the height is smaller than the templete
        {
            top=0;
        }
        //image is too right
        if (left<=0){
            left=0;
            //canvasWidth=150;
            //canvasHeight=220;
            alert("image right");
        }
        alert(left);
        // the image is too left
        if (left+tempWidth>=document.getElementById("editImage").width){
            left=300-150;
            canvasWidth=149;
            canvasHeight=219;
            alert("image left");
        }
        //the canvas is too large, the image is too zoomin(small)
        if(canvasHeight>=295)
        {
            alert("h is too small");
            canvasHeight=299;
            canvasWidth=299*15/22;
        }
        //this is impossible in most case
        if(canvasWidth>=295){
            alert("w is too small");
            canvasWidth=299*15/22;
            canvasHeight=299;
        }
        //templete is left and bottom according to the image
        if (top+canvasHeight>=document.getElementById("editImage").height && left<=0){
            if (top >0){
                top=80;
                left=0;
            }
            else{
                top=0;
                left=0;
            }
            if(top+canvasHeight>=299 || left+canvasWidth>=299) {
                canvasWidth=149;
                canvasHeight=219;
            }
            alert("templete in left botom or right top");

        }
        //templete is right and bottom according to the image
        if (top+canvasHeight>=document.getElementById("editImage").height && left>0 &&(document.getElementById("editImage").width-left>tempWidth ))//not sure about the last require
        {
            if (top >0){
                top=80;
                left=150;
            }
            else{
                top=0;
                left=150;
            }
            if(top+canvasHeight>=299 || left+canvasWidth>=299) {
                canvasWidth=149;
                canvasHeight=219;
            }
            alert("templete in right bottom or left ");

        }
        alert($scope.zoomchange+ ", #### " + left+ ", " + top+ ", " + canvasWidth+ ", " + canvasHeight+", ####"+$scope.originalW+","+$scope.originalH +",####"+document.getElementById("editImage").width+","+document.getElementById("editImage").height);
        ctx.drawImage(img, left, top, canvasWidth,canvasHeight, 0, 0, 150,220);
        var canvas = document.getElementById("myCanvas");
        document.getElementById("theimage").src = canvas.toDataURL();
        
    }
});