/**
 * Created by jeyrschabu on 7/24/16.
 */

describe('Customize', function () {
  var scope,
    customizeController,
    mockProductService,
    mockBuildService;

  beforeEach(module('Rigs'));

  describe('CustomizeController', function () {

    beforeEach(inject(function ($rootScope, $controller, ProductService, BuildService) {
      scope = $rootScope.$new();
      mockProductService = ProductService;
      mockBuildService = BuildService;
      customizeController = $controller('CustomizeController', {
        '$scope': scope,
        'ProductService': mockProductService,
        'BuildService': mockBuildService
      });
    }));

    it('should have a title to match the page', function () {
      expect(customizeController.pageTitle).toBe('Customize');
      expect(scope.bodyClass).toBe(customizeController.pageTitle.toLocaleLowerCase());
    });

    it('should slugify a string', function () {
      expect(customizeController.slugify('shadow        Rigs'), 'shadow-rigs');
    });

    it('should have a default case option from the product mark when initialized', function () {
      var product = {
        id: 'someid',
        name: 'Phantom',
        price: 1060,
        specs: [
          {name: 'Corsair Obsidian 450D', type: 'Case'},
          {name: 'Corsair Vengeance C70 Military Green', type: 'Case'}
        ]
      };

      var  marks = [
        {
          price: 1060,
          name: 'Mark 1',
          brand: 'Intel',
          product: product.name,
          specs: [
            {name: 'Corsair Obsidian 450D', type: 'Case', price: 100},
            {name: 'Intel FX-6300', type: 'CPU', price: 120}
          ]
        }
      ];

      spyOn(mockBuildService, 'findByProduct').and.callFake(function () {
        return {
          then: function (callback) {
            return callback({data: marks});
          }
        };
      });

      spyOn(mockProductService, 'findById').and.callFake(function () {
        return {
          then: function (callback) {
            return callback({data: product});
          }
        };
      });

      customizeController.initialize('id');
      expect(mockProductService.findById).toHaveBeenCalled();
      expect(customizeController.rig.caseOptions).toBeDefined();
      expect(customizeController.rig.caseOptions.current.name).toBe(marks[0].specs[0].name);
      expect(customizeController.rig.caseOptions.current.price).toBe(0);
    });
  })
});
