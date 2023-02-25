import { promises as fs } from 'fs'


export default class ProductManager {
    constructor() {
        this.path = "./src/models/productos.txt"
    }
    static idUnico() {
        if (this.idUnic) {
            this.idUnic++
        } else {
            this.idUnic = 1
        }
        return this.idUnic
    }
    resetTxt = async () => {
        const resetTxt = []
        await fs.writeFile(this.path, JSON.stringify(resetTxt))
    }

    addProduct = async (producto) => {
        const readProduct = await this.getProducts()
        producto.id = ProductManager.idUnico()
        console.log("esto es producto en addproduct", producto)
        readProduct.push(producto)
        await fs.writeFile(this.path, JSON.stringify(readProduct))
        return "producto agregado con exito"
    }
  
    getProducts = async () => {
        const readProduct = await fs.readFile(this.path, 'utf-8')
        console.log("esto es readporoduct en getproduct")
        return JSON.parse(readProduct)

    }
    getProductById = async (id) => {
        // logica para obtener un producto por id
        const readProduct = await this.getProducts()
        if (readProduct.find(producto => producto.id === id)) {
            return readProduct
        }
        else return "producto con id " + id + " no encontrado"
    }
    updateProduct = async(id,{title,description,price,thumbnail,code,stock}) => {
        const updatePr = await this.getProducts()
        if(updatePr.some(prod => prod.id === parseInt(id))){
            let updateInd = updatePr.findIndex(producto => producto.id === parseInt(id))
            updatePr[updateInd].title = title
            updatePr[updateInd].description = description
            updatePr[updateInd].price = price
            updatePr[updateInd].thumbnail = thumbnail
            updatePr[updateInd].code = code
            updatePr[updateInd].stock = stock
            await fs.writeFile(this.path, JSON.stringify(updatePr))
            return "producto actualizado"
        }else{
            return "producto no encontrado"
        }
    }
    deleteProduct = async (id) => {
        const productTxt = await this.getProducts()
        console.log("esto es producttxt en delete", productTxt)
        if (productTxt.some(producto => producto.id === parseInt(id))) {
            const fileProduct = productTxt.filter(producto => producto.id !==parseInt(id))
              console.log(typeof fileProduct,'esto es fileproduct')
            await fs.writeFile(this.path, JSON.stringify(fileProduct))
            return "producto eliminado"
        } else {
            return "no se encontro producto"
        }
    }
}
