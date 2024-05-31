exports.mailer = async (req, res) => {
  if (req.body.email!="" && 
  req.body.textarea!="" && 
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
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    return res.render("form", { 
      active: "", 
      token: token, 
      user: user.username 
    });
  } else {
    return res.render("form", { 
      active: "",
      token: "", 
      user: "" });
  }
  
}
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    return res.render("contacts", { 
      active: "contacts", 
      message:"message not sent",
      token: token, 
      user: user.username 
    });
  } else {
    return res.render("contacts", { 
      active: "contacts",
      token: "", 
      message:"message not sent",
      user: "" });
  }
};
