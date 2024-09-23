const sharp = require("sharp");

exports.addImage = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    if (req.files) {
      let fileName = `${Math.random() * 10000000000000000}${path.extname(
        req.files.image.name
      )}`;
      await req.files.image.mv("public/uploads/" + fileName);
      await sharp("./public/uploads/" + fileName).resize(600,600)
      .toFormat('jpeg')
      .rotate()
      .toFile("./public/uploads/" + "resized_" + fileName);

      let imagePath = `uploads/${"resized_" + fileName}`;
      await db.query("UPDATE users SET image = $1 WHERE name = $2", [
        imagePath,
        user.username,
      ]);
    }
    res.redirect("signin");
  }
};

