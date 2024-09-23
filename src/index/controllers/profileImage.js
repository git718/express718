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
    const data = await db.query(
      "SELECT * FROM private WHERE to_user = $1 ORDER by id DESC",
      [user.username]
    );
    const userData = await db.query("SELECT * FROM users WHERE name = $1", [
      req.query.userData? req.query.userData.toLowerCase():null,
    ]);
    if (req.files) {
      let extensions = ["JPEG", "jpeg", "GIF", "gif", "PNG", "png", ".JPEG", ".jpeg", ".GIF", ".gif", ".PNG", ".png", "JPG", ".JPG", ".jpg", "jpg"]
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
          return res.redirect("signin");
        } else {
          return res.render("signin", {
            active: "signin",
            response: "Please use image format PNG, JPEG,JPG or GIF.",
            token: token,
            yourBio: bio[0].bio,
            image: userImage[0].image,
            user: user.username,
            data: data,
            userData: userData[0],
          });
        }
      } 
    }
  }
};

