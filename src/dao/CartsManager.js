const fs = require("fs/promises");

class CartsManager {
    constructor(filepath) {
        CartsManager.id += 0
        this.filepath = filepath;
    }


    async generateCart() {
        const cartProducts = await this.readCart();

        const newCart = {
            id: cartProducts.length + 1, // Assign the ID based on the number of existing carts
            productsInCart: []
        };

        cartProducts.push(newCart);

        await this.writeCart(cartProducts); // Write the updated cart list back to the file

        console.log("Empty cart generated and saved:", newCart);
    }

    async writeCart(cartList) {
        await fs.writeFile(this.filepath, JSON.stringify(cartList, null, 2));
    }

    async readCart() {
        try {
            const data = await fs.readFile(this.filepath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log("Cart is empty");
            return [];
        }
    }


    
    async addProductToCart(cid, pid) {
        const carProducts = await this.readCart();

        let indCart = carProducts.findIndex(c => c.id == cid);
        if (indCart == -1) {
            return { err: 'Invalid id' };
        }

        let productInd = carProducts[indCart].productsInCart.findIndex(prod => prod.id == pid)
        if (productInd == -1) {
            const add = { id: pid, quantity: 1 }

            carProducts[indCart].productsInCart.push(add)
            fs.writeFile(this.filepath, JSON.stringify(carProducts, null, 2))

            return { message: 'Product added', cart: carProducts[indCart].productsInCart };

        } else {
            carProducts[indCart].productsInCart[productInd].quantity += 1;

            fs.writeFile(this.filepath, JSON.stringify(carProducts, null, 2))

            return { message: 'Product added', cart: carProducts[indCart].productsInCart }
        }
    }





    async getCartByID(cid) {
        const carts = await this.readCart()
        let cartSearch = carts.find(cart => cart.id == cid)
        if (cartSearch) {
            console.log(cartSearch)
            return cartSearch
        } else {
            return console.log({error: "Invalid ID"})
        }
    }




}

// const test = new CartsManager("./src/dao/carts.json")
// test.getCartByID(2)