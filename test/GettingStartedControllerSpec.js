describe("example module", function () {

    beforeEach(module('example'));

    describe("GettingStartedController.js", function () {
        var rootsScope, scope, controller;

        beforeEach(function(){
            inject(function($injector) {
                rootScope = $injector.get('$rootScope');
                scope = rootScope.$new();
                controller = $injector.get('$controller');
            });
        });

        it("test takePhoto()", function () {
            controller("GettingStartedController", {$scope: scope});
        });
    });
});