describe("camera module", function () {
    beforeEach(module('camera'));

    describe("ImageController.js", function () {
        var rootsScope, scope, controller;

        beforeEach(function(){
            inject(function($injector) {
                rootScope = $injector.get('$rootScope');
                scope = rootScope.$new();
                controller = $injector.get('$controller');
            });
            var dummyElement = document.createElement('div');
            document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
            scope.myElement = document.getElementById;
        });

        it("test takePhoto()", function () {
            controller("ImageController", {$scope: scope});
            expect(scope.times == 0).toBe(true);
            console.log(scope.photo);
            console.log(scope.myElement);
        });
    });
});