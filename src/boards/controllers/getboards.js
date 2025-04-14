exports.getboards = async (req, res) => {
    const token = req.signedCookies.token;
    const autos = await db.query("SELECT * FROM auto")
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      return res.render("boards", {
        active: "boards",
        response: "",
        token: token,
        user: user.username,
        autos: autos,
        csrfToken: req.csrfToken(),
      });
    } else {
      res.render("boards", {
        active: "boards",
        response: "",
        token: "",
        user: "",
        autos: autos,
        csrfToken: req.csrfToken(),
      });
    }
  };
