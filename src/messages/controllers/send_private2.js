exports.sendPrivMessage2 = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    if (req.body.private) {
      if (req.body.private.length > 20000) {
        req.body.private = req.body.private.slice(0, 20000)
      }
      await db.query(
        "INSERT INTO private(to_user, from_user, content) VALUES ($1, $2, $3)",
        [req.body.to_user, req.body.from_user, req.body.private]
      );
    }
    res.redirect("signin");
  }
};
