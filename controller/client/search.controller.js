const Product = require("../../models/products.models");
const productsHelper = require("../../helpers/products")

//[GET] /search
module.exports.index = async (req, res) => {
    const keyword = req.query.keyword;
    let newProducts = [];
    if(keyword) {
        const regex = new RegExp(keyword, "i") //i là k phân biệt chữ hoa chữ thường, g là global, m là multipleline
        const products = await Product.find({
            title: regex,
            deleted: false,
            status: "active"
        });
        newProducts = productsHelper.priceNewProduct(products);
    }
    res.render("client/pages/search/index", {
        pageTitle: "Kết quả tìm kiếm",
        keyword: keyword,
        products: newProducts
    }); 
}