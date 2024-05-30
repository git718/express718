exports.insertComment = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    if (req.body.child_comment) {
      if (req.body.child_comment.length > 150) {
        req.body.child_comment = req.body.child_comment.slice(0, 150)
      }
      await db.query(
        "INSERT INTO comments(parent_id, text, username) VALUES ($1, $2, $3)",
        [req.body.parent_post_id, req.body.child_comment, user.username]
      );
    }
  }
  res.redirect("/blog");
};
