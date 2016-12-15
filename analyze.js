var parsedData = require('./parse')('parking_feb_2016.csv');
var _ = require('lodash');
var uniq = require('uniq');

  module.exports = function () {

  return {
    ticketCount: ticketCount,
    violationTypes: violationTypes,
    violationFrequency: violationFrequency
  };

  function ticketCount(done) {
    parsedData.rawData(done);
  };

  function violationTypes(done) {
     parsedData.rawData(function dataDone(data){
         var violations = data.map(function dataMap(item) {
             var slicedToviolations = item.slice(9,10);
             return slicedToviolations;
         });
         violations = violations.slice(1);
         violations = _.flattenDeep(violations);
         var filterdViolations = uniq(violations);
          done(filterdViolations.length);
     });
 };

 function violationFrequency(done) {

   var frequency = {};

   parsedData.rawData(function dataDone(data){
       var violations = data.map(function dataMap(item) {
           var slicedToviolations = item.slice(9,10);
           return slicedToviolations;
       });
       violations = violations.slice(1);
       violations.forEach(function(violation) {
         if (frequency[violation] !== undefined) {
            frequency[violation] ++;
          } else {
            frequency[violation] = 1;
          }
       });
       console.log(frequency);

       var sortViolations = [];
       for (var violations in frequency)
        sortViolations.push([violations, frequency[violations]]);

       var sortedViolations = _.flattenDeep(sortViolations);
       console.log(_.uniqBy(sortedViolations, _.indexOf(sortedViolations)));
       console.log(_.max(sortedViolations));
       console.log(_.indexOf(sortedViolations, Math.max(sortedViolations)));
 });
}
}
