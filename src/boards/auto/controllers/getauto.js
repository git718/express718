exports.getauto = async (req, res) => {
    const token = req.signedCookies.token
    const autos = await db.query("SELECT * FROM auto ORDER BY post_id DESC")
    if (token) {
      const user = jwt.verify(token, "rwervterbj353jhbdkfhv")
      return res.render("auto", {
        active: "boards",
        response: "",
        token: token,
        user: user.username,
        autos: autos,
      });
    } else {
      res.render("auto", {
        active: "boards",
        response: "",
        token: "",
        user: "",
        autos: autos,
      });
    }
  };