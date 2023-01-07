const express = require("express");
const multer = require("multer");
const filterData = require("./filterData");
const filterData2 = require("./filterData2");
const test = require("./test");
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
const port = 5000;

app.get("/", function (req, res) {
  res.sendFile("index.html", { root: __dirname });
});

app.post("/acti", upload.single("myfile"), function (req, res) {
  const formData = req.body;
  var filteredData = filterData2(
    formData.originalname,
    formData.stdt,
    formData.endt,
    formData.empno
  );
  console.log(filteredData);
  res.end("File is uploaded successfully!");
});

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
});
