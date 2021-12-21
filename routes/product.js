const router = require("express").Router();
const productController = require("../controllers/Product");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        const newFileName = (+new Date()).toString() + path.extname(file.originalname);
        cb(null, newFileName);
    }
})

const upload = multer({ storage });

router.route("/")
    .post(upload.single("image"), productController.createProduct)
    .get(productController.showCreateProduct);
//.get(productController.getProductsByUser);

router.get("/all", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.get("/delete/:id", productController.deleteProductById);


module.exports = router;