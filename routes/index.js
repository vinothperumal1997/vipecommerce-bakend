const express = require("express");
const userSignUpController = require("../controllers/userSignup");
const {
  userSignInController,
  logout,
} = require("../controllers/authController");
const authToken = require("../middleware/authToken");
const allUsers = require("../controllers/user/allUsers");
const allProducts = require("../controllers/product/allProducts");
const updateProduct = require("../controllers/product/updateProduct");
const updateUser = require("../controllers/user/updateUser");
const UploadProductController = require("../controllers/product/uploadProduct");
const userDetailsController = require("../controllers/user/userDetails");
const getCategoryProduct = require("../controllers/product/getCategorySingleProduct");

const getCategoryWiseProduct = require("../controllers/product/getCategoryProducts");
const getProductDetails = require("../controllers/product/getProductDetails");
const addToCart = require("../controllers/user/addToCart");
const countAddToCartProduct = require("../controllers/user/countAddToCartProduct");
const addToCartViewProduct = require("../controllers/user/addToCartViewProduct");
const sellerSignUp = require("../controllers/seller/sellerSignup");
const sellerSignInController = require("../controllers/seller/sellerSignIn");
const updateAddToCartProduct = require("../controllers/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../controllers/user/deleteAddToCartProduct");
const router = express.Router();
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/userdetails", authToken, userDetailsController);
router.get("/allproducts", authToken, allProducts);
router.get("/allusers", authToken, allUsers);

router.put("/updateuser", authToken, updateUser);
router.put("/updateproduct", authToken, updateProduct);
router.get("/userlogout", logout);
router.post("/uploadproduct", authToken, UploadProductController);
router.post("/getcategory", getCategoryProduct);
// getCategoryAllProduct;
router.post("/category-product", getCategoryWiseProduct);
// getProductDetails
router.post("/product-details", getProductDetails);
// user add to cart
// countAddToCartProduct;
router.post("/addtocart", authToken, addToCart);
router.get("/countaddtocart", authToken, countAddToCartProduct);
router.get("/viewCart-products", authToken, addToCartViewProduct);
router.put("/update-cart", authToken, updateAddToCartProduct);
router.delete("/remove-cart", authToken, deleteAddToCartProduct);

// seller
router.post("/sellersignup", sellerSignUp);
router.post("/sellersignin", sellerSignInController);

module.exports = router;
