exports.logout = async (req, res) => {
  res.clearCookie("token");
  var response = "Вы вышли из учетной записи";
  res.render("signin", { active: "signin", response: response, token: "" });
};
