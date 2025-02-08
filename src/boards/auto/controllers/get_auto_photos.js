exports.getautophotos = async (req, res) => {
    const token = req.signedCookies.token
    const id = req.params.post_id
    const object = await db.query("SELECT * FROM auto WHERE post_id=id")
    const links = object[0].photo
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
      res.render("auto_photos", {
        active: "boards",
        response: "",
        token: "",
        user: "",
        links: sorted_links
      });
    }
  };