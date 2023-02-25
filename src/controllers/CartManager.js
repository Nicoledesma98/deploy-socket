import { promises as fs, read } from 'fs'

export default class CartManager {
    constructor() {
        this.path = './src/models/carrito.txt';
        this.products = [];
    }
    static idUnico() {
        if (this.idUnic) {
            this.idUnic++
        } else {
            this.idUnic = 1
        }
        return this.idUnic
    }

    creatCart = async () => {
        const id = CartManager.idUnico()
        const cart = { id, product: [] }
        this.products.push(cart)
        await fs.writeFile(this.path, JSON.stringify(this.products))
        return cart
    }
    addCart = async (cart) => {
        const readCart = await this.getCart()
        console.log('esto es producto',cart)
        const index = readCart.findIndex((c) => c.id === cart.id);
        readCart[index] = cart;
        await fs.writeFile(this.path, JSON.stringify(readCart));
        return (readCart)

      
    }

    getCart = async () => {
        const readCart = await fs.readFile(this.path, 'utf-8')
        return JSON.parse(readCart)
    }


    getCartByCid = async (id) => {
        const readCart = await this.getCart()
        const orden = readCart.find(prod => prod.id === id)
        console.log('esto es orden',orden)
        return (readCart)
        
    }
}
    



