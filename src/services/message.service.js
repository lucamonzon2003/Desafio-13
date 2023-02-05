import 'dotenv/config'
import dbService from '../containers/C-mongodb.js'
import { MessageCreateDTO } from '../dto/message.dto'

class MessageService {
    constructor() {
        this.dao = new dbService();
    }
    async getAll() {
        const messages = await this.dao.getAll()
        return messages;
    }
    async getById(id) {
        try {
            const message = await this.dao.getById(id)
            return message;
        } catch (err) {
            if (err.message === "Item not found") {
                throw new Error(`Message not found with id: ${id}`)
            }
            throw err;
        }

    }
    async create(obj) {
        const messageDto = new MessageCreateDTO(obj);
        const newMessage = await this.dao.create(messageDto);
        return newMessage;

    }
    async remove(id) {
        await this.dao.remove(id);
    }
    async update(obj, id) {
        try {
            const message = await this.dao.update(obj, id)
            return message;
        } catch (err) {
            if (err.message === "Item not found") {
                throw new Error(`message not found with id: ${id}`)
            }
            throw err;
        }
    }
}

export default new MessageService();

