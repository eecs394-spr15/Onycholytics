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

        it("test nextImage() and previousImage()", function () {
            controller("IndexController", {$scope: scope});
            expect(scope.numImage).toBe(0);
            expect(scope.totalImage).toBe(0);
            scope.totalImage = 10;
            //test nextImage() in whole range
            for (i = 1; i < scope.totalImage; i++){
                scope.nextImage();
                expect(scope.numImage).toBe(i);
            }
            scope.nextImage();
            expect(scope.numImage).toBe(scope.totalImage - 1);

            //test previousImage() in whole range
            for (i = scope.totalImage - 2; i >= 0; i--){
                scope.previousImage(); 
                expect(scope.numImage).toBe(i);
            }
            scope.previousImage(); 
            expect(scope.numImage).toBe(0);
                    
        });


    });
});