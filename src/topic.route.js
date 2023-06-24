import Router from "express";
import { TopicRepository } from "./repository/TopicRepository.js";

const topicRoute = Router();

const topicRepository = new TopicRepository();

topicRoute.post("/", (request, response) => {
    const { name, courses } = request.body;

    const topicAlreadyExists = topicRepository.findByName({ name });

    if (topicAlreadyExists) {
        return response.status(404).json({ error: "Topic already exists." });
    }

    topicRepository.create({ name, courses });
    return response.status(201).send();
});

topicRoute.get("/", (request, response) => {
    const allTopics = topicRepository.list();
    return response.status(201).json(allTopics);
});

topicRoute.delete("/:id", (request, response) => {
    const { id } = request.params;
    const topic = topicRepository.findById({ id });

    if (!topic) {
        return response.status(404).json({ error: "Topic not found." });
    }

    topicRepository.delete({ id });
    return response.status(201).send();
});

topicRoute.patch("/:id", (request, response) => {
    const { id } = request.params;
    const { name, courses } = request.body;

    const topic = topicRepository.findById({ id });

    if (!topic) {
        return response.status(404).json({ error: "Topic not found."});
    }

    const updatedTopic = topicRepository.edit({ id, name, courses });
    return response.status(201).json(updatedTopic);
});

topicRoute.post("/:topicName", (request, response) => {
    const { topicName } = request.params;
    const { courseName } = request.body;

    const topic = topicRepository.findByName({ topicName });
    const courseAlreadyInTopic = topic.courses.find((course) => course.name == courseName);

    if (courseAlreadyInTopic) {
        return response.status(404).json({ error: `${courseName} already in ${topicName}.`});
    }

    topicRepository.addCourse({ topicName, courseName });
    return response.status(201).send();
});

topicRoute.delete("/:topicName/:courseName", (request, response) => {
    const { topicName, courseName } = request.params;

    const topic = topicRepository.findByName({ topicName });
    if (!topic) {
        return response.status(404).json({ error: "Topic not found." });
    }

    const course = topic.courses.find((course) => course.name == courseName);
    if (!course) {
        return response.status(404).json({ error: "Course not found." });
    }

    topicRepository.removeCourse({ topicName, courseName });
    return response.status(201).send();
});

export { topicRoute };