const im = require("imagemagick")

exports.insertposts = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);

  
      if (req.fields?.post?.length > 20000) {
      req.fields.post = req.fields.post.slice(0, 20000)
    }

  let imagePath = null;
   
      // let extensions = [".JPEG", ".jpeg", ".GIF", ".gif", ".PNG", ".png", ".JPG", ".jpg", ".WEBP", ".webp"]
      // for (let i of extensions) {
      //     if (extensions.includes(path.extname(req.files.image.name))) {
      //     let fileName = `${Math.random() * 1e16}${path.extname(
      //       req.files.image.name
      //     )}`;

      //   im.convert([
      //     req.files.image.path,
      //     "-rotate", "0",
      //     '-resize', '600X600',
      //     "./public/uploads/resized_" + fileName
      //   ], (err) => {
      //     if (err) throw err;
      //     console.log("image processed successfully");
        
      //   })

      //     imagePath = "/uploads/resized_" + fileName;
      //   } 
      // } 

      //

let extensions = [".jpeg", ".jpg", ".png", ".gif", ".webp"];
let ext = path.extname(req.files.image.name).toLowerCase();

if (extensions.includes(ext)) {
  let fileName = `${Math.floor(Math.random() * 1e16)}${ext}`;
  let inputPath = req.files.image.path;
  let outputPath = "./public/uploads/resized_" + fileName;

  const MAX_WIDTH = 1000;
  const MAX_HEIGHT = 1000;

  im.identify(inputPath, (err, features) => {
    if (err) {
      console.error("Failed to identify image:", err);
      return;
    }

    const width = features.width;
    const height = features.height;

    const resizeNeeded = width > MAX_WIDTH || height > MAX_HEIGHT;

    let args = [inputPath];

    if (resizeNeeded) {
      args.push("-resize", `${MAX_WIDTH}x${MAX_HEIGHT}`);
    }

    args.push(outputPath);

    im.convert(args, (err) => {
      if (err) {
        console.error("Image processing failed:", err);
        return;
      }

      console.log("Image processed successfully");
      imagePath = "/uploads/resized_" + fileName;
    });
  });
}

      //

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
