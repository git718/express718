exports.getautopost = async (req, res) => {
    const token = req.signedCookies.token;
    if (token) {
      const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
      return res.render("postauto", {
        active: "boards",
        response: "",
        token: token,
        user: user.username,
      });
    } else {
      res.render("auto", {
        active: "boards",
        response: "You have to log in",
        token: "",
        user: "",
      });
    }
  };