const sharp = require("sharp");

exports.addImage = async (req, res) => {
  const token = req.signedCookies.token;
  if (token) {
    const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
    const userImage = await db.query("SELECT image FROM users WHERE name=$1", [
      user.username,
    ]);
    const bio = await db.query("SELECT bio FROM users WHERE name = $1", [
      user.username,
    ]);
    if (req.files) {
      let extensions = ["JPEG", "jpeg", "GIF", "gif", "PNG", "png", ".JPEG", ".jpeg", ".GIF", ".gif", ".PNG", ".png"]
      for (let i of extensions) {
          if (path.extname(req.files.image.name) == i) {
          
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
          res.redirect("signin");
        } else {
          res.render("signin", {
            active: "signin",
            response: "Please use image format PNG, JPEG, or GIF.",
            token: token,
            yourBio: bio[0].bio,
            image: userImage[0].image,
            user: user.username,
          });
        }
      } 
    }
  }
};

