exports.deleteposts = async (req, res) => {
  try {
    await db.query("DELETE FROM posts WHERE id=$1", [req.params.id]);
    res.redirect("/blog");
  }
  catch {
    res.redirect("/blog");
  }
  
};
