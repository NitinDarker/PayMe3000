const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")

dotenv.config();
const PORT = process.env.PORT;

const { router } = require("./routes");

const app = express();

app.use(cors())
app.use(express.json())
app.use("/api/", router);

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
