import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const usersCollection = 'users';

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        // require: true
    },
    age: {
        type: Number
    },
    alias: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'https://cdn2.vectorstock.com/i/1000x1000/57/91/profile-avatar-icon-design-template-vector-28515791.jpg'
    }
})

usersSchema.pre('save', async function(next) {
    const user = this
    if (!user?.alias) {
        user.alias = user.name;
    }
    await bcrypt.hash(user.password, 10).then(function(password) {
            return user.password = password;
    });
    next()
})

usersSchema.pre('update', () => {
    if (this.password) {
        bcrypt.hash(this.password, 10, (error, password) => {
            if (!error) {
                this.password = password;
                return
            }
            throw new Error("Unexpected error: on presave user")
        })
    }
})
//TODO update me parece que va a fallar

export const usersModel = mongoose.model(usersCollection, usersSchema);