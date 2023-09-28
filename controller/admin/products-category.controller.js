const ProductCategory = require("../../models/products-category-models");
const { prefixAdmin } = require("../../config/system");
const createTreeHelper = require("../../helpers/create-tree")

// [GET] /admin/products-category
module.exports.index = async (req, res) => {

    let find = {
        deleted: false,
    };


    const records = await ProductCategory.find(find)
    const newRecords = createTreeHelper.tree(records);    

    res.render("admin/pages/products-category/index", {
        pageTitle: "Danh mục sản phẩm",
        records: newRecords
    });
};


// [GET] /admin/products-category/create 
module.exports.create = async (req, res) => {

    let find = {
        deleted: false
    };


    const records = await ProductCategory.find(find);

    const newRecords = createTreeHelper.tree(records);

    res.render("admin/pages/products-category/create", {
        pageTitle: "Tạo danh mục sản phẩm",
        records: newRecords

    });
};

module.exports.createPost = async (req, res) => {
    if (req.body.position == "") {
        const countProducts = await ProductCategory.count();
        req.body.position = countProducts + 1;
    } else {
        // Nếu người ta truyền vào
        req.body.position = parseInt(req.body.position);
    }

    const record = new ProductCategory(req.body); // tạo bên phía model
    await record.save();


    res.redirect(`${prefixAdmin}/products-category`);
}