exports.getjobs = async (req, res) => {
    const token = req.signedCookies.token;
    if (token) {
const user = jwt.verify(token, process.env.JWT_SECRET);

      return res.render("jobs", {
        active: "boards",
        response: "",
        token: token,
        user: user.username,
      });
    } else {
      res.render("jobs", {
        active: "boards",
        response: "",
        token: "",
        user: "",
      });
    }
  };
