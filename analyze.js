var parsedData = require('./parse');

module.exports = function () {

  return {ticketCount: ticketCount};

  function ticketCount(done) {
    parsedData().rawData(done);
  };
}
