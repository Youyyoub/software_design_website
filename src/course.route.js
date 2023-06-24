import Router from "express";
import { CourseRepository } from "./repository/CourseRepository.js";

const courseRoute = Router();

const courseRepository = new CourseRepository(); 

courseRoute.post("/", (request, response) => {
    const { name, description, content } = request.body;

    const courseAlreadyExists = courseRepository.findByName({ name });
    
    if (courseAlreadyExists) {
        return response.status(404).json({ error: "Course already exists." });
    }

    courseRepository.create({ name, description, content });
    return response.status(201).send();
});

courseRoute.get("/", (request, response) => {
    const allCourses = courseRepository.list();
    return response.status(201).json(allCourses);
});

courseRoute.delete("/:id", (request, response) => {
    const { id } = request.params;
    const course = courseRepository.findById({ id });

    if (!course) {
        return response.status(404).json({ error: "Course not found." });
    }

    courseRepository.delete({ id });
    return response.status(201).send();
});

courseRoute.patch("/:id", (request, response) => {
    const { id } = request.params;
    const { name, description, content } = request.body;

    const course = courseRepository.findById({ id });

    if (!course) {
        return response.status(404).json({ error: "Course not found."});
    }

    const updatedCourse = courseRepository.edit({ id, name, description, content });
    return response.status(201).json(updatedCourse);
});

export { courseRoute };