const dashboardRouter = require("./dashboard.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware")
const productRouter = require("./product.route");
const systemConfig = require("../../config/system")
const productCategoryRouter = require("./products-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route"); 
const authRoutes = require("./auth.route");
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRouter); // chạy qua middleware check xem có thỏa mãn k 
    app.use(PATH_ADMIN + "/products", productRouter);
    app.use(PATH_ADMIN + "/products-category", productCategoryRouter);
    app.use(PATH_ADMIN + "/roles", roleRoutes);
    app.use(PATH_ADMIN + "/accounts", accountRoutes);
    app.use(PATH_ADMIN + "/auth", authRoutes);
}
// bình thường là export nhưng trong expressjs dùng module.export