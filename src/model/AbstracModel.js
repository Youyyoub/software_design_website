import { v4 as uuidv4 } from "uuid";

class AbstractModel {
    id;
    name;

    constructor() {
        if(!this.id) {
            this.id = uuidv4();
        }
    }
}

export { AbstractModel };