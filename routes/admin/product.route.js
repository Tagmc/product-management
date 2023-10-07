const express = require("express");
const router = express.Router();

const multer = require("multer");
//const storageMulter = require("../../helpers/storagemulter")

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");


const upload = multer() //dest là đứng từ thư mục gốc 
const controller = require("../../controller/admin/product.controller");
const validate = require("../../validates/admin/products.validates");
router.get("/", controller.index);

router.patch("/change-status/:status/:id", controller.changeStatus); // : la de truyen data dong
router.patch("/change-multi", controller.changeMulti);

router.delete("/delete/:id", controller.deleteItem); // : la de truyen data dong

router.get("/create", controller.create);

//middleware
router.post(
    "/create",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit);

router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    uploadCloud.upload,
    validate.createPost,
    controller.editPatch);

router.get("/detail/:id", controller.detail);


module.exports = router;