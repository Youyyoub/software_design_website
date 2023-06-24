import Router, { response } from "express";
import { ThemeRepository } from "./repository/ThemeRepository.js";

const themeRoute = Router();

const themeRepository = new ThemeRepository();

themeRoute.post("/", (request, response) => {
    const { name, topics } = request.body;

    const themeAlreadyExists = themeRepository.findByName({ name });

    if (themeAlreadyExists) {
        return response.status(404).json({ error: "Theme already exists."});
    }

    themeRepository.create({ name, topics });
    return response.status(201).send();
});

themeRoute.get("/", (request, response) => {
    const allThemes = themeRepository.list();
    return response.status(201).json(allThemes);
});

themeRoute.delete("/:id", (request, response) => {
    const { id } = request.params;
    const theme = themeRepository.findById({ id });

    if (!theme) {
        return response.status(404).json({ error: "Theme not found." });
    }

    themeRepository.delete({ id });
    return response.status(201).send();
});

themeRoute.patch("/:id", (request, response) => {
    const { id } = request.params;
    const { name, topics } = request.body;

    const theme = themeRepository.findById({ id });

    if (!theme) {
        return response.status(404).json({ error: "Theme not found."});
    }

    const updatedTheme = themeRepository.edit({ id, name, topics });
    return response.status(201).json(updatedTheme);
});

themeRoute.post("/:themeName", (request, response) => {
    const { themeName } = request.params;
    const { topicName } = request.body;

    const theme = themeRepository.findByName({ themeName });
    const topicAlreadyInTheme = theme.topics.find((topic) => topic.name == topicName);

    if (topicAlreadyInTheme) {
        return response.status(404).json({ error: `${topicName} already in ${themeName}.`});
    }

    themeRepository.addTopic({ themeName, topicName });
    return response.status(201).send();
});

themeRoute.delete("/:themeName/:topicName", (request, response) => {
    const { themeName, topicName } = request.params;

    const theme = themeRepository.findByName({ themeName });
    if (!theme) {
        return response.status(404).json({ error: "Theme not found." });
    }

    const topic = theme.topics.find((topic) => topic.name == topicName);
    if (!topic) {
        return response.status(404).json({ error: "Topic not found." });
    }

    themeRepository.removeTopic({ themeName, topicName });
    return response.status(201).send();
});

export { themeRoute };