describe("test", function(){
    var $rootScope, $scope, controller;
    beforeEach(function(){
        module('camera');
        inject(function($rootScope,$controller){
            scope = $rootScope.$new();
            controller = $controller;
        });
        var messageTitle = document.createElement('messageTitle');
        document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(messageTitle);
        var myImage = document.createElement('myImage');
        document.myImage = jasmine.createSpy('HTML Element');

    });
    describe("Test1: test submitForm()",function(){
        it("test when the messageTitle is null and if the coorID and patientID is right",function(){
            controller("newCoorMessageController", {$scope: scope});

            //before run the submitForm
            expect(scope.messageTitle).toBeUndefined();
            expect(scope.messageBody).toBeUndefined();

            scope.submitForm();

            //test when the title is empty and the Patient and coor ID value 
            expect(document.getElementById('messageTitle').value).toBe("New Message");
            expect(scope.message['patientID']).toEqual("tQ9kOyUEJE");
            expect(scope.message['coorID']).toEqual("oG0991GOPA");
        });
    });
    describe("Test2: test resetImage()",function(){
        it("when the image's real width is smaller or larger than the original size",function(){
            controller("ImageController", {$scope: scope});
            //if the image is smallter than original size
            document.myImage.width=200;
            scope.resetImage();
            expect(document.myImage.width).toEqual(300);
            //if the image is smallter than original size
            document.myImage.width=400;
            scope.resetImage();
            expect(document.myImage.width).toEqual(300);
        });
    })
});