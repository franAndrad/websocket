let products = []
class ProductController {
    constructor() {
    }
    getAll(req, res) {
        try {
            res.render("products", { products: products, empty: products.length === 0 ? true : false })
        } catch (error) {
            console.log("Error en obtener productos", error);
        }
    }
    addProduct(req, res) {
        try {
            const { title, price, thumbnail } = req.body
            const product = { title: title, price: price, thumbnail: thumbnail }
            if (products.length === 0) {
                product.id = 1
            }
            else {
                const lastId = products[products.length - 1].id
                product.id = lastId + 1
            }
            products.push(product)
            console.log(products);
            res.redirect("/")
        } catch (error) {
            console.log("Error en agregar productos", error);
        }
    }
}

module.exports = ProductController