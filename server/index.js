const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const dotenv = require("dotenv");
const routes = require("./routes/index");

dotenv.config();

const backend = express();
const server = http.Server(backend);

backend.use(express.json());
backend.use(cors({
  origin: [
    "http://localhost:5173",
    "https://codevibeforyou.netlify.app" // ✅ add this
  ],
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
}));

backend.use(routes);

mongoose.connect(process.env.DB_URL)
  .then(() => {
    const PORT = process.env.PORT || 5002;
server.listen(PORT, () => {
  console.log(`✅ Server Started on port ${PORT}`);
  console.log("✅ Connected to MongoDB");
});

  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
