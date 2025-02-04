exports.postauto = async (req, res) => {
    const token = req.signedCookies.token;
    if (token) {
      const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
      const user_id = await db.query("SELECT id from users WHERE name=$1", [user.username])
      if (req.body.username && req.body.make && req.body.model && 
        req.body.year && req.body.amount
      ) {
        await db.query("INSERT INTO auto(user_id, username, make, model, year, description) VALUES ($1, $2, $3, $4, $5, $6)",
            [user_id, req.fields.username, req.fields.make, req.fields.model, req.fields.year, req.fields.description])
            return res.render("postauto", {
                active: "boards",
                response: "added your post",
                token: token,
                user: user.username,
              });
      }
      return res.render("postauto", {
        active: "boards",
        response: "Some fields need to be filled.",
        token: token,
        user: user.username,
      });
    } else {
      res.render("auto", {
        active: "boards",
        response: "",
        token: "",
        user: "",
      });
    }
  };