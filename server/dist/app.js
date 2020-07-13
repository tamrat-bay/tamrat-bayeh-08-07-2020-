"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const mongoose_1 = __importDefault(require("mongoose"));
const verifyToken_1 = __importDefault(require("./helpers/verifyToken"));
const authHelper_1 = require("./helpers/authHelper");
const tasksHelper_1 = require("./helpers/tasksHelper");
const app = express_1.default();
const Port = process.env.PORT || 5000;
const MongoURI = "mongodb+srv://funsports:11221122@cluster0-gfrt7.mongodb.net/propit-task?retryWrites=true&w=majority";
app.use(express_1.default.json());
mongoose_1.default
    .connect(MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log("MongoDb is Connected"))
    .catch((err) => console.log(err));
//Authentication
app.post("/users/register", (req, res) => {
    return authHelper_1.register(req, res);
});
app.post("/users/login", (req, res) => {
    return authHelper_1.login(req, res);
});
app.get("/tasks/:userId", verifyToken_1.default, (req, res) => {
    return tasksHelper_1.getTaskHelper(req, res);
});
app.post("/tasks/:userId", verifyToken_1.default, (req, res) => {
    return tasksHelper_1.postTaskHelper(req, res);
});
app.put("/tasks/:id", verifyToken_1.default, (req, res) => {
    return tasksHelper_1.editTaskHelper(req, res);
});
app.delete("/tasks/:id", verifyToken_1.default, (req, res) => {
    return tasksHelper_1.deleteTaskHelper(req, res);
});
if (process.env.NODE_ENV === "production") {
    const buildPath = path_1.default.join(__dirname, "..", "..", "client", "build");
    app.use(express_1.default.static(buildPath));
    // --- handle unknown route
    app.get("*", (req, res) => {
        const indexHtmlPath = path_1.default.join(buildPath, "index.html");
        res.sendFile(indexHtmlPath);
    });
}
else {
    console.log("development mode");
}
app.listen(Port, () => console.log(`Server is listening on port ${Port}`));
