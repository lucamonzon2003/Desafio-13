import bcrypt from 'bcrypt';
import userService from '../services/user.service.js';
import { UserResponseDTO } from '../dto/users.dto.js';

class AuthService {
    constructor() {
    }
    async login(email, password) {
        try {
            const data = await userService.getById(email);
            if (!data) return false;
            const user = data[0]
            await bcrypt.compare(password, user.password).then(function (result) {
                if (!result) return false;
            });
            return new UserResponseDTO(user).build()
        } catch (err) {
            throw new Error(err)
        }
    }
    async register(data) {
        try {
            const user = await userService.create(data)
            return new UserResponseDTO(user).build()
        } catch (err) {
            throw new Error(err)
        }
    }

}

export default new AuthService();
