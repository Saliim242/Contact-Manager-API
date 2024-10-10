const express = require("express");
const dotenv = require("dotenv");
const contactRouter = require("./routes/contactRoute.js");
const userRouter = require("./routes/userRouter.js");
const errorHandler = require("./middlewares/errorHandaller.js");
const connectDB = require("./config/db_connection.js");
dotenv.config();

connectDB();
const app = express();

// Get Request
app.use(express.json());
app.use("/api/contacts", contactRouter);
app.use("/api/users/auth", userRouter);
app.use(errorHandler);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
