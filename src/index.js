const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: IO } = require('socket.io')

const { engine } = require("express-handlebars")
const path = require("path")

const ProductController = require("../controllers/productController")
const productClass = new ProductController()

//--------------------------------------------
// instancio servidor, socket y api
const app = express()
const httpServer = new HttpServer(app)
const io = new IO(httpServer)

//--------------------------------------------
// configuro el socket 
const messages = []
const Products = []

io.on('connection', socket => {
    console.log('nuevo cliente conectado');

    
    socket.emit('message', messages)
    socket.emit('Products', Products)
    socket.on('new-message', data => {
        messages.push(data)
        io.sockets.emit('message', messages)
    })
    socket.on('new-product', data => {
        Products.push(data)
        io.sockets.emit('Products', Products)
    })

})

//--------------------------------------------
// agrego middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor
const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))

//Engine
app.engine(".hbs", engine({
    extname: ".hbs",
    defaultLayout: "tabla-productos.hbs",
    layoutsDir: path.join(__dirname, "/public/plantillas/tabla-productos"),
    partialsDir: path.join(__dirname, "../public/views/partials")
}))
app.set("view engine", "hbs")
app.set("views", path.join(__dirname, "/public/plantillas"))



