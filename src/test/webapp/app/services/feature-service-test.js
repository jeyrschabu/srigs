describe('MainApp', function () {

    var featureService;
    var httpBackend = {};


    beforeEach(function () {
        module('MainApp');
    });

    describe ('featureService', function () {
        beforeEach (inject(function (_featureService_, $httpBackend) {
            featureService = _featureService_;
            httpBackend = $httpBackend;
        }));

        it ('should return a list of features', function() {
            var features = [ {"name" : "Cases" }];
        
            httpBackend.whenGET('/v1/features').respond({
                features : features
            });
            
            featureService.list().then(function(response) {
                expect(response.data.features).toEqual(features);
            });
            httpBackend.flush();
        });

        afterEach (function() {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });
    });
});
