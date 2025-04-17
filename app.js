const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const httpPort = process.env.port || 80
const httpsPort = process.env.port || 443
const fs = require('fs')
const dotenv = require('dotenv').config();
const http = require('http')
const https = require('https')
const helmet = require('helmet')
const morgan = require('morgan')
//const csrf = require('csurf');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/bro718.ru/privkey.pem', 'utf8')
const certificate = fs.readFileSync('/etc/letsencrypt/live/bro718.ru/cert.pem', 'utf8')
const ca = fs.readFileSync('/etc/letsencrypt/live/bro718.ru/chain.pem', 'utf8')

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

global.bodyParser = require("body-parser")
global.urlencodedParser = bodyParser.urlencoded({ extended: false })
global.pgp = require("pg-promise")()
global.db = pgp("postgres://postgres:postgres@localhost:5432/database2")
global.path = require("path")
global.bcrypt = require("bcrypt")
global.jwt = require("jsonwebtoken")
global.fileUpload = require("express-fileupload")

const jwtSecret = process.env.JWT_SECRET;

const indexGetRoutes = require("./src/index/index.routes.get")
const blogRoutes = require("./src/blog/blog.routes")
const authRoutes = require("./src/auth/auth.routes")
const contactRoute = require("./src/contact/contact.routes")
const messagesRoutes = require("./src/messages/private.routes")
const commentsRoutes = require("./src/comments/comments.routes")
const boardsRoutes = require("./src/boards/boards.routes")
const autoRoutes = require("./src/boards/auto/auto.routes")
const housingRoutes = require("./src/boards/housing/housing.routes")
const jobsRoutes = require("./src/boards/jobs/jobs.routes")
const saleRoutes = require("./src/boards/sale/sale.routes")

const fileUpload = require("express-fileupload")
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.enable('trust proxy')
app.set("view engine", "ejs")



app.use(morgan('combined', { stream: accessLogStream }))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(indexGetRoutes)
app.use(messagesRoutes)
app.use(blogRoutes)
app.use(authRoutes)
app.use(contactRoute)
app.use(commentsRoutes)
app.use(boardsRoutes)
app.use(autoRoutes)
app.use(housingRoutes)
app.use(jobsRoutes)
app.use(saleRoutes)

// Middleware to block access to .git directories
app.use((req, res, next) => {
  if (/\/\.git/.test(req.url)) {
    res.status(403).send('Access Denied');
  } else {
    next(); // Call the next middleware
  }
});

app.use(helmet());
app.use(express.static(path.join(__dirname, "/public"), { dotfiles: 'ignore' }));
app.use(express.json())
app.use(fileUpload())
//app.use(csrf());
//app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))
app.use((req, res) => {
  res.status(404).send("404 Page does not exist")
})
app.use(function (request, response, next) {
  if (!request.secure) {
    return response.redirect('https://' + request.headers.host + request.url)
  }
  next()
})


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app)

httpServer.listen(httpPort, () => {
	console.log(`HTTP Server running on port ${httpPort}`)
})

httpsServer.listen(httpsPort, () => {
	console.log(`HTTPS Server running on port ${httpsPort}`)
})


