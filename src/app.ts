import express from "express";
import stepRouter from "./routes/stepRoutes";
import goalRouter from "./routes/goalRoutes";
import friendRouter from "./routes/friendRoutes";
import authRouter from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번에서 대기중");
});

app.use('/', stepRouter);
app.use('/', goalRouter);
app.use('/', friendRouter);
app.use('/', authRouter);