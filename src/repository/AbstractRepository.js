import { AbstractModel } from "../model/AbstracModel.js";

class AbstractRepository {
    constructor() {
        this.repository = [];
    }

    // Create
    create({ name }) {
        const item = new AbstractModel();

        Object.assign(item, {
            name,
        });

        this.repository.push(item);
    }

    // Delete
    delete({ id }) {
        const itemIndex = this.repository.findIndex((item) => item.id == id);
        this.repository.splice(itemIndex, 1);
    }

    // Edit
    edit({ id, name }) {
        const item = this.repository.find((item) => item.id == id);

        item.name = name;

        const itemIndex = this.repository.findIndex((itemIndex) => item.id == id);

        Object.assign(this.repository[itemIndex], item);

        return item;
    }

    // Find by name
    findByName({ name }) {
        const item = this.repository.find((item) => item.name == name);
        return item;
    }

    // Find by ID
    findById({ id }) {
        const item = this.repository.find((item) => item.id == id);
        return item;
    }

    // List
    list() {
        return this.repository;
    }
}

export { AbstractRepository };