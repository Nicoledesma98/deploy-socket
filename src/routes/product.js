import { Router } from "express"
import ProductManager from "../controllers/ProductManager.js"

const productManager = new ProductManager()
productManager.resetTxt()
const routerProd = Router()

routerProd.get('/:id',async (req,res) =>{
    const productos = await productManager.getProducts()
    console.log(productos,"esto es productos en ")
    const prueba  = productos.find( prod => prod.id === parseInt(req.params.id))
    console.log("esto es prueba",prueba)
    console.log(req.params.id)
    return res.send(prueba)
})
routerProd.get('/', async (req, res) => {
    const products = await productManager.getProducts();
    console.log("esto es products en appget", products)
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    const limitedProducts = products.slice(0, limit);
    console.log("esti es limitedproducts", limitedProducts)
    return res.send(limitedProducts);
  });

routerProd.post('/', async (req,res) =>{
    const producto = await productManager.addProduct(req.body)
    console.log("esto es products en apppost", producto)
    res.send(producto)
})
routerProd.delete('/:id', async (req, res) => {
    const productos = await productManager.deleteProduct(req.params.id) 
    res.send(productos)
})
routerProd.put('/:id', async (req,res)=>{
    let producto = await productManager.updateProduct(req.params.id, req.body)
    res.send(producto)

})
export default routerProd