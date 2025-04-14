exports.getauto = async (req, res) => {
    const token = req.signedCookies.token
    const autos = await db.query("SELECT * FROM auto ORDER BY post_id DESC")
    const users = await db.query("SELECT * FROM users")
    if (token) {
     const user = jwt.verify(token, process.env.JWT_SECRET);

      return res.render("auto", {
        active: "boards",
        response: "",
        token: token,
        user: user.username,
        autos: autos,
        users: users,
      });
    } else {
      res.render("auto", {
        active: "boards",
        response: "",
        token: "",
        user: "",
        autos: autos,
        users: users,
      });
    }
  };
