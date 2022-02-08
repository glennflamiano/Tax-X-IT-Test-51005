
describe('Upload the file', function () {

    it('Check date and time', function () {
        const dayjs = require("dayjs");
        const todaysDate = dayjs().format("MMM DD, YYYY");
        cy.log(todaysDate);
    });

    it('Check date and time with AM or PM', function () {
        const dayjs = require("dayjs");
        const Timenow12hours = dayjs().format("hh:mm:ss a");
        cy.log(Timenow12hours);
    });

    it('Check date and time with 24hr format', function () {
        const dayjs = require("dayjs");
        const Timenow24hours = dayjs().format("H:mm:ss");
        cy.log(Timenow24hours);
    });

    it('Check time by adding 20 minutes', function () {
        const dayjs = require("dayjs");
        const addTenMintues24hrs = dayjs().add(20, 'minutes').format('hh:mm:ss a')
        cy.log('Current Timezone in 24hrs format & add 10 Mints', addTenMintues24hrs)
    });

    it('Get only todays date', function () {
        const dayjs = require("dayjs")
        const getOnlyTodaysDate = dayjs().date()
        cy.log(getOnlyTodaysDate)
    });

    it('New York time zone', function () {
        const dayjs = require("dayjs")
        var utc = require('dayjs/plugin/utc')
        var timezone = require('dayjs/plugin/timezone')
        dayjs.extend(utc)
        dayjs.extend(timezone)
        const NewYorkTimezone = dayjs.utc().tz("America/New_York").format("h:mm:ss a")
        cy.log('New York time:', NewYorkTimezone)
    });

    it('New York time zone in 24hr format', function () {
        const dayjs = require("dayjs")
        var utc = require('dayjs/plugin/utc')
        var timezone = require('dayjs/plugin/timezone')
        dayjs.extend(utc)
        dayjs.extend(timezone)
        const NewYorkTimezone = dayjs.utc().tz("America/New_York").format("H:mm:ss")
        cy.log('New York time:', NewYorkTimezone)
    });

});