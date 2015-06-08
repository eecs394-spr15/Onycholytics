describe("example module", function () {
    it("should be true", function(){
        expect(true).toBe(true);
    });
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
            //console.log(window.localStorage.getItem('imageURL'));
            //console.log(scope.result);
        });
    });
});