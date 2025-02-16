const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const router = require("./routes/qart/index");
const passport = require("passport");
const { jwtStrategy } = require("./config/passport");
const cors = require("cors");

const app = express();

// ✅ Improved CORS Configuration
app.use(cors({
    origin: "http://localhost:5173", // Change this to match your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true // Allow credentials for authentication
}));
app.options("*", cors()); // Handle preflight requests

// ✅ Improved MongoDB Connection with Debugging & SSL Handling
mongoose.set("strictQuery", false); // Avoid warnings

mongoose.connect(config.mongoose.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true, // Bypass SSL issues if necessary
}).then(() => {
    console.log("✅ Connected to MongoDB");
}).catch((err) => {
    console.error("❌ MongoDB Connection Error:", err.message);
});

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// ✅ Routes
app.use("/verse", router);

app.get("/", (req, res) => {
    res.send("Hello, welcome to Cart Project");
});

// ✅ Start Server
const PORT = config.port || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
