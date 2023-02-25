import express from "express";
import routerProd from "./routes/product.js";
import routerCart from "./routes/carts.js";
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import multer from "multer";
import { __dirname } from "./path.js";
import { __filename } from "./path.js";
import { engine } from "express-handlebars";//para servidores simples
import * as path from "path"
import routerSocket from "./routes/socket.js";
import { Server } from "socket.io";
// import {create} from "express-handlebars"//para servidores mas complejos
// const upload = multer({dest:'src/public/img'})///imagenes sin formato
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/public/img')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}--${file.originalname}`)
    }
})
const upload = multer({ storage: storage })
const app = express()
const PORT = 4000

const server = app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
})

const io = new Server(server)



//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname, "./views"))

//Routes
app.use('/', express.static(__dirname + '/public'))
app.use('/api/product', routerProd)
app.use('/',routerSocket)
app.use('/api/carts', routerCart)/////falta poner routerCard

app.post('/upload', upload.single('product'), (req, res) => {
    console.log(req.file)
    res.send('imagen cargada')
})
const mensajes = []
io.on('connection', (socket) =>{
    socket.on('mensaje',info => {
        mensajes.push(info)
        io.emit('mensajeLogs',mensajes)
    })
})
// app.get('/', (req, res) => {
//     res.render('home', {
//         titulo: "nico",
//         mensaje: "mundo"
//     })
// })

// io.on('connection', (socket) => {
//     console.log('conexion con socket')

//     socket.on('mensaje', info => {
//         console.log(info)
//     })
//     socket.broadcast.emit('evento-admi','hola desde server sos el admin')///broadcast = a un mensaje que esta en toda la app menos en el socket

//     socket.emit('evento-general','hola a todos los usuarios')

// })

