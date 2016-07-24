/**
 * Created by jeyrschabu on 7/21/16.
 */

CategoryController.$inject = ['CategoryService'];

function CategoryController(CategoryService) {
    var categoryController = this;
    categoryController.categories = [];

    function setCategories(categories) {
        categoryController.categories = categories.data;
    }

    categoryController.getCategories = function () {
        CategoryService.list().then(setCategories);
    };

    categoryController.getCategories();
}
