exports.register = async (req, res) => {
  let name = req.body.name.toLowerCase();
  const regex = /[^a-zA-Z0-9]/;
  if (regex.test(name)) {
   return res.render("signup", {
      active: "signup",
      response: "Your username can only contain letters and numbers",
      token: "",
      user: "",
      csrfToken: req.csrfToken(),
      })
  }
  const savedHash = await db.query("SELECT pass FROM users WHERE name = $1", [
    name,
  ]);
  const responseUser = {
    username: name,
    password: req.body.pass,
  };

  if (savedHash[0]) {
    res.render("signup", {
      active: "signup",
      response: "Please use another username",
      token: "",
      user: "",
      csrfToken: req.csrfToken(),
    });
  } else {
    await bcrypt.hash(req.body.pass, 10, async function (err, hash) {
      if (err) throw err;
      await db.query(
        "INSERT INTO Users(name, pass, image, bio) VALUES ($1, $2, $3, $4)",
        [name, hash, "images/profile-icon-9.png", "I am a new user"]
      );
      response = `You signed up`;
const token = jwt.sign(responseUser, process.env.JWT_SECRET, {
  expiresIn: 10000000, // Adjust this as needed
});

      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 10000000,
        signed: true,
      });
      res.redirect("signin");
    });
  }
};
