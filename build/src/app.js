"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stepRoutes_1 = __importDefault(require("./routes/stepRoutes"));
const goalRoutes_1 = __importDefault(require("./routes/goalRoutes"));
const friendRoutes_1 = __importDefault(require("./routes/friendRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
app.set("port", process.env.PORT || 3000);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.listen(app.get("port"), () => {
    console.log(app.get("port"), "번에서 대기중");
});
app.use('/', stepRoutes_1.default);
app.use('/', goalRoutes_1.default);
app.use('/', friendRoutes_1.default);
app.use('/', authRoutes_1.default);
