const Product = require("../../models/products.models")
const productsHelper = require("../../helpers/products") 
const ProductCategory = require("../../models/products-category-models")
const productCategoryHelper = require("../../helpers/product-category")
//[GET] /products
module.exports.index = async (req, res) => {
    const products = await Product.find({
        status: "active",
        deleted: false
    })
    .sort({position: "desc"});
    // const newProducts = products.map(item => {
    //     item.priceNew = (item.price * (100 - item.discountPercentage) / 100) .toFixed(0);
    //     return item;
    // })
    const newProducts = productsHelper.priceNewProducts(products);
    res.render("client/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products : newProducts
    });
}
//Muốn khi thay đổi 1 cái gì đó hiển thị thông báo thì phải cài thêm 1 cái thư viện nữa

//[GET] /products/:slug
module.exports.detail = async (req, res) => {
    
    try {
        const find = {
            deleted: false,
            slug:  req.params.slugProduct,
            status: "active"
        };

        const product = await Product.findOne(find);
        if(product.product_category_id) {
            const category = await ProductCategory.findOne({
                _id: product.product_category_id,
                status: "active",
                deleted: false
            });
            product.category = category;
        }
        product.priceNew = productsHelper.priceNewProduct(product);
        res.render("client/pages/products/detail.pug", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`/products`);
    }
}

//[GET] /products/:slugCategory
module.exports.category = async (req, res) => {
    
    const category = await ProductCategory.findOne({
        slug: req.params.slugCategory,
        status: "active",
        deleted: false
    });
    
    const listSubCategory = await productCategoryHelper.getSubCategory(category.id); // Vì là hàm async await
    const listSubCategoryId = listSubCategory.map(item => item.id)
    const products = await Product.find({
        product_category_id: {$in: [category.id, ...listSubCategoryId]},
        deleted: false
    }).sort({position: "desc"});
   
    const newProducts = productsHelper.priceNewProducts(products);
    res.render("client/pages/products/index.pug", {
        pageTitle: category.title,
        products : newProducts
    });
};