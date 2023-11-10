const productRouter = require("./product.route");
const homeRouter = require("./home.route");
const searchRouter = require("./search.route");
const cartRoutes = require("./cart.route");
const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");
const checkoutRouter = require("./checkout.route");
const userRouter = require("./user.route")
const userMiddleware = require("../../middlewares/client/user.middleware");
const settingMiddleware = require("../../middlewares/client/setting.middleware");
const chatRouter = require("../../routes/client/chat.route");
const authMiddleware = require("../../middlewares/client/auth.middleware")
const usersRouter = require("./users.route")
module.exports = (app) => {

    app.use(categoryMiddleware.category);
    app.use(cartMiddleware.cardId);
    app.use(userMiddleware.infoUser);
    app.use(settingMiddleware.settingGeneral);
    app.use("/", homeRouter);
    app.use("/products", productRouter);
    app.use("/search", searchRouter);
    app.use("/cart", cartRoutes);
    app.use("/checkout", checkoutRouter);
    app.use("/user", userRouter);
    app.use("/chat", authMiddleware.requireAuth, chatRouter);
    app.use("/users", authMiddleware.requireAuth, usersRouter);
}
// bình thường là export nhưng trong expressjs dùng module.export