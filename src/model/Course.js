import { AbstractModel } from "./AbstracModel.js";

class Course extends AbstractModel {
    description;
    content;
    created_at;
    updated_at;

    constructor() {
        super();
    }
}

export { Course };