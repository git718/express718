exports.getauto = async (req, res) => {
    const token = req.signedCookies.token;
    const autos = await db.query("SELECT * FROM auto")
    console.log(autos);
    
    if (token) {
      const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
      return res.render("auto", {
        active: "boards",
        response: "",
        token: token,
        user: user.username,
      });
    } else {
      res.render("auto", {
        active: "boards",
        response: "",
        token: "",
        user: "",
      });
    }
  };