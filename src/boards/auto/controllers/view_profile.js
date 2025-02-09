exports.view_profile = async (req, res) => {
    const token = req.signedCookies.token;
    if (token) {
      const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
      const data = await db.query("")
      if (data[0]) {
        res.render("user_profile", {
          active: "",
          token: token,
          response: "",
          user: user.username,
          data: data[0]
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
      res.redirect("auto");
    }
  };
  