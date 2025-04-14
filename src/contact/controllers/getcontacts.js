exports.contacts = (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    return res.render("contacts", {
      active: "contacts",
      token: token,
      response: "",
      user: user.username,
      csrfToken: req.csrfToken(),
    });
  } else {
    res.render("contacts", {
      active: "contacts",
      token: "",
      response: "",
      user: "",
      csrfToken: req.csrfToken(),
    });
  }
};
