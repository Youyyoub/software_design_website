import { Topic } from "../model/Topic.js";
import { AbstractRepository } from "./AbstractRepository.js";

class TopicRepository extends AbstractRepository {
    constructor() {
        super();
    }

    // (@Override) Create
    create({ name, courses }) {
        const topic = new Topic();

        Object.assign(topic, {
            name,
            courses,
        });

        this.repository.push(topic);
    }

    // (@Override) Edit
    edit({ id, name, courses }) {
        const topic = this.repository.find((topic) => topic.id == id);
        
        topic.name = name;
        topic.courses = courses;

        const topicIndex = this.repository.findIndex((topicIndex) => topic.id == id);

        Object.assign(this.repository[topicIndex], topic);

        return topic;
    }

    // Add course
    addCourse({ topicName, courseName }) {
        const topic = this.repository.find((topic) => topic.name == topicName);
        topic.courses.push(courseName);
    }

    // Remove course
    removeCourse({ topicName, courseName }) {
        const topic = this.repository.find((topic) => topic.name == topicName);
        const courseIndex = topic.courses.findIndex((course) => course.name == courseName);
        topic.courses.splice(courseIndex, 1);
    }
}

export { TopicRepository };