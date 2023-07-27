import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";

const app = express();
app.use(cookieParser());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://Gonza88:olakease88@cluster0.6hwivlp.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 15,
    }),
    secret: "12345abcd",
    resave: false,
    saveUninitialized: false,
  })
);

const server = app.listen("8080", () => console.log("Server Arriba"));

app.get("/", (req, res) => {
  req.session.counter = 1;
  res.send("Bienvenido");
});
