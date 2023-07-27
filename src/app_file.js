import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";

const fileStorage = FileStore(session);
const app = express();
app.use(cookieParser());

app.use(
  session({
    store: new fileStorage({ path: "./sessions", ttl: 100, retries: 0 }),
    secret: "123456abcd",
    resave: false,
    saveUninitialized: false,
  })
);

const server = app.listen("8080", () => console.log("Server Arriba"));

app.get("/", (req, res) => {
  req.session.counter = 1;
  res.send("Bienvenido");
});
