describe("example module", function () {
<<<<<<< Updated upstream
    it("should be true", function(){
        expect(true).toBe(true);
    });
=======
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            //console.log(window.localStorage.getItem('imageURL'));
            //console.log(scope.result);
=======
            console.log(window.localStorage.getItem('imageURL'));
            console.log(scope.result);
>>>>>>> Stashed changes
        });
    });
});