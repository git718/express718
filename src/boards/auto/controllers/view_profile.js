exports.view_profile = async (req, res) => {
    const token = req.signedCookies.token;
    if (token) {
     const user = jwt.verify(token, process.env.JWT_SECRET);

      const id = req.params.user_id
      const data = await db.query("SELECT * FROM users WHERE id=$1",
        [id]
      )
      
      if (data[0]) {
        res.render("view_auto_seller_profile", {
          active: "",
          token: token,
          response: "",
          user: user.username,
          data: data[0],
          csrfToken: req.csrfToken()
        });
      } else {
        res.render("view_auto_seller_profile", {
          active: "",
          token: token,
          response: "Username deleted or does not exist.",
          user: user.username,
          data: "",
          csrfToken: req.csrfToken(),
        });
      }
    } else {
      res.redirect("/auto");
    }
  };
  
