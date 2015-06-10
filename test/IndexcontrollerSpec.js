describe("camera module", function () {
    beforeEach(module('camera'));

    describe("IndexController", function () {
        var rootsScope, scope, controller, constant;

        beforeEach(function(){
            inject(function($injector) {
                rootScope = $injector.get('$rootScope');
                scope = rootScope.$new();
                controller = $injector.get('$controller');
                usertable = $injector.get('Usertable');
                progresstable = $injector.get('Progresstable');
            });
        });
        // beforeEach(inject(function ($rootScope, $controller) {
        //     scope = $rootScope.$new();
        //     controller = $controller;
        // }));
        // don't know how to import database

        it("test previousImage()", function () {
            controller("IndexController", {$scope: scope});
            expect(scope.numImage).toBe(0);
            expect(scope.totalImage).toBe(0);
            scope.previousImage();
            expect(scope.numImage != 0).toBe(true);
            expect(scope.totalImage).toBe(0);
            console.log(usertable);
            //console.log(scope.usertableLength);
            // usertable.all().whenChanged( function (users) {
            // /* only show the image for current user */
            //     console.log(users.length);
            //     //scope.totalImage = users['myPhotos'].length;
            //     // Usertable.find(localStorage.objectId).then( function (user) {
            //     //         $scope.$apply( function () {
            //     //             //show one users' own photos
            //     //             $scope.photoArray=[];
            //     //             $scope.photeDate=[];
            //     //             // get the photo array of current user and the number of photos under current user account
            //     //             $scope.myPhotos = user['myPhotos'];
            //     //             $scope.totalImage = user['myPhotos'].length;
            //     //             for (i=0; i < $scope.myPhotos.length; i ++){
            //     //                 Progresstable.find($scope.myPhotos[i]).then( function (progresstable) {
            //     //                     $scope.photoArray.push(progresstable['photo']);
            //     //                     $scope.photeDate.push(progresstable['createdAt']);
            //     //                 });
            //     //             }
            //     //         });
            //     //     });
            // });
            expect(usertable['myPhotos'] != 0).toBe(true);
        });

        it("test nextImage()", function () {
            controller("IndexController", {$scope: scope});
            expect(scope.numImage).toBe(0);
            expect(scope.totalImage).toBe(0);
            scope.nextImage();
            expect(scope.numImage != 0).toBe(true);            
            expect(scope.numImage != scope.totalImage).toBe(true);
        });
    });
});