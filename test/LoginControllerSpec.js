describe("camera module", function () {
    beforeEach(module('camera'));

    describe("LoginController.js", function () {
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

        it("test clickLogin1()", function () {
            controller("LoginController", {$scope: scope});
            expect(scope.userdatas).toBe(null);
            expect(scope.username).toBeUndefined();
            expect(scope.password).toBeUndefined();
            scope.clickLogin1();
            expect(scope.userdatas).toBe(null);
            expect(scope.username).toBe('patient');
            expect(scope.password).toBe('patient');
            //expect(scope.username).toBe('patient');
            
        });

        it("test clickLogin2()", function () {
            controller("LoginController", {$scope: scope});
            expect(scope.userdatas).toBe(null);
            expect(scope.username).toBeUndefined();
            expect(scope.password).toBeUndefined();
            scope.clickLogin2();
            expect(scope.userdatas).toBe(null);
            expect(scope.username).toBe('studyCoordinator');
            expect(scope.password).toBe('studyCoordinator');
            //expect(scope.username).toBe('patient');
            
        });
    });
});