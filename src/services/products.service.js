import 'dotenv/config'
import { ProductCreateDTO } from '../dto/product.dto.js'
import productsDao from '../daos/products.dao.js'
import _ from 'lodash'

class ProductService {
    constructor() {
        this.dao = productsDao;
    }
    async getAll() {
        const products = await this.dao.getAll()
        return products;
    }
    async getById(id) {
        try {
            const product = await this.dao.getById(id)
            return product;
        } catch (err) {
            if (err.message === "Item not found") {
                throw new Error(`Product not found with id: ${id}`)
            }
            throw err;
        }
    }
    async create(obj) {
        const productDto = new ProductCreateDTO(obj).build();
        const existingPr = await this.dao.existingProduct(productDto)
        if (existingPr == false) {
            productDto.stock = 1
            const newProduct = await this.dao.create(productDto);
            return newProduct;
        }
        return ("se añadio uno mas a stock")

    }
    async remove(id) {
        await this.dao.remove(id);
    }
    async update(obj, id) {
        try {
            const product = await this.dao.update(obj, id)
            return product;
        } catch (err) {
            if (err.message === "Item not found") {
                throw new Error(`Product not found with id: ${id}`)
            }
            throw err;
        }
    }
}

export default new ProductService();