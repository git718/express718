exports.signup = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    res.redirect("signin");
  } else {
    res.render("signup", {
      active: "signup",
      response: "Зарегистрируйте нового пользователя здесь",
      token: "",
    });
  }
};
