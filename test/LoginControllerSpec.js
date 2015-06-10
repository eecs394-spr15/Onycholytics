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
            //mock HTML element used in controller
            var dummyElement = document.createElement('password');
            document.getElementById = jasmine.createSpy('HTML Element').and.returnValue(dummyElement);
            document.getElementById('login-password').value = "person";

        });

        it("test clickLogin1() with right username and password", function () {
            controller("LoginController", {$scope: scope});
            
            //test before click login
            expect(scope.username).toBeUndefined();
            expect(scope.password).toBeUndefined();

            //initialize fake usertable
            var obj1 = new Object();
            obj1.username = 'patient';
            obj1.password = 'patient';
            obj1.id = 'patNum0000';
            scope.userdatas[0] = obj1;
            scope.userdatas.length = 1;
            scope.clickLogin1();

            //evaluate outcome after evaluation
            expect(scope.username).toBe('patient');
            expect(scope.password).toBe('patient');
            expect(scope.flag).toBe(true);            
            expect(document.getElementById("login-password").value).toBe('');
            expect(localStorage.objectId).toEqual(obj1.id);
            expect(localStorage.username2).toEqual(obj1.username);
        });

        it("test clickLogin1() with wrong username and password", function () {
            controller("LoginController", {$scope: scope});
            //clear local storage
            localStorage.objectId = "";
            localStorage.username2 = "";

            //initialize fake usertable
            var obj1 = new Object();
            obj1.username = 'patient2';
            obj1.password = 'patient2';
            obj1.id = 'patNum0000';
            scope.userdatas[0] = obj1;
            scope.userdatas.length = 1;
            scope.clickLogin1();
            
            //evaluate outcome after evaluation
            expect(scope.flag).not.toBe(true);            
            expect(document.getElementById("login-password").value).not.toBe('');
            expect(localStorage.objectId).not.toEqual(obj1.id);
            expect(localStorage.username2).not.toEqual(obj1.username);
            
        });
    });
});