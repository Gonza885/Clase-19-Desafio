import { Router } from "express";
import userModel from "../models/Users.model.js";
const router = Router();

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Email:", email);
  console.log("Password:", password);

  const user = await userModel.findOne({ email, password });

  if (!user) {
    return res
      .status(400)
      .send({ status: "error", error: "Credenciales incorrectas" });
  }

  if (
    user.email === "adminCoder@coder.com" &&
    user.password === "adminCod3r123"
  ) {
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: "admin",
    };
  } else {
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      role: "usuario",
    };
  }

  return res.redirect("/products");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;
  const exist = await userModel.findOne({ email });

  if (exist) {
    return res
      .status(400)
      .send({ status: "error", error: "Usuario ya existe" });
  }

  const user = {
    first_name,
    last_name,
    email,
    age,
    password,
  };
  let result = await userModel.create(user);
  res.send({ status: "success", message: "Usuario registrado" });
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }

    res.redirect("/login");
  });
});

export default router;
