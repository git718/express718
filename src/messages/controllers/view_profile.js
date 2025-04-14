exports.view_profile = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
  const user = jwt.verify(token, process.env.JWT_SECRET);

    const data = await db.query(
      "SELECT * FROM users WHERE name=(SELECT username FROM posts WHERE id=$1)",
      [req.params.id]
    );
    const data2 = await db.query(
      "SELECT * FROM users WHERE name=(SELECT username FROM comments WHERE id=$1)",
      [req.params.id]
    );
    if (data[0] || data2[0]) {
      res.render("user_profile", {
        active: "",
        token: token,
        response: "",
        user: user.username,
        data: data[0],
        data2: data2[0],
      });
    } else {
      res.render("user_profile", {
        active: "",
        token: token,
        response: "Username deleted or does not exist.",
        user: user.username,
        data: "",
        data2: "",
      });
    }
  } else {
    res.redirect("/blog");
  }
};
