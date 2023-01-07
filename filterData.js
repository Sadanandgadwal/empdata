const fs = require('fs');
const csv = require('csv-parser');
const csvParser = require('csv-parser');
const inputFilePath = './uploads/attlog_Jan-Feb2022.dat';
const DataFrame = require('dataframe-js').DataFrame;
let count = 0;
let obj = [];
let finalData = [];
module.exports = (filename, stdt, endt, empno) => {
    fs.createReadStream(inputFilePath)
        .pipe(csvParser())
        .on('data', function(data) {
            try {
                if (Object.keys(data).length != 0) {
                    // console.log(data['25']);
                    const emp = data['25'].replace(/(\r\n|\n|\r)/gm, "");
                    if (emp === empno) {
                        // console.log(data)
                        obj[count++] = data;
                    }
                }
            } catch (err) {
                //error handler
            }
        })
        .on('end', function() {
            //some final operation
            let len = Object.keys(obj).length;
            let temp = 0;
            // console.log(typeof(temp));

            obj.forEach(element => {
                if (new Date(element['2022-02-01']) >= new Date(stdt) &&
                    new Date(element['2022-02-01']) <= new Date(endt)) {
                    finalData[temp] = element;
                    console.log(element);
                    temp++;
                }

            });

            for (let i = 0; i < finalData.length; i++) {
                if (i < finalData.length && finalData[i]['2022-02-01'] == finalData[i + 1]['2022-02-01']) {

                }
            }
            console.log('temp', temp);
        });
    // DataFrame.fromCSV(inputFilePath).then(df => df.show())
}