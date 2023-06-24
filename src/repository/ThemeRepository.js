import { Theme } from "../model/Theme.js";
import { AbstractRepository } from "./AbstractRepository.js";

class ThemeRepository extends AbstractRepository {
    constructor() {
        super();
    }

    // (@Override) Create
    create({ name, topics }) {
        const theme = new Theme();

        Object.assign(theme, {
            name,
            topics,
        });

        this.repository.push(theme);
    }

    // (@Override) Edit
    edit({ id, name, topics }) {
        const theme = this.repository.find((theme) => theme.id == id);
        
        theme.name = name;
        theme.topics = topics;

        const themeIndex = this.repository.findIndex((themeIndex) => theme.id == id);

        Object.assign(this.repository[themeIndex], theme);

        return theme;
    }

    // Add Topic
    addTopic({ themeName, topicName }) {
        const theme = this.repository.find((theme) => theme.name == themeName);
        theme.repository.push(topicName);
    }

    // Remove Topic
    removeTopic({ themeName, topicName }) {
        const theme = this.repository.find((theme) => theme.name == themeName);
        const topicIndex = theme.repository.findIndex((topic) => topic.name == topicName);
        theme.repository.courses.splice(topicIndex, 1);
    }
}

export { ThemeRepository };