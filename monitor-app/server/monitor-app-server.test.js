const axios = require('axios');
const time = require('../../server/util/time.js');
const { monitorAppUrl } = require("../../config.js");

describe('test the monitor app server responses', () => {
    test('call the monitor-app-server via "/" should deliver a html page', async () => {

        // ACT
        const response = await axios.get(monitorAppUrl + '/');

        // ASSERT
        expect(response.data).toContain('<!DOCTYPE html>');

    });

    test('calling the monitor-app-server via "/" adds a car', async () => {

        //ARRANGE
        await axios({
            method: 'post',
            url: monitorAppUrl + '/plate',
            data: {
                zeitpunkt: time.getNowAsHH_MM_SS(),
                parkplatz: 'parkingLot',
                kennzeichen: 'ABC123',
                parkerlaubnisse: 'P1, P2'
            }
        })

        const response = await axios.get(monitorAppUrl + '/');

        // ASSERT
        expect(response.data).toContain('<!DOCTYPE html>');
        expect(response.data).toContain('ABC123');
        expect(response.status).toBe(200);

    });

    test.each([
        [time.getNowAsHH_MM_SS().toString(), 'P1', 'SAW TEST 1', 'P2, P3', 200],
        ['', 'P2', 'SAW TEST 1', 'P3, P4', 400],
        [time.getNowAsHH_MM_SS().toString(), '', 'SAW TEST 1', 'P4, P5', 400],
        [time.getNowAsHH_MM_SS().toString(), 'P4', '', 'P5, P6', 400],
        [time.getNowAsHH_MM_SS().toString(), 'P5', 'SAW TEST 1', '', 400]
    ])('calling the monitor-app-server via "/" adds a car event',
        async (zeitpunkt, parkplatz, kennzeichen, parkerlaubnisse, statusCode) => {
            await axios.post(monitorAppUrl + '/plate', {
                zeitpunkt: zeitpunkt,
                parkplatz: parkplatz,
                kennzeichen: kennzeichen,
                parkerlaubnisse: parkerlaubnisse
            })
                .then(function (response) {
                    if (response) {
                        console.log(response.data);
                        expect(response.status).toBe(statusCode);
                        expect(response.status).toBe(200);
                        expect(response.data).toBe("ok");
                    }
                })
                .catch(function (error) {
                    if (error) {
                        console.log(error.response.data)
                        expect(error.response.status).toBe(statusCode);
                        expect(error.response.status).toBe(400);
                        expect(error.response.data).toContain('is missing');
                    }
                })
        });
});
