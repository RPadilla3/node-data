var parse = require('./parse');
var parsedData = parse();
var analyze = require('./analyze');
// var numberOfTickets = parsedData.rawData(function done(data){
//   console.log('Number of tickets issued equals ' + data.length);
// });
var numberOfTickets = analyze().ticketCount(function done(data) {
  console.log('# of tickets are equal to ' + data.length);
});
