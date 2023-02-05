import UserDao from "../daos/user.dao.js";
import { UserCreateDTO } from '../dto/users.dto.js';

class UserService {
    constructor(){
        this.dao = UserDao;
    }
    async create(data){
        const user = new UserCreateDTO(data).build();
        const newUser = await this.dao.create(user);
        return newUser;
    }
    async getAll(){
        const users = await this.dao.getAll();
        return users;
    }
    async getById(email){
        const user = await this.dao.getById(email);
        return user;
    }
    async remove(email){
        await this.dao.remove(email);
    }

}

export default new UserService();