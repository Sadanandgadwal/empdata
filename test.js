const fs = require("fs");

module.exports = (filename, stdt, endt, empno) => {
  var startDate = new Date(stdt);
  var endDate = new Date(endt);

  var data = fs
    .readFileSync(`${__dirname}/uploads/${filename}`, "utf-8")
    .toString()
    .split("\n")
    .map((e) => e.trim())
    .map((e) => e.split(",").map((e) => e.trim())) // split each line to array
    .map((e) => e.toString().split("\t")) // split each element to '\t' for row elements
    .filter((e) => e[0] === empno); // filter from employee id

  data = data.filter(
    (e) => new Date(e[1]) >= startDate && new Date(e[1]) <= endDate
  );

  data.forEach();
  // console.log(JSON.stringify(data, '', 2));
  // DataFrame.fromCSV(inputFilePath).then(df => df.show())
  return data;
};
