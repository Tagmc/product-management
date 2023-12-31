const Cart = require("../../models/carts.model");
const Product = require("../../models/products.models");
const productsHelper = require("../../helpers/products");
//[GET] /cart/
module.exports.index = async (req, res) => {

  const cartId = req.cookies.cartId;
  const cart = await Cart.findOne({
    _id: cartId
  });
  if (cart.products.length > 0) {
    for (const item of cart.products) {
      const productId = item.product_id;
      const productInfo = await Product.findOne({
        _id: productId,

      }).select("title thumbnail slug price discountPercentage");

      productInfo.priceNew = productsHelper.priceNewProduct(productInfo);
      item.totalPrice = productInfo.priceNew * item.quantity;

      item.productInfo = productInfo;
    }
  }
  cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);
  res.render("client/pages/cart/index", {
    pageeTitle: "Giỏ hàng",
    cartDetail: cart
  });
};


// [POST] /cart/add/:productId
module.exports.addPost = async (req, res) => {
  const productId = req.params.productId;
  const quantity = parseInt(req.body.quantity);
  const cartId = req.cookies.cartId;

  // console.log(productId);
  // console.log(quantity);
  // console.log(cartId);

  const cart = await Cart.findOne({
    _id: cartId
  });

  const existProductInCart = cart.products.find(item => item.product_id == productId);

  if (existProductInCart) {
    const quantityNew = quantity + existProductInCart.quantity;
    //console.log(quantityNew);

    await Cart.updateOne({
      _id: cartId,
      "products.product_id": productId
    }, {
      $set: {
        "products.$.quantity": quantityNew
      }
    });
  } else {
    const objectCart = {
      product_id: productId,
      quantity: quantity
    };

    await Cart.updateOne(
      {
        _id: cartId
      },
      {
        $push: { products: objectCart }
      }
    );
  }

  req.flash("success", "Đã thêm sản phẩm vào giỏ hàng!");

  res.redirect("back");
}

//[GET] /cart/delete/:productId
module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;

  await Cart.updateOne({
    _id: cartId
  }, {
    $pull: { products: { product_id: productId } }
  });

  req.flash("success", "Xóa sản phẩm khỏi giỏ hàng thành công!");
  res.redirect("back");
}

//[GET] /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const productId = req.params.productId;
  const quantity = req.params.quantity;


  await Cart.updateOne({
    _id: cartId,
    "products.product_id": productId,
  }, {
    $set: {
      "products.$.quantity": quantity, // cập nhật quantity cho các phần tử trong mảng
    },
  });

  req.flash("success", "Cập nhật giỏ hàng thành công!");
  res.redirect("back");
}