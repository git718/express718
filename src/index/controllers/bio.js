exports.bio = async (req, res) => {
  const token = req.signedCookies.token;
  if (token && req.body.bio !== "") {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (req.body.bio.length > 80) {
      req.body.bio = req.body.bio.slice(0, 80)
    }
    await db.query("UPDATE users SET bio = $1 WHERE name = $2", [
      req.body.bio,
      user.username,
    ]);
  }
  res.redirect("signin");
};
