exports.gethousing = async (req, res) => {
    const token = req.signedCookies.token;
    if (token) {
     const user = jwt.verify(token, process.env.JWT_SECRET);

      return res.render("housing", {
        active: "boards",
        response: "",
        token: token,
        user: user.username,
        csrfToken: req.csrfToken(),
      });
    } else {
      res.render("housing", {
        active: "boards",
        response: "",
        token: "",
        user: "",
        csrfToken: req.csrfToken(),
      });
    }
  };
