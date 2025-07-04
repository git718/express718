const im = require("imagemagick")

exports.insertposts = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, process.env.JWT_SECRET);

  
      if (req.fields?.post?.length > 20000) {
      req.fields.post = req.fields.post.slice(0, 20000)
    }

  let imagePath = null;

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

      args.push("-resize", `${MAX_WIDTH}x${MAX_HEIGHT}>`);

    }

    args.push(outputPath);

    im.convert(args, (err) => {
      if (err) {
        console.error("Image processing failed:", err);
        return;
      }

      console.log("Image processed successfully");
      imagePath = "/uploads/resized_" + fileName;


  db.query("INSERT INTO posts(content, username, uploads) VALUES ($1, $2, $3)", [
  req.fields.post,
  user.username,
  imagePath
])
.then(() => {
  return res.redirect("blog");
})
.catch((dbErr) => {
  console.error("Database error:", dbErr);
  return res.status(500).send("Database error.");
});

    });
  });
}


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
