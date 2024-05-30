exports.insertposts = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    if (req.body.post.length > 1000) {
      req.body.post = req.body.post.slice(0, 1000)
    }
    await db.query("INSERT INTO posts(content, username) VALUES ($1, $2)", [
      req.body.post,
      user.username,
    ]);
    res.redirect("blog");
  } else {
    response = "Нужно зарегистрироваться, чтобы оставлять посты";
    return res.render("blog", {
      active: "blog",
      response: response,
      posts: "",
      token: "",
      user: "",
    });
  }
};
