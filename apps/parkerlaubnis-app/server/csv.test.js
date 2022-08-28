const generateFileContent = require('./csv');

const parkerlaubnis = [{
    "kennzeichen": "SAW AS 371 E",
    "land": "U.S.A.",
    "nachname": "Van Persie",
    "vorname": "Lisa Maria"
}]

const expectedCsvRow =
    "SAW AS 371 E" + ";" + "U.S.A." + ";" + "Van Persie, " + "Lisa Maria\n"

describe('csv.test.js', () => {

    test('csv row is longer then given row', () => {
        expect(generateFileContent(parkerlaubnis).length).toBeGreaterThan("testString".length);
    });

    test('csv row ends with \\n to finish as row', () => {
        let csvRow = generateFileContent(parkerlaubnis);
        expect(csvRow.substring(csvRow.length - 2)).toEqual(expect.stringMatching("\n"));
    });

    test('csv row has ; as devider', () => {
        expect(generateFileContent(parkerlaubnis)).toEqual(expect.stringContaining(";"));
    });

    test('csv row looks like this', () => {
        expect(generateFileContent(parkerlaubnis)).toEqual(expect.stringMatching(expectedCsvRow));
    });
});