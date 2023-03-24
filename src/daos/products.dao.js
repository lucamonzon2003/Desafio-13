import e from "express";
import Cmongodb from "../containers/C-mongodb.js";
import { productsModel } from '../models/products.model.js';

class ProductsMongo extends Cmongodb {
    constructor() {
        super(productsModel);
    }
    async existingProduct(product) {
        await this.model.findOne({ title: product.title })
            .then(async (existingProduct) => {
                if (existingProduct) {
                    const stock = existingProduct.stock
                    await this.model.findByIdAndUpdate(existingProduct._id, { stock: stock + 1 }, { new: true })
                } else {
                    return false
                }
            })
    };
}
export default new ProductsMongo();