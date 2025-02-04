exports.postauto = async (req, res) => {
    const token = req.signedCookies.token;
    if (token) {
      const user = jwt.verify(token, "rwervterbj353jhbdkfhv");
      const user_id = await db.query("SELECT id from users WHERE name=$1", [user.username])
      const carBrands = [
        "Acura",
        "Alfa Romeo",
        "Aston Martin",
        "Audi",
        "Bentley",
        "BMW",
        "Bugatti",
        "Buick",
        "Cadillac",
        "Chevrolet",
        "Chrysler",
        "Citroën",
        "Dodge",
        "Ferrari",
        "Fiat",
        "Ford",
        "Genesis",
        "GMC",
        "Honda",
        "Hyundai",
        "Infiniti",
        "Jaguar",
        "Jeep",
        "Kia",
        "Lamborghini",
        "Land Rover",
        "Lexus",
        "Lincoln",
        "Maserati",
        "Mazda",
        "McLaren",
        "Mercedes-Benz",
        "Mini",
        "Mitsubishi",
        "Nissan",
        "Pagani",
        "Peugeot",
        "Porsche",
        "Ram",
        "Renault",
        "Rolls-Royce",
        "Saab",
        "Subaru",
        "Suzuki",
        "Tesla",
        "Toyota",
        "Volkswagen",
        "Volvo"
      ];
        
      if (!carBrands.includes(req.fields.brand.toLowerCase())) {
        return res.render("postauto", {
            active: "boards",
            response: "No such car brand",
            token: token,
            user: user.username,
          });
      }
      if (typeof Number(req.fields.year) !== "number" && typeof Number(req.fields.amount)!== "number" ) {
        return res.render("postauto", {
            active: "boards",
            response: "Year and Price should be numbers",
            token: token,
            user: user.username,
          });
      }


      if (req.fields.username && req.fields.brand && req.fields.model && 
        req.fields.year && req.fields.amount
      ) {
        await db.query("INSERT INTO auto(user_id, username, make, model, year, price, description) VALUES ($1, $2, $3, $4, $5, $6, $7)",
            [user_id[0].id, req.fields.username, req.fields.brand, req.fields.model, req.fields.year, req.fields.amount, req.fields.description])
            return res.redirect("auto")
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