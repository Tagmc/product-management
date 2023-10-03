const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const systemConfig = require("../../config/system")
const productCategoryRouter = require("./products-category.route");
const roleRoutes = require("./role.route");
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
    app.use(PATH_ADMIN + "/products", productRouter);
    app.use(PATH_ADMIN + "/products-category", productCategoryRouter);
    app.use(PATH_ADMIN + "/roles", roleRoutes);

}
// bình thường là export nhưng trong expressjs dùng module.export