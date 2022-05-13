const create = require('./create.js');

test('received Date is in format DD.MM.YYYY', () => {
    expect(create().toString()).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
});