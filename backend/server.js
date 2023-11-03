const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();
connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
