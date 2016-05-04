'use strict';

var ProductController = function($scope, $stateParams, categoryService, productService, featureService) {
    var self = this;

    $scope.disableSticking = false;
    
    $scope.pageTitle = 'Products';
    $scope.categories = [];
    $scope.features = [];
    $scope.category = $stateParams.category;

    $scope.products = [];


    ProductController.prototype.setProducts = function (products) {
        $scope.products = products.data;
    };

    ProductController.prototype.setCategories = function (categories) {
        $scope.categories = categories.data;
    };

    ProductController.prototype.setFeatures = function (features) {
        $scope.features = features.data;
    };

    ProductController.prototype.getProducts = function(category) {
        if (!category) {
            productService.list().then(self.setProducts);
        }  else {
            productService.listByCategory(category).then(self.setProducts);
        }
    };

    ProductController.prototype.getCategories = function() {
        categoryService.list().then(self.setCategories);
    };

    ProductController.prototype.getFeatures = function() {
        featureService.list().then(self.setFeatures);
    };


    // all the below groups stuff should be loaded in at some point.

    $scope.oneAtATime = true;

    $scope.groups = [
        {
            title: 'CPU',
            items: [
                {'name':'GPU 1',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':true
                },
                {'name':'GPU 2',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                },
                {'name':'GPU 3',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                }
            ]
        },
        {
            title: 'Memory',
            items: [
                {'name':'GPU 1',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':true
                },
                {'name':'GPU 2',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                },
                {'name':'GPU 3',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                }
            ]
        },
        {
            title: 'Storage',
            items: [
                {'name':'GPU 1',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':true
                },
                {'name':'GPU 2',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                },
                {'name':'GPU 3',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                }
            ]
        },
        {
            title: 'Case',
            items: [
                {'name':'GPU 1',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':true
                },
                {'name':'GPU 2',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                },
                {'name':'GPU 3',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                }
            ]
        },
        {
            title: 'Mother Board',
            items: [
                {'name':'GPU 1',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':true
                },
                {'name':'GPU 2',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                },
                {'name':'GPU 3',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                }
            ]
        },
        {
            title: 'Graphics Card',
            items: [
                {'name':'GPU 1',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':true
                },
                {'name':'GPU 2',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                },
                {'name':'GPU 3',
                    'img': 'http://placehold.it/440x400',
                    'description': 'Some long description goes here.',
                    'price': 200.00,
                    'active':false
                }
            ]
        }
    ];


    $scope.hoverItem = false;

    $scope.onHoverItem = function(item){
        $scope.hoverItem = item;

    }; //= false;

    self.getProducts($scope.category);
    self.getCategories();

};

ProductController.$inject = ['$scope', '$stateParams', 'categoryService', 'productService' ,'featureService'];
angular.module('MainApp').controller('ProductController', ProductController);
