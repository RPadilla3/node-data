var analyze = require('./analyze');
var numberOfTickets = analyze().ticketCount(function done(data) {
  console.log('# of tickets are equal to: ' + data.length );
});
var violationNumber = analyze().violationTypes(function done(data) {
  console.log('Number of violation types: ' + data);
});
analyze().violationFrequency();
