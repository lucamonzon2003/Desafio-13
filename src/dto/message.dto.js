import _ from 'lodash'

export class MessageCreateDTO {
    constructor(message) {
        this.author = message.author
        this.mensaje = message.mensaje
    }
    build(){
        if(_.isNil(this.author)) throw new Error('author is required');
        if(_.isNil(this.mensaje)) throw new Error('mensaje is required');
        return this
    }
}

export class MessageResponseDTO {
    constructor(message){
        this.author = message.author
        this.mensaje = message.mensaje
    }
    build(){
        return this
    }
}

//TODO descubrir como hago para solo devolver alias y avatar