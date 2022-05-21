const { extendLetzteAenderung } = require("./table");
const { createLetzteAenderung } = require("../../../../server/util/time");

describe("test letzteAnderung extensions for time differences", () => {

    let days = 24 * 60 * 60 * 1000;

    test.each([
        [0, " (neu)"],
        [1, " (vor einem Tag)"],
        [3, " (vor 3 Tagen)"],
        [3 * 7, " (vor 3 Wochen)"],
        [3 * 30, " (vor 3 Monaten)"],
        [3 * 365, " (vor 3 Jahren)"],
    ])('test extensions for letzteAenderung and %i days is %s',
        (daysSinceLetzteAenderung, expectedExtensions) => {
            // arrange
            jest.useFakeTimers('modern')
            jest.setSystemTime(new Date() - daysSinceLetzteAenderung * days);
            let letzteAenderung = createLetzteAenderung();
            jest.useRealTimers();
            // act
            let extendedLetzteAnderung = extendLetzteAenderung(letzteAenderung);
            //assert
            expect(extendedLetzteAnderung).toBe(letzteAenderung + expectedExtensions);
        },
    );
});