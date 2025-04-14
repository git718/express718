exports.sendPrivMessage = async (req, res) => {
  const token = req.signedCookies.token;
 const user = jwt.verify(token, process.env.JWT_SECRET);

  if (token) {
    let image = await db.query("SELECT image FROM users WHERE name =$1", [
      req.body.to_user,
    ]);
    let dataObject = {
      name: req.body.to_user,
      bio: req.body.bio,
      image: image[0].image,
    };
    if (req.body.private) {
      if (req.body.private.length > 20000) {
        req.body.private = req.body.private.slice(0, 20000)
      }
        await db.query(
          "INSERT INTO private(to_user, from_user, content) VALUES ($1, $2, $3)",
          [req.body.to_user, user.username, req.body.private]
        );
        res.render("user_profile", {
          active: "",
          token: token,
          response: `sent FROM: "${user.username}",
          TO: "${req.body.to_user}",
          MESSAGE: "${req.body.private}"`,
          user: user.username,
          data: dataObject,
          csrfToken: req.csrfToken(),
        });
      
    } else {
      res.render("user_profile", {
        active: "",
        token: token,
        response: "Empty message",
        user: user.username,
        data: dataObject,
        csrfToken: req.csrfToken(),
      });
    }
  }
};
