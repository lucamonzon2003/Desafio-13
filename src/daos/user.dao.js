import Cmongodb from "../containers/C-mongodb.js";
import { usersModel } from "../models/user.model.js";
import _ from 'lodash'

class UsersMongo extends Cmongodb {
    constructor() {
        super(usersModel);
    }
    async getById(email) {
        const data = await this.model.find({ email: email });
        if (_.isNil(data)) throw new Error('item not found');
        return data;
    }
    async remove(email) {
        await this.model.deleteOne({ email: email });
    }
};

export default new UsersMongo();