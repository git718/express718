exports.insertposts = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    const formData = new FormData();
  if (req.body.post != 'undefined') {
          if (req.body.post?.length > 20000) {
          req.body.post = req.body.post.slice(0, 20000)
        }
        await db.query("INSERT INTO posts(content, username) VALUES ($1, $2)", [
          req.body.post,
          user.username,
        ]);
      }
    if (req.files) {
      console.log(req.files.image);
      
      let extensions = [".JPEG", ".jpeg", ".GIF", ".gif", ".PNG", ".png", ".JPG", ".jpg"]
      for (let i of extensions) {
          if (extensions.includes(path.extname(req.files.image.name))) {
          let fileName = `${Math.random() * 10000000000000000}${path.extname(
            req.files.image.name
          )}`;
          await req.files.image.mv("public/uploads/" + fileName);
          await sharp("./public/uploads/" + fileName).resize(600,600)
          .toFormat('jpeg')
          .rotate()
          .toFile("./public/uploads/" + "resized_" + fileName);
        
          let imagePath = `uploads/${"resized_" + fileName}`;
          await db.query("INSERT INTO posts(uploads) VALUES $1", [
            imagePath,
          ]);
          return res.redirect("blog");
        } else { return res.redirect("blog")}
      } 
    }
    const data = formData.getAll("post", "image")
    console.log(data);
    
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
