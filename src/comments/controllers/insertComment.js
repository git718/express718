exports.insertComment = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    if (req.body.child_comment) {
      if (req.body.child_comment.length > 20000) {
        req.body.child_comment = req.body.child_comment.slice(0, 20000)
      }
      await db.query(
        "INSERT INTO comments(parent_id, text, username) VALUES ($1, $2, $3)",
        [req.body.parent_post_id, req.body.child_comment, user.username]
      );
    }
  }
  res.redirect("/blog");
};
