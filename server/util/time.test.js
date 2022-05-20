const time = require('./time');

describe('time', () => {

    describe('time.getNowAsYYYYMMDD', () => {

        it('should return the date from now in format YYYYMMDD', () => {
            // act
            const now = time.getNowAsYYYYMMDD();
            // assert
            expect(now).toMatch(/^\d{4}\d{2}\d{2}$/);
        });

        it('should return the date from now containing actual year, month and day', () => {
            // arrange
            let year = new Date().getFullYear();
            let month = new Date().getMonth() + 1;
            let day = new Date().getDate();

            // act
            const now = time.getNowAsYYYYMMDD();

            // assert
            expect(now.substring(0, 4)).toBe(year.toString());
            expect(now.substring(4, 6).includes(month.toString())).toBe(true);
            expect(now.substring(6, 8).includes(day.toString())).toBe(true);
        });

    });

    describe('time.getNowAsHHMMSS', () => {
        it("should return the date from now in format HHMMSS", () => {

            // act
            const now = time.getNowAsHHMMSS();

            // assert
            expect(now).toMatch(/^\d{2}\d{2}\d{2}$/);
        })

        it(" should return from now containing actual year, month and day", () => {
            // arrange
            let hour = new Date().getHours();
            let minute = new Date().getMinutes();
            let second = new Date().getSeconds();

            // act
            const now = time.getNowAsHHMMSS();

            // assert
            expect(now.substring(0, 2)).toBe(hour.toString());
            expect(now.substring(2, 4).includes(minute.toString())).toBe(true);
            expect(now.substring(4, 6).includes(second.toString())).toBe(true);
        });
    });


    describe('time.createLetzteAenderung', () => {
        it("should return the 'letzte Aenderung' date from now in format DD.MM.YYYY", () => {

            // act
            const letzteAenderung = time.createLetzteAenderung();

            // assert
            expect(letzteAenderung).toMatch(/^\d{2}\.\d{2}\.\d{4}$/);
        })

        it("should return the 'letzte Aenderung' date containing actual year, month and day", () => {
            // arrange
            let year = new Date().getFullYear();
            let month = new Date().getMonth() + 1;
            let day = new Date().getDate();

            // act
            const now = time.createLetzteAenderung();

            // assert
            expect(now.split('.')[2]).toBe(year.toString());
            expect(now.split('.')[1].includes(month.toString())).toBe(true);
            expect(now.split('.')[0].includes(day.toString())).toBe(true);
        });
    });
});
