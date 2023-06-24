import express from "express";
import { courseRoute } from "./course.route.js";
import { topicRoute } from "./topic.route.js";
import { themeRoute } from "./theme.route.js";

const app = express();

app.use(express.json());

app.use("/courses", courseRoute);
app.use("/topics", topicRoute);
app.use("/themes", themeRoute)

const PORT = 4000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));