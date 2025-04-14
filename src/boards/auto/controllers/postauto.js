const sharp = require('sharp')

exports.postauto = async (req, res) => {
    const token = req.signedCookies.token;
    const autos = await db.query("SELECT * FROM auto")
    const users = await db.query("SELECT * FROM users")

    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);

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
            csrfToken: req.csrfToken(),
          });
      }
      if (typeof Number(req.fields.year) !== "number" && typeof Number(req.fields.amount)!== "number" ) {
        return res.render("postauto", {
            active: "boards",
            response: "Year and Price should be numbers",
            token: token,
            user: user.username,   
            csrfToken: req.csrfToken(),
          });
      }

      if (req.fields.username && req.fields.brand && req.fields.model && 
        req.fields.year && req.fields.amount
      ) {   
            let imagePaths = '';

               let extensions = [
                ".JPEG", 
                ".jpeg", 
                ".GIF", 
                ".gif", 
                ".PNG", 
                ".png", 
                ".JPG", 
                ".jpg", 
                ".WEBP", 
                ".webp"
            ]

               if (
                !req.files.files0.name && 
                !req.files.files1.name &&
                !req.files.files2.name &&
                !req.files.files3.name &&
                !req.files.files4.name
               ) {
                imagePaths = "./public/images/car.png";
              } else {

                let photo_array = [                
                    req.files.files0, 
                    req.files.files1,
                    req.files.files2,
                    req.files.files3,
                    req.files.files4]
    
                      for (let photo of photo_array) {
                        if (photo.name) {
                            if (extensions.includes(path.extname(photo.name))) {
                                let fileName = `${Math.random() * 1e16}${path.extname(
                                  photo.name
                                )}`;
                                await sharp(photo.path).rotate()
                                .toFile("./public/autos/" + "resized_" + fileName);
                              
                                let imagePath = "/autos/resized_" + fileName;
                                imagePaths = imagePaths + ',' + imagePath
                              } else { 
                                null 
                              }
                        } else {
                            continue
                        }
                      } 
              }
                
                  await db.query("INSERT INTO auto(user_id, username, make, model, year, price, description, date, photo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
                    [user_id[0].id, 
                    req.fields.username, 
                    req.fields.brand, 
                    req.fields.model, 
                    req.fields.year, 
                    req.fields.amount, 
                    req.fields.description, 
                    formattedDate, 
                    imagePaths
                ])

            return res.redirect("auto")

      }
      return res.render("postauto", {
        active: "boards",
        response: "Some fields need to be filled.",
        token: token,
        user: user.username,
        csrfToken: req.csrfToken(),
      });
    } else {
      res.render("auto", {
        active: "boards",
        response: "",
        token: "",
        user: "",
        autos: autos,
        users: users,
        csrfToken: req.csrfToken(),
      });
    }
  };
