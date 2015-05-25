angular
  .module('camera')
  .controller("ImageController", function ($scope, Progresstable, supersonic) {

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
        show_image("data:image/png;base64,"+localStorage.imageURL, 400, 400);
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
        if(document.myImage.width <1000 && document.myImage.height<1000) {
            document.myImage.width *= 1.01;
            document.myImage.height *= 1.01;
            //myElement.textContent += ev.scale +" ";
        }
    });

    mc.on("pinchin", function(ev) {
        if(document.myImage.width > 100 && document.myImage.height>100){
            document.myImage.width /=1.01;
            document.myImage.height /=1.01;
        }
        
        //myElement.textContent += ev.scale +" ";
    });

    mc.on("panleft panright panup pandown", function(ev) {
        //myElement.textContent = ev.type +" gesture detected.";
        myElement.style.left = (ev.center.x - document.myImage.width/2.0) + "px";
        myElement.style.top = (ev.center.y - document.myImage.height/2.0) + "px";
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

    var tempLeft = 0;
    var tempTop = 0;
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

    $scope.resetImage=function(){ 
        document.myImage.width = originalWidth; 
        document.myImage.height = originalHeight; 
        zoomLevel = 0; 
        update(); 
    } 
   $scope.initial=function(){ 
        //template.style.left = 200;
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
    }
    $scope.imagechange=function(){
        var tempHeight =  150 - tempTop;
        var tempWidth = (screen.width/2) - 51 - tempLeft;
        var top = tempHeight;
        var left = tempWidth ;
        var right = tempWidth + 102;
        var bottom = tempHeight + 200;
        draggable.style.clip = "rect("+top+"px "+right+"px " +bottom+"px "+left+"px)";
    }
});