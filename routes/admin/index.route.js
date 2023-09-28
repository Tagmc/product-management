const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const systemConfig = require("../../config/system")
const productCategoryRouter = require("./products-category.route");
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
    app.use(PATH_ADMIN + "/products", productRouter);
    app.use(PATH_ADMIN + "/products-category", productCategoryRouter);

}
// bình thường là export nhưng trong expressjs dùng module.export