exports.login = async (req, res) => {
  let name = req.body.name.toLowerCase();
  const regex = /[\[\]`:.,><()'"?!-=*&%#@\/{}| ~;\\]/;
  if (regex.test(name)) {
    return res.render("signin", {
      active: "signin",
      response: `Ник должен включать только буквы и числа`,
      token: "",
      user: "",
      yourBio: "",
      })
  }
  
  const savedHash = await db.query("SELECT pass FROM users WHERE name = $1", [
    name,
  ]);
  const responseUser = {
    username: name,
    password: req.body.pass,
  };
  if (savedHash[0]) {
    await bcrypt.compare(
      req.body.pass,
      savedHash[0].pass,
      function (err, result) {
        if (!result) {
          return res.render("signin", {
            active: "signin",
            response: `Имя пользователя ${name} существует в базе данных, но пароль неверен`,
            token: "",
            user: "",
            yourBio: "",
          });
        } else {
          const token = jwt.sign(responseUser, "rwervterbj353jhbdkfhv", {
            expiresIn: 10000000,
          });
          res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: 10000000,
            signed: true,
          });
          res.redirect("signin");
        }
      }
    );
  } else {
    res.render("signin", {
      active: "signin",
      response: `Пользователь не зарегистрирован, перейдите на Зарегистрироваться`,
      token: "",
      user: "",
      yourBio: "",
    });
  }
};
