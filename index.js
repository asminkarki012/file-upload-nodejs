const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uploadImageRoute = require("./routes/uploadimage");

app.use(express.json());

//DB connection

main().catch((err) => console.log(err));

async function main() {
  const dbname = "file-upload";
  const connectionString = `mongodb+srv://mongodb:mongodb@cluster0.dkznm.mongodb.net/${dbname}?retryWrites=true&w=majority`;
  mongoose.connect(connectionString);
  console.log("MongoDB connected");
}

app.use("/api/upload/",uploadImageRoute);
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Port Running at localhost:${PORT}`);
});
