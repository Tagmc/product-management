const ProductCategory = require("../../models/products-category-models");
const createTreeHelper = require("../../helpers/create-tree");

module.exports.category = async (req, res, next) => {
    
    
    const productCategory = await ProductCategory.find({
        deleted: false
    });
    const newProductsCategory = createTreeHelper.tree(productCategory);
    res.locals.layoutProductsCategory = newProductsCategory;

    next();
}