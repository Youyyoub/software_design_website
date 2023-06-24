import { Course } from "../model/Course.js";
import { AbstractRepository } from "./AbstractRepository.js";

class CourseRepository extends AbstractRepository {
    constructor() {
        super();
    }

    // (@Override) Create
    create({ name, description, content }) {
        const course = new Course();

        Object.assign(course, {
            name,
            description,
            content,
            created_at: new Date(),
        });

        this.repository.push(course);
    }

    // (@Override) Edit
    edit({ id, name, description, content }) {
        const course = this.repository.find((course) => course.id == id);
        
        course.name = name;
        course.description = description;
        course.content = content;
        course.updated_at = new Date();

        const courseIndex = this.repository.findIndex((courseIndex) => course.id == id);

        Object.assign(this.repository[courseIndex], course);

        return course;
    }
}

export { CourseRepository };