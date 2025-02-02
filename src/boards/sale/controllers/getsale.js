exports.getsale = async (req, res) => {
    const token = req.signedCookies.token;
    if (token) {
      const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
      return res.render("sale", {
        active: "boards",
        response: "",
        token: token,
        user: user.username,
      });
    } else {
      res.render("sale", {
        active: "boards",
        response: "",
        token: "",
        user: "",
      });
    }
  };