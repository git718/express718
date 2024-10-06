exports.insertposts = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");

   
    console.log(req.fields);
    
    
  return res.redirect("blog");


  } else {
    response = "Войдите в свой аккаунт или зарегистрируйте пользователя.";
    return res.render("blog", {
      active: "blog",
      response: response,
      posts: "",
      token: "",
      user: "",
    });
  }
};
