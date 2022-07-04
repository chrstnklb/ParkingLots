const app = require("./monitor-app-server");
const supertest = require("supertest");

describe('test the monitor app server responses', () => {

    let request = null
    let server = null

    beforeAll(async () => {
        server = await app.listen()
        request = await supertest.agent(server)
    })

    afterAll(async () => { await server.close() })

    test("GET /", async () => {
        let res;
        await request.get("/")
            // .expect(200)
            .then((response) => {
                expect(response.status).toBe(200);
                console.log("🚀 ~ file: monitor-app-server.test.js ~ line 27 ~ test ~ res", response)
                res = response;
                console.log("🚀 ~ file: monitor-app-server.test.js ~ line 25 ~ .then ~ response.text", response.text)
                expect(response.text).toContain("Aktuelle Parkprobleme");
            })
        // write the response to a json file
        const fs = require("fs");
        fs.writeFileSync("response.json", JSON.stringify(res.body));
    });

});
