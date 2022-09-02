const { newMsg, sendSchrankenVorfall } = require("./client")

test('client.test', () => {
    let result = newMsg({ parkplatz: 'P1', kennzeichen: 'SAW AB 123', })
    expect(result).toBe('P1#SAW AB 123')
})

test('sendSchrankenVorfall without server started', async () => {
    // let error = sendSchrankenVorfall();
    expect(sendSchrankenVorfall).toThrowError("ECONNREFUSED");
    // expect(error).toMatch("Error: Error: connect ECONNREFUSED 127.0.0.1:1337")
    // console.log("🚀 ~ file: client.test.js ~ line 11 ~ test ~ error", error)
})