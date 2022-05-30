const db = require("./db.js");
const parkerlaubnis = require("../../cypress/fixtures/parkerlaubnis.json");

describe('should delete all', () => {

    test('ARRANGE should delete all entries, specific one', async () => {
        await expect(db.deleteAll()).resolves.toBe(true);
    })
    test('ARRANGE should have no entries in the beginning', async () => {
        await expect(db.getCount()).resolves.toBe(0);
    })

    test('ARRANGE should insert one entry, to have something to delete', async () => {
        const result = await db.create(parkerlaubnis);
        expect(result.ok).toBe(true);
    })

    test('ARRANGE should have exactly one entry', async () => {
        await expect(db.getCount()).resolves.not.toBe(0);
    })

    test('ACT should delete all entries, specific one', async () => {
        await expect(db.deleteAll()).resolves.toBe(true);
    })

    test('ASSERT should have no entries', async () => {
        await expect(db.getCount()).resolves.toBe(0);
    })
})