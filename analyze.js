var parsedData = require('./parse')('parking_feb_2016.csv');
var _ = require('lodash');
var uniq = require('uniq');

module.exports = function() {

    return {
        ticketCount: ticketCount,
        violationTypes: violationTypes,
        violationFrequency: violationFrequency,
        lastTicketinFebruary: lastTicketinFebruary
    };

    function ticketCount(done) {
        parsedData.rawData(done);
    };

    function violationTypes(done) {
        parsedData.rawData(function dataDone(data) {
            var violations = data.map(function dataMap(item) {
                var slicedToviolations = item.slice(9, 10);
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

        parsedData.rawData(function dataDone(data) {
            var violations = data.map(function dataMap(item) {
                var slicedToviolations = item.slice(9, 10);
                return slicedToviolations;
            });
            violations = violations.slice(1);
            violations.forEach(function(violation) {
                if (frequency[violation] !== undefined) {
                    frequency[violation]++;
                } else {
                    frequency[violation] = 1;
                }
            });
            console.log(frequency);

            var sortViolations = [];
            for (var violations in frequency)
                sortViolations.push([violations, frequency[violations]]);

            var sortedViolations = _.flattenDeep(sortViolations);
            console.log(_.max(sortedViolations));
        });
    }

    function lastTicketinFebruary() {
        parsedData.rawData(function done(data) {
            var ticketDate = [];
            data.map(function dataMap(item) {
                var slicedToDay = item.slice(4, 5);
                slicedToDay.forEach(function getDayofWeekNumber(day) {
                    if (day === 'MONDAY') {
                        day = '-' + 1;
                    } else if (day === 'TUESDAY') {
                        day = '-' + 2;
                    } else if (day === 'WEDNESDAY') {
                        day = '-' + 3;
                    } else if (day === 'THURSDAY') {
                        day = '-' + 4;
                    } else if (day === 'FRIDAY') {
                        day = '-' + 5;
                    } else if (day === 'SATURDAY') {
                        day = '-' + 6;
                    } else if (day === 'SUNDAY') {
                        day = '-' + 7;
                    }
                    slicedToDay.splice(0, 1, day);
                });
                var slicedToWeekOfYear = item.slice(6, 7);
                slicedToWeekOfYear.forEach(function getWeekOfYear(weekNumber) {
                    if (weekNumber.length < 2) {
                        weekNumber = '2016-W0' + weekNumber;
                    } else {
                        weekNumber = '2016W' + weekNumber;
                    }
                    slicedToWeekOfYear.splice(0, 1, weekNumber);
                });
                var slicedToTime = item.slice(8, 9);
                slicedToTime.forEach(function setTimeValue(time) {
                    if (time.length < 4) {
                        time = ' 0' + time;
                    } else {
                        time = ' ' + time;
                    }
                    slicedToTime.splice(0, 1, time);
                });
                var concat = _.concat(slicedToWeekOfYear, slicedToDay, slicedToTime);
                concat = _.join(concat, '');
                ticketDate.push(concat);
            });
            var violations = ticketDate.slice(1);
            console.log(violations);
            // violations.forEach(function getMomentTimeStamp(violation) {
            //     var day = moment(violation);
            //     console.log(day);
            // });
        });
    }
}
