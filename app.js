const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const httpPort = process.env.port || 80;
const httpsPort = process.env.port || 443;
const fs = require('fs');
const http = require('http');
const https = require('https');
const helmet = require('helmet');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/bro718.ru/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/bro718.ru/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/bro718.ru/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

global.bodyParser = require("body-parser");
global.urlencodedParser = bodyParser.urlencoded({ extended: false });
global.pgp = require("pg-promise")();
global.db = pgp("postgres://postgres:postgres@localhost:5432/database2");
global.path = require("path");
global.bcrypt = require("bcrypt");
global.jwt = require("jsonwebtoken");
global.fileUpload = require("express-fileupload");

const indexGetRoutes = require("./src/index/index.routes.get");
const blogRoutes = require("./src/blog/blog.routes");
const authRoutes = require("./src/auth/auth.routes");
const contactRoute = require("./src/contact/contact.routes");
const messagesRoutes = require("./src/messages/private.routes");
const commentsRoutes = require("./src/comments/comments.routes");
const fileUpload = require("express-fileupload");

app.set("view engine", "ejs");

app.use(cookieParser("rwervterbj353jhbdkfhv"));
app.use(express.static(__dirname, { dotfiles: 'allow' } ));
app.use(indexGetRoutes);
app.use(messagesRoutes);
app.use(blogRoutes);
app.use(authRoutes);
app.use(contactRoute);
app.use(commentsRoutes);
app.use(helmet());
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use((req, res) => {
  res.status(404).send("404 Page does not exist");
});


const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(httpPort, () => {
	console.log(`HTTP Server running on port ${httpPort}`);
});

httpsServer.listen(httpsPort, () => {
	console.log(`HTTPS Server running on port ${httpsPort}`);
});


