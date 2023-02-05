import Cmongodb from "../containers/C-mongodb.js";
import { productsModel } from '../models/products.model.js';

class ProductsMongo extends Cmongodb {
    constructor(){
        super(productsModel);
    }
};

export default new ProductsMongo();