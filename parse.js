var fs = require('fs');
var parse = require('csv-parse');
var file = 'parking_feb_2016.csv';
var theDataFile = null;


module.exports = function moduleFunctions() {

  return {
    rawData: rawData
  };

  function rawData (done) {
    var rawData = [];
     fs.createReadStream('parking_feb_2016.csv').pipe(parse({delimiter: ','}))
     .on('data', function(csvrow) {
       rawData.push(csvrow);
     })
     .on('end', function() {
        done(rawData);
     });
   }

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
