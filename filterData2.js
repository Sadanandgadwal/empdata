const fs = require("fs");
const moment = require("moment");

module.exports = (filename, stdt, endt, empno) => {
  var startDate = new Date(stdt);
  var endDate = new Date(endt);
  var weekDays = {
    0: "Monday",
    1: "Tusday",
    2: "Wednesday",
    3: "Thrusday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday",
  };

  var data = fs
    .readFileSync(`${__dirname}/uploads/attlog_Jan-Feb2022.dat`, "utf-8")
    .toString() // convert Buffer to string
    .split("\n") // split string to lines
    .map((e) => e.trim()) // remove white spaces for each line
    .map((e) => e.split(",").map((e) => e.trim())) // split each line to array
    .map((e) => e.toString().split("\t")) // split each element to '\t' for row elements
    .filter((e) => e[0] === empno) // filter from employee id
    .filter((e) => new Date(e[1]) >= startDate && new Date(e[1]) <= endDate); // filter for date

  var map = {};
  var options = { hour12: false };
  data.forEach((e) => {
    var d = new Date(e[1]);
    if (!map[d.toLocaleDateString()]) map[d.toLocaleDateString()] = [];
    map[d.toLocaleDateString()].push(e[1]);
  });
  var finalResult = [];
  Object.keys(map).forEach((key) => {
    var sortedArray = map[key].sort((a, b) => new Date(a) - new Date(b));
    var entryTime = new Date(sortedArray[0]);
    entryTime = moment(entryTime, "hh:mm:ss A").format("HH:mm:ss");
    var exitTime = new Date(sortedArray[sortedArray.length - 1]);
    exitTime = moment(exitTime, "hh:mm:ss A").format("hh:mm:ss");
    var totalHours = parseInt(exitTime) - parseInt(entryTime);
    finalResult.push({
      date: new Date(key).toLocaleDateString(),
      dayOfTheWeek: weekDays[new Date(key).getDay()],
      startTime: entryTime,
      endTime: exitTime,
      Hours: totalHours + " Hours",
      overtime: totalHours - 8.5 + " Hours",
    });
  });
  return finalResult;
};
