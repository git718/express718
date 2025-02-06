const sharp = require('sharp')

exports.postauto = async (req, res) => {
    const token = req.signedCookies.token;
    const autos = await db.query("SELECT * FROM auto")
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
        const lowerCaseBrands = carBrands.map(brand => brand.toLocaleLowerCase())

        const date = new Date();

        const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-indexed month
        const day = String(date.getDate()).padStart(2, '0');
        const year = String(date.getFullYear()); 
        
        const formattedDate = `${month}-${day}-${year}`;
        
        


      if (!lowerCaseBrands.includes(req.fields.brand.toLowerCase())) {
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
      ) { let imagePath = null;
               let extensions = [".JPEG", ".jpeg", ".GIF", ".gif", ".PNG", ".png", ".JPG", ".jpg", ".WEBP", ".webp"]
                  for (let i of extensions) {
                      if (extensions.includes(path.extname(req.files.files.name))) {
                      let fileName = `${Math.random() * 1e16}${path.extname(
                        req.files.image.name
                      )}`;
                      await sharp(req.files.image.path).rotate()
                      .toFile("./public/autos/" + "resized_" + fileName);
                    
                      imagePath = "/autos/resized_" + fileName;
                    } 
                  } 
            
                  await db.query("INSERT INTO auto(user_id, username, make, model, year, price, description, date, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
                    [user_id[0].id, req.fields.username, req.fields.brand, req.fields.model, req.fields.year, req.fields.amount, req.fields.description, formattedDate, imagePath])

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
        autos: autos,
      });
    }
  };