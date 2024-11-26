const express = require("express");
const router = express.Router();
const Validation = require("../services/Validation");
const { users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/Authentication");

router.post("/", async (req, res) => {
  const { email, password, username } = req.body;

  if (email && !Validation.isValidEmail(email)) {
    return res.json({ error: "Invalid Email" });
  }
  if (!Validation.isValidPassword(password)) {
    return res.json({ error: "Invalid Password" });
  }
  if (username && !Validation.isValidUsername(username)) {
    return res.json({ error: "Invalid Username" });
  }

  const user = await users.findOne({
    where: {
      email: email,
    },
  });

  if (user) {
    return res.json({ error: "User altight exists!" });
  }

  try {
    bcrypt.hash(password, 10).then(async (hash) => {
      try {
        await users.create({
          email: email,
          username: username,
          password: hash,
        });
        return res.json({ message: "User has been CREATED" });
      } catch (e) {
        return res.json({ error: e });
      }
    });
  } catch (e) {
    return res.json({ error: e });
  }
});

router.post("/login", async (req, res) => {
  const { email, password, username } = req.body;

  if ((!email && !username) || !password) {
    return res.json({ error: "Invalid Input" });
  }

  if (email && !Validation.isValidEmail(email)) {
    return res.json({ error: "Invalid Email" });
  }

  if (username && !Validation.isValidUsername(username)) {
    return res.json({ error: "Invalid Username" });
  }

  let user;
  if (username) {
    user = await users.findOne({ where: { username: username } });
  } else if (email) {
    user = await users.findOne({ where: { email: email } });
  }
  if (!user) {
    return res.json({ error: "Account does not exist" });
  }
  // match password;

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match) {
      return res.json({ error: "wrong Password" });
    }

    const authToken = sign(
      {
        email: user.email,
        username: user.username,
        id: user.id,
        status: true,
        livello: user.livello,
      },
      process.env.AUTH_SECRET
    );
    return res.json({
      authToken: authToken,
      email: user.email,
      id: user.id,
      username: user.username,
      status: true,
      livello: user.livello,
    });
  });
});

router.post("/details", validateToken, async (req, res) => {
  const { username, name, cognome, peso, altezza, sesso, livello, email } =
    req.body;

  if (
    !username ||
    !name ||
    !cognome ||
    !peso ||
    !altezza ||
    !sesso ||
    !livello ||
    !email
  ) {
    return res.json({ error: "Invalid Input" });
  }

  let user = await users.findOne({
    where: {
      username: username,
    },
  });

  console.log("USER", user);

  if (user) {
    return res.json({ error: "Utente esiste già" });
  }

  const profile = await users.update(
    {
      username: username,
      name: name,
      cognome: cognome,
      peso: peso,
      altezza: altezza,
      sesso: sesso,
      livello: livello,
    },
    {
      where: {
        email: email,
      },
    }
  );

  const token = sign(
    {
      ...req.user,
      livello: livello,
    },
    process.env.AUTH_SECRET
  );

  return res.json({
    token: token,
    user: profile,
  });
});

router.get("/auth", validateToken, async (req, res) => {
  if (req.user) {
    return res.json({ user: req.user });
  }
});

module.exports = router;
