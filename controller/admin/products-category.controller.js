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

// [GET] /admin/products-category/edit
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await ProductCategory.findOne({
            _id: id,
            deleted: false,
        });
    
        const records = await ProductCategory.find({
            deleted: false
        });
    
        const newRecords = createTreeHelper.tree(records);
    
        res.render("admin/pages/products-category/edit", {
            pageTitle: "Chỉnh sửa danh mục sản phẩm",
            data: data,
            records: newRecords
        });
    } catch (error) {
        res.redirect(`${prefixAdmin}/products-category`)
    }
   
};
// [PATCH] /admin/products-category/edit/:id
module.exports.editPatch = async (req, res) => {

    const id = req.params.id;
    req.body.position = parseInt(req.body.position);



    await ProductCategory.updateOne({
        _id: id
    }, req.body);

    res.redirect("back");
};