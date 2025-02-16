const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const router = require("./routes/qart/index");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const cors = require("cors");

const app = express();

// ✅ Enable CORS for the frontend URL (before routes & middleware)
app.use(cors({
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, OPTIONS",
    allowedHeaders: "Content-Type, Authorization"
}));

// ✅ Handle preflight (OPTIONS) requests
app.options("*", cors());

mongoose.connect(config.mongoose.url).then(() => {
    console.log("Connected to MongoDB");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/verse", router);

// ✅ Remove manual CORS headers (handled by `cors` middleware)
app.get("/", (req, res) => {
    res.send("Hello, welcome to Cart Project");
});

app.listen(config.port, () => {
    console.log(`Listening on port ${config.port}`);
});
