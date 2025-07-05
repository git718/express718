const im = require("imagemagick");


exports.insertposts = async (req, res) => {
  const token = req.signedCookies.token;
  if (!token) {
    return res.render("blog", {
      active: "blog",
      response: "Log in or register new user.",
      posts: "",
      token: "",
      user: "",
    });
  }

  const user = jwt.verify(token, process.env.JWT_SECRET);
  const content = req.fields?.post?.slice(0, 20000) || "";
  const file = req.files?.image;
  const extensions = [".jpeg", ".jpg", ".png", ".gif", ".webp"];

  // No file uploaded — insert post immediately
  if (!file || !file.name) {
    try {
      await db.query(
        "INSERT INTO posts(content, username, uploads) VALUES ($1, $2, $3)",
        [content, user.username, null]
      );
      return res.redirect("blog");
    } catch (err) {
      console.error("Database error:", err);
      return res.status(500).send("Database error.");
    }
  }

  // File uploaded — process image
  const ext = path.extname(file.name).toLowerCase();
  if (!extensions.includes(ext)) {
    return res.status(400).send("Unsupported image format.");
  }

  const fileName = `${Math.floor(Math.random() * 1e16)}${ext}`;
  const inputPath = file.path;
  const outputPath = "./public/uploads/resized_" + fileName;
  const MAX_WIDTH = 1000;
  const MAX_HEIGHT = 1000;

  im.identify(inputPath, (err, features) => {
    if (err) {
      console.error("Failed to identify image:", err);
      return res.status(500).send("Image identification failed.");
    }

    const resizeNeeded = features.width > MAX_WIDTH || features.height > MAX_HEIGHT;
    const args = [inputPath];

    if (resizeNeeded) {
      args.push("-resize", `${MAX_WIDTH}x${MAX_HEIGHT}>`);
    }

    args.push(outputPath);

    im.convert(args, async (err) => {
      if (err) {
        console.error("Image processing failed:", err);
        return res.status(500).send("Image processing failed.");
      }

      const imagePath = "/uploads/resized_" + fileName;

      try {
        await db.query(
          "INSERT INTO posts(content, username, uploads) VALUES ($1, $2, $3)",
          [content, user.username, imagePath]
        );
        return res.redirect("blog");
      } catch (dbErr) {
        console.error("Database error:", dbErr);
        return res.status(500).send("Database error.");
      }
    });
  });
};
