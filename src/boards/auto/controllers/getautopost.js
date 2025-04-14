exports.getautopost = async (req, res) => {
    const token = req.signedCookies.token;
    const autos = await db.query("SELECT * FROM auto")
    const users = await db.query("SELECT * FROM users")

    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      return res.render("postauto", {
        active: "boards",
        response: "",
        token: token,
        user: user.username,
        csrfToken: req.csrfToken(),
      });
    } else {
      res.render("auto", {
        active: "boards",
        response: "You have to log in",
        token: "",
        user: "",
        autos: autos,
        users: users,
        csrfToken: req.csrfToken(),
      });
    }
  };
