exports.mailer = async (req, res) => {
	if (req.body.info !== "") {
	return res.status(400).send('Spam detected')
}
    if (req.body.email && 
    req.body.textarea && 
    req.body.email.includes("@")) {
      if (req.body.email.length > 80) {
        req.body.email = req.body.email.slice(0, 80)
      }
      if (req.body.textarea.length > 20000) {
        req.body.textarea = req.body.textarea.slice(0, 20000)
      }
    
    await db.query("INSERT INTO messages(email, text) VALUES ($1, $2)", [
      req.body.email,
      req.body.textarea,
    ]);
    const token = req.signedCookies.token;
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      res.render("form", { 
        active: "", 
        token: token, 
        user: user.username,
        csrfToken: req.csrfToken(),
      });
    } else {
      res.render("form", { 
        active: "",
        token: "", 
        user: "",
        csrfToken: req.csrfToken(),
      });
    }
  }
}
