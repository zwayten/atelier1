const { Product } = require("../models/Product");
const users = [
    "213ESP0190",
    "213ESP0191",
    "213ESP0192",
    "213ESP0193",
    "213ESP0194"
];

module.exports = {
    showCreateProduct: (req, res) => {
        res.render("create");
    },
    createProduct: async(req, res) => {
        // req.writeHead({ 'id': '213ESP0192' });
        const { id } = req.headers;
        // console.log(req.body);
        // console.log(id);

        /*
         if (!id) {
             console.log("l'id doit être passer en parametre du header !##### erreur 401 #####");
             return res.status(401).end();
         }
         if (users.indexOf(id) == -1) {
             console.log("user introuvable ! ##### erreur 404 #####");
             return res.status(404).end();
         } */

        const product = new Product({
            ...req.body
        });
        if (req.file) {
            product.image = req.file.path;
        }
        product.user = id;

        await product.save();
        res.json(product)

    },
    getProductsByUser: async(req, res) => {
        const { id } = req.headers;
        if (!id) {
            console.log("l'id doit être passer en parametre du header !##### erreur 401 #####");
            return res.status(401).end();
        }
        if (users.indexOf(id) == -1) {
            console.log("user introuvable ! ##### erreur 404 #####");
            return res.status(404).end();
        }
        const productsByUser = await Product.find({ user: id })
        res.json(productsByUser);
    },
    getAllProducts: async(req, res) => {
        const allProducts = await Product.find();
        res.render("list", { allProducts });
        // return res.json(allProducts);
    },
    getProductById: async(req, res) => {
        const { id } = req.params;
        const productDetail = await Product.findById(id);
        productDetail.image = productDetail.image.replace("uploads/", "");
        res.render("detail", { productDetail });
    },
    deleteProductById: async(req, res) => {
        const { id } = req.params;
        await Product.deleteOne({ _id: id })
        res.redirect('/products/all')

    }
}