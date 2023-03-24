import _ from 'lodash';

class Cmongodb {
    constructor(model){
        this.model = model;
    }
    async create(obj){
        const newObj = await this.model.create(obj)
        return newObj
    }
    async getAll(){
        const data = await this.model.find()
        return data;
    }
    async getById(){
        const data = await this.model.findById(id);
        if (isNil(data) || isNull(data)) throw new Error('item not found');
        return data
    }
    async update(update, id){
        try {
            const dataUpdated = await this.model.findByIdAndUpdate(id, update, {
                new: true
            });
            return dataUpdated;
        } catch(err) {
            if (typeof err === "DocumentNotFoundError") {
                throw new Error("Item not found");
            }
        }
    }
    async remove(id){
        await this.model.deleteOne({_id: id});
    }
}

export default Cmongodb;