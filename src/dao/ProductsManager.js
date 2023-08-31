const fs = require("fs/promises")


class ProductsManager{
    constructor(filepath){
        this.filepath = filepath
    }


    async readProducts(){

        try {
        const books = await fs.readFile(this.filepath, "utf-8")
        const parsedBooks = JSON.parse(books)
        return parsedBooks
        } catch (error) {
            console.log(error)
        } 
    }

    async getProducts(){
        const jsonContent = await this.readProducts()
        try{
            if(jsonContent.length === 0) throw new Error("Not products found")
            else return jsonContent 
        } catch (error) {
            console.log("Not products found")
        }
    }


    async checkProductCode(code) {
        const jsonContent = await this.readProducts()
        return jsonContent.find((book) => book.code === code)
    }


    async addProduct(book){
        const jsonContent = await this.readProducts()
        if(await this.checkProductCode(book.code)) return console.log(`Product with code ${book.code} is already in the cart`)
        try{
            if(jsonContent.length !==0) await fs.writeFile(this.filepath, JSON.stringify([...jsonContent, {...book, id: jsonContent[jsonContent.length -1].id + 1}], null, 2), "utf-8")
            else await fs.writeFile(this.filepath, JSON.stringify([{...book, id: 1}]), "utf-8")
        } catch (error) {
            console.log(error)
        }
    }

    async getProductById(id){
        try {
            const jsonContent = await this.readProducts()

            const foundBook = jsonContent.find((book) => book.id === id)

            if(!foundBook) throw new Error (`Product with ID ${id} was not found`)
            else console.log(foundBook)

        } catch (error) {
            console.log(`Product with Id ${id} was not found`)
        }
    }

    async updateProduct(id, book){
        try {
            const jsonContent = await this.readProducts()
            const updatedBook = jsonContent.map((mapBook) => mapBook.id === id ? {...mapBook, ...book} : mapBook)
            if (!jsonContent.find((book) => book.id === id)) throw new Error(`Product with id ${id} was not found`)
            else await fs.writeFile(this.filepath, JSON.stringify(updatedBook, null, 2))
        } catch (error) {
            console.log(`Product with id ${id} was not found`)
        }
    }

    async deleteProductById(id){
        try{
            const jsonContent = await this.readProducts()
            const bookFound = jsonContent.filter((book) => book.id !== id)

            if(!jsonContent.find((book) => book.id === id)) throw new Error(`Product with id ${id} not found`)
            else await fs.writeFile(this.filepath, JSON.stringify(bookFound, null, 2))
        } catch (error){
            console.log(error)
        }
    }



}



const escribirFile = new ProductsManager("./src/dao/products.json")

escribirFile.deleteProductById(11)


module.exports = ProductsManager