const express = require("express");
const multer = require("multer");
const filterData = require("./filterData");
const filterData2 = require("./filterData2");
const test = require("./test");
const cors = require("cors");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const port = process.env.PORT || 3000;

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/acti", upload.single("myfile"), function (req, res) {
  const formData = req.body;

  try {
    var filteredData = filterData2(
      formData.originalname,
      formData.stdt,
      formData.endt,
      formData.empno
    );
    res
      .status(200)
      .send({ sucess: "File is uploaded successfully!", data: filteredData });
  } catch (e) {
    res.status(400).send({ error: "something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
