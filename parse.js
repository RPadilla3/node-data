var fs = require('fs');
var parse = require('csv-parse');
var file = 'parking_feb_2016.csv';
var theDataFile = null;
var data = [];

console.log(file);

module.exports = function setup() {
  return fs.createReadStream('parking_feb_2016.csv').pipe(parse({delimiter: ','}))
  .on('data', function(csvrow) {
    data.push(csvrow);
  })
  .on('end', function() {
    console.log(data.length);
    return data.length;
  });



};



//
 // process.argv.forEach(function findFile(arg) {
//     var argPieces = arg.split('/dc');
//     if (argPieces[1] === '-parking-data-node/simple_data') {
//         theDataFile = argPieces[1];
//         console.log(theDataFile);
//     }
//     console.log(theDataFile);
// })
