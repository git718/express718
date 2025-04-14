exports.login = async (req, res) => {
  let name = req.body.name.toLowerCase();
  const regex = /[^a-zA-Z0-9]/;
  if (regex.test(name)) {
    return res.render("signin", {
      active: "signin",
      response: `Username can only contain characters and numbers`,
      token: "",
      user: "",
      yourBio: "",
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
    await bcrypt.compare(
      req.body.pass,
      savedHash[0].pass,
      function (err, result) {
        if (!result) {
          return res.render("signin", {
            active: "signin",
            response: `Password is not correct`,
            token: "",
            user: "",
            yourBio: "",
          });
        } else {
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
        }
      }
    );
  } else {
    res.render("signin", {
      active: "signin",
      response: `User is not registered, please register a new user`,
      token: "",
      user: "",
      yourBio: "",
    });
  }
};
