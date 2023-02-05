import Cmongodb from "../containers/C-mongodb";
import { messagesModel } from "../models/message.model";

class MessageMongo extends Cmongodb {
    constructor(){
        super(messagesModel);
    }
};

export default new MessageMongo();