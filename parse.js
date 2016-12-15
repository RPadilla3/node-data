var fs = require('fs');
var parse = require('csv-parse');
var theDataFile = null;

module.exports = function moduleFunctions(filePath) {

    return {
        rawData: rawData
    };

    function rawData(done) {
        var rawData = [];
        fs.createReadStream(filePath)
            .pipe(parse({
                delimiter: ','
            }))
            .on('data', function(csvrow) {
                rawData.push(csvrow);
            })
            .on('end', function() {
                done(rawData);
            });
    }

    // parse('parking_feb_2016.csv', function(err, data) {
    //   console.log('parsing', data);
    // });

};
