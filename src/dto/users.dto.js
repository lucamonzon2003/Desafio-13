import _ from 'lodash'

export class UserCreateDTO {
    constructor(user) {
        this.name = user.name
        this.email = user.email
        this.password = user.password
        this.lastName = user.lastName
        this.age = user.age
        this.alias = user.alias
        this.avatar = user.avatar
    }
    build(){
        if(_.isEmpty(this.name)) throw new Error('name is required');
        if(_.isNil(this.email)) throw new Error('email is required');
        if(_.isNil(this.password)) throw new Error('password is required');
        // if(_.isNil(this.lastName)) throw new Error('lastName is required');
        return this;
    }
}

export class UserResponseDTO {
    constructor(user){
        this.name = user.name
        this.lastName = user.lastName
        this.alias = user.alias
        this.avatar = user.avatar
        this.email = user.email
    }
    build(){
        return this
    }
}