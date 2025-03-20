/* eslint-disable no-undef */
require("./models/User");
require("./models/Transaction");
require("./models/TransactionRequest");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const requireAuth = require("./middlewares/requireAuth");
require("dotenv").config();
const cors = require('cors');


const app = express();

app.use(cors());

app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(authRoutes);
app.use(transactionRoutes);

const PORT = process.env.PORT || 8081;

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  throw new Error(
    `MongoURI was not supplied.`
  );
}

mongoose.set("strictQuery", true);
// resolves future deprecation issue with Mongoose v7

mongoose.connect(mongoUri);
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo instance");
});
mongoose.connection.on("error", (err) => {
  console.error("Error connecting to mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your email: ${req.user.nid}`);
});

app.listen(PORT, () => {
  console.log(`HTTP server running on port ${PORT}`);
});

// const SSLoptions = {
//   key: fs.readFileSync(process.env.SERVER_KEY),
//   cert: fs.readFileSync(process.env.SERVER_CERT)
// };

// https.createServer(SSLoptions, app).listen(PORT, () => {
//   console.log(`HTTPS server running on port ${PORT}`);
// });