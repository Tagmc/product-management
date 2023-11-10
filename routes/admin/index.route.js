const dashboardRouter = require("./dashboard.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware")
const productRouter = require("./product.route");
const systemConfig = require("../../config/system")
const productCategoryRouter = require("./products-category.route");
const roleRoutes = require("./role.route");
const accountRoutes = require("./account.route"); 
const authRoutes = require("./auth.route");
const myAccount = require("./my-account.route");
const settingRoutes = require("./setting.route");
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    
    app.use(PATH_ADMIN + "/dashboard", authMiddleware.requireAuth, dashboardRouter); // chạy qua middleware check xem có thỏa mãn k 
    app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productRouter);
    app.use(PATH_ADMIN + "/products-category", authMiddleware.requireAuth, productCategoryRouter);
    app.use(PATH_ADMIN + "/roles", authMiddleware.requireAuth, roleRoutes);
    app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRoutes);
    app.use(PATH_ADMIN + "/auth", authRoutes);
    app.use(PATH_ADMIN + "/my-account", authMiddleware.requireAuth,myAccount);
    app.use(PATH_ADMIN + "/settings", authMiddleware.requireAuth,settingRoutes);
}
// bình thường là export nhưng trong expressjs dùng module.export