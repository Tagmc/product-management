const Product = require("../../models/products.models")
const filterStatusHelper = require("../../helpers/filterStatus");
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const { prefixAdmin } = require("../../config/system");

const ProductCategory = require("../../models/products-category-models");

const createTreeHelper = require("../../helpers/create-tree")
// [GET] /admin/products
module.exports.index = async (req, res) => {

    // Chức năng lọc
    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false,
    };

    if (req.query.status) {
        find.status = req.query.status;
    }

    //Tìm kiếm
    const objectSearch = searchHelper(req.query)

    if (objectSearch.regex) {
        find.title = objectSearch.regex;
    }

    //pagination
    const countProducts = await Product.count(find); //Lay ra so san pham de dem ham count mongoose cung cap san
    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItems: 4,
    }, req.query, countProducts);
    // if(req.query.page){
    //     objectPagination.currentPage = parseInt(req.query.page); // dang tra ra string nhung tra ra Number moi chuan
    // }

    // objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    // //console.log(objectPagination.skip);
    // //Tat ca nhung doan truy van database phai dung await
    // const countProducts = await Product.count(find); //Lay ra so san pham de dem ham count mongoose cung cap san
    // const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
    // objectPagination.totalPage = totalPage; 

    //End pagination

    //Sort
    let sort = {};

    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue;
    }
    else {
    sort.position = "desc";
    }
    //End sort

    const products = await Product.find(find)
        .sort(sort)
        .limit(objectPagination.limitItems)
        .skip(objectPagination.skip); //skip la bo qua

    //console.log(products);

    res.render("admin/pages/products/index.pug", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
}
// [PATCH] /admin/products/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
    const status = req.params.status;
    const id = req.params.id;

    //updateOne update 1 san pham mongoose ho tro san {id can lay} {truong can cap nhat}
    await Product.updateOne({ _id: id }, { status: status });
    req.flash("success", "Cập nhật trạng thái sản phẩm thành công!");
    //Moi lan doi trang thai bi link sang trang khac (khac phuc doc docu cua Express co cai res.redirect)
    res.redirect("back"); // req.query la lay nhung cai sau dau ? tren url 
}
// [PATCH] /admin/products/change-multi
//cai them thu vien body parser để convert lại data trong body
module.exports.changeMulti = async (req, res) => {
    const type = req.body.type;
    const ids = req.body.ids.split(", ");

    switch (type) {
        case "active":
            await Product.updateMany({ _id: { $in: ids } }, { status: "active" }); // cách truyền id vào 
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);
            break;
        case "inactive":
            await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" }); // cách truyền id vào 
            req.flash("success", `Cập nhật trạng thái thành công ${ids.length} sản phẩm`);
            break;
        case "delete-all":
            await Product.updateMany({ _id: { $in: ids } }, {
                deleted: true,
                deleteAt: new Date(),
            }); // cách truyền id vào 
            req.flash("success", `Đã xóa thành công ${ids.length} sản phẩm`);
            break;
        case "change-position":
            for (const item of ids) {
                let [id, position] = item.split("-");
                position = parseInt(position);
                await Product.updateOne({ _id: id }, {
                    position: position
                });
            }
            req.flash("success", `Đổi vị trí thành công ${ids.length} sản phẩm`);
            break;
        default:
            break;
    }
    res.redirect("back");
};

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
    const id = req.params.id;

    //updateOne update 1 san pham mongoose ho tro san {id can lay} {truong can cap nhat}
    //await Product.deleteOne({_id: id}); // xóa cứng hàm mongoonse cung cấp sẵn, thì trong database cũng mất luôn
    await Product.updateOne({ _id: id }, {
        deleted: true,
        deleteAt: new Date()
    });
    req.flash("success", `Đã xóa thành công thành công sản phẩm`);
    //Moi lan doi trang thai bi link sang trang khac (khac phuc doc docu cua Express co cai res.redirect)
    res.redirect("back"); // req.query la lay nhung cai sau dau ? tren url 
}
// [GET] /admin/products/create
module.exports.create = async (req, res) => {

    let find = {
        deleted: false
    };


    const category = await ProductCategory.find(find);

    const newCategory = createTreeHelper.tree(category);

    res.render("admin/pages/products/create", {
        pageTitle: "Thêm mới sản phẩm",
        category: newCategory

    });
}
// [P] /admin/products/create
module.exports.createPost = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);

    if (req.body.position == "") {
        const countProducts = await Product.count();
        req.body.position = countProducts + 1;
    } else {
        // Nếu người ta truyền vào
        req.body.position = parseInt(req.body.position);
    }

    // if (req.file) {
    //     req.body.thumbnail = `/uploads/${req.file.filename}`
    // }
    const product = new Product(req.body); // tạo bên phía model
    await product.save();


    res.redirect(`${prefixAdmin}/products`);
}
// [GET] /admin/products/edit/:id
module.exports.edit = async (req, res) => {

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);

    
        const category = await ProductCategory.find({
            deleted: false
        });
    
        const newCategory = createTreeHelper.tree(category);

        res.render("admin/pages/products/edit", {
            pageTitle: "Chỉnh sửa sản phẩm",
            product: product,
            category: newCategory
        });
    } catch (error) {
        res.redirect(`${prefixAdmin}/products`);
    }
};

// [PATCH] /admin/products/edit/:id
module.exports.editPatch = async (req, res) => {
    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    req.body.position = parseInt(req.body.position);


    if (req.file) {
        req.body.thumbnail = `/uploads/${req.file.filename}`
    }

    try {
        await Product.updateOne({
            _id: id
        }, req.body);
        req.flash("success", `cập nhật sản phẩm thành công`);
    } catch (error) {
        req.flash("error", `cập nhật sản phẩm thất bại`);
    }



    res.redirect("back");
}



module.exports.detail = async (req, res) => {

    try {
        const find = {
            deleted: false,
            _id: req.params.id
        };

        const product = await Product.findOne(find);

        res.render("admin/pages/products/detail", {
            pageTitle: product.title,
            product: product
        });
    } catch (error) {
        res.redirect(`${prefixAdmin}/products`);
    }
};