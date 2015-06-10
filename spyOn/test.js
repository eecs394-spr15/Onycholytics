describe("test", function(){
    var $rootScope, $scope, controller;
    // describe("sdfds",function(){
    //     it("should be true", function(){
    //         expect(true).toEqual(true);
    //     });
    // });
    beforeEach(function(){
        module('camera');
        inject(function($rootScope,$controller){
            scope = $rootScope.$new();
            controller = $controller;
        });
    });
    describe("1st",function(){
        it("selected should equal to this",function(){
            controller("newCoorMessageController", {$scope: scope});
            scope.submitForm();
            expect(scope.message['patientID']).toEqual("tQ9kOyUEJE");
            expect(scope.message['coorID']).toEqual("oG0991GOPA");
        });
    });
    describe("2nd",function(){
        it("content2 should equal to this",function(){
            controller("ImageController", {$scope: scope});
            expect(scope.bool).toEqual(true);
        });
    });
});