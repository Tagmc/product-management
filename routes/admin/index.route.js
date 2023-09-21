const dashboardRouter = require("./dashboard.route");
const productRouter = require("./product.route");
const systemConfig = require("../../config/system")
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
    app.use(PATH_ADMIN + "/products", productRouter);
}
// bình thường là export nhưng trong expressjs dùng module.export