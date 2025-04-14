const sharp = require('sharp')

exports.insertposts = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);

  
      if (req.fields?.post?.length > 20000) {
      req.fields.post = req.fields.post.slice(0, 20000)
    }

  let imagePath = null;
   
      let extensions = [".JPEG", ".jpeg", ".GIF", ".gif", ".PNG", ".png", ".JPG", ".jpg", ".WEBP", ".webp"]
      for (let i of extensions) {
          if (extensions.includes(path.extname(req.files.image.name))) {
          let fileName = `${Math.random() * 1e16}${path.extname(
            req.files.image.name
          )}`;
          await sharp(req.files.image.path).rotate()
          .toFile("./public/uploads/" + "resized_" + fileName);
        
          imagePath = "/uploads/resized_" + fileName;
        } 
      } 

    await db.query("INSERT INTO posts(content, username, uploads) VALUES ($1, $2, $3)", [
      req.fields.post,
      user.username,
      imagePath
    ]);
  
    
  return res.redirect("blog");

  } else {
    response = "Log in or register new user.";
    return res.render("blog", {
      active: "blog",
      response: response,
      posts: "",
      token: "",
      user: "",
    });
  }
};
