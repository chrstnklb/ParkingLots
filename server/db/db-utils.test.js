const parkerlaubnis = require("../../cypress/fixtures/parkerlaubnis.json");
const dbUtils = require("./db-utils.js");
const time = require("../../server/util/time.js");

it(`should, when add db entry, auto generates date 'letzte Aenderung' in format DD.MM.YYYY`, () => {

    // act
    let filledParkerlaubnis = dbUtils.fillUpFieldsForParkerlaubnis(parkerlaubnis);

    // assert

    const expectedDate = time.createLetzteAenderung();
    console.log("🚀 ~ file: db-utils.test.js ~ it ~ expectedDate", expectedDate)
    console.log("🚀 ~ file: db-utils.test.js ~ it ~ filledParkerlaubnis.letzteAenderung", filledParkerlaubnis.letzteAenderung)

    expect(expectedDate).not.toBeUndefined();

    expect(filledParkerlaubnis.letzteAenderung).toBe(expectedDate);
    expect(filledParkerlaubnis.letzteAenderung).not.toBeUndefined();
    expect(filledParkerlaubnis.letzteAenderung).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
});
