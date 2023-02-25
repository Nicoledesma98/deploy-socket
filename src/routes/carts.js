import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const cartManager = new CartManager()
const routerCart = Router()

routerCart.get('/:cid' , async (req,res) =>{
    const carrito = await cartManager.getCart()
    console.log("esto es carrito en router",carrito)
    const cid = parseInt(req.params.cid)
    const prueba = carrito.find(prod => prod.id === cid)
    console.log("esto es prueba",prueba)
    await cartManager.getCartByCid(cid)
    return res.send(prueba)
})
routerCart.get('/', async (req, res) => {
    const carrito = await cartManager.getCart();
    console.log("esto es products en appget", carrito)
    return res.send(carrito);
  });

routerCart.post('/',async (req,res) =>{
    const carrito = await cartManager.creatCart()
    console.log('esto es post carrito',carrito)
    res.send(carrito)
})
routerCart.post('/:cid/product/:pid',async (req,res) =>{
    const carts = await cartManager.getCart()
    console.log('esto es carts', carts)
    console.log(typeof carts)
    const cid = parseInt(req.params.cid)//anda
    console.log('esto es cid ',cid)
    console.log('esto es cid ',typeof cid)
    const pid = parseInt(req.params.pid)//anda
    console.log('esto es pid ',pid)
    console.log('esto es pid ',typeof pid)
    const cantidad = 1
    const carritoIndex = carts.find(prod => prod.id === cid)//andaa
    console.log("esto seria carritoindex en post",carritoIndex)
    if(!carritoIndex){return 'carrito no encontrado'}
    const productIndex = carritoIndex.product.findIndex((p)=>p.id === pid)
    console.log('esto es productindex', productIndex)///anda
    if (productIndex === -1) {
        carritoIndex.product.push({ id: pid, cantidad });
      } else {
        carritoIndex.product[productIndex].cantidad += cantidad;
      }
    
      const carrito = await cartManager.addCart(carritoIndex)//anda
      console.log('esto es post carrito de addproduct',carrito)
    res.send("agregado exitosamente")
})



export default routerCart
