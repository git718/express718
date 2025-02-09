exports.getautophotos = async (req, res) => {
    const token = req.signedCookies.token
    const id = req.params.post_id
    const autos = await db.query("SELECT * FROM auto ORDER BY post_id DESC")
    const users = await db.query("SELECT * FROM users")
    const object = await db.query("SELECT * FROM auto WHERE post_id=$1", 
        [id]
    )
    const links = object[0].photo
    if (links == null || link == './public/images/car.png') {
      if (token) {
        const user = jwt.verify(token, "rwervterbj353jhbdkfhv")
        return res.render("auto", {
          active: "boards",
          response: "no photos from seller",
          token: token,
          user: user.username,
          autos: autos,
          users: users
        });
      } else {
        return res.render("auto", {
          active: "boards",
          response: "no photo from seller. register to message sellers",
          token: "",
          user: "",
          autos: autos,
          users: users
        });
      }
    }
    const splitted_links = links.split(',')
    const sorted_links = splitted_links.filter(element => element !== '' && element !== null)
    
        if (token) {
          const user = jwt.verify(token, "rwervterbj353jhbdkfhv")
          return res.render("auto_photos", {
            active: "boards",
            response: "",
            token: token,
            user: user.username,
            links: sorted_links
          });
        } else {
          return res.render("auto_photos", {
            active: "boards",
            response: "register or login to send messages",
            token: "",
            user: "",
            links: sorted_links
          });
        }
  };