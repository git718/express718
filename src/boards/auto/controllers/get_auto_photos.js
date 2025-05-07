exports.getautophotos = async (req, res) => {
    const token = req.signedCookies.token
    const id = req.params.post_id
    const object = await db.query("SELECT * FROM auto WHERE post_id=$1", 
        [id]
    )
    const userData = await db.query("SELECT * FROM users WHERE id=$1", 
        [object[0].user_id]
    )
    const links = object[0].photo
    const profile_foto = '/' + userData[0].image

    if (links == null || links == './public/images/car.png') {
        if (token) {
            const user = jwt.verify(token, process.env.JWT_SECRET);

            return res.render("auto_photos", {
              active: "boards",
              response: "seller did not provide photos",
              token: token,
              user: user.username,
              links: '',
              userData: userData,
              user_foto: profile_foto,
              object: object,
            });

          } else {
            return res.render("auto_photos", {
              active: "boards",
              response: "register or login to send messages",
              token: "",
              user: "",
              links: '',
              userData: '',
              user_foto: '',
              object: object,
            });
          }
      } 
    const splitted_links = links.split(',')
    const sorted_links = splitted_links.filter(element => element !== '' && element !== null)
    
        if (token) {
          const user = jwt.verify(token, process.env.JWT_SECRET)
          return res.render("auto_photos", {
            active: "boards",
            response: "",
            token: token,
            user: user.username,
            links: sorted_links,
            userData: userData,
            user_foto: profile_foto,
            object: object,
          });
        } else {
          return res.render("auto_photos", {
            active: "boards",
            response: "register or login to send messages",
            token: "",
            user: "",
            links: sorted_links,
            userData: '',
            user_foto: '',
            object: object,
          });
        }
  };
