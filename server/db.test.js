const add = require("./db.js").add;
const getErlaubnis = require("./db.js").getErlaubnis;
const time = require("./util/time.js");

const today = time.getTodayAsMs();
console.log("🚀 ~ file: db.test.js ~ line 6 ~ today", today)

const addEntry = {
    "_id" : today,
    "land" : "Deutschland"
}

test('add db entry auto generates date in format DD.MM.YYYY', async () => {
    
    // act
    await add(addEntry);
    const erlaubnis = await getErlaubnis(ID_OF_ACTUAL_ENTRY);
    
    // assert
    // expect expectedDate not to be undefined
    const expectedDate = time.createLetzteAenderung();
    
    expect(erlaubnis.letzteAenderung).toBe(expectedDate);
    expect(erlaubnis.letzteAenderung).not.toBeUndefined();
    expect(expectedDate).not.toBeUndefined();
    expect(erlaubnis.letzteAenderung).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
});
