const vorfaelle = require('./vorfaelle');

test.each([
    [' SAW AB 123 ', 'SAWAB123', 'delete whitespaces'],
    ['-ABC-123-', 'ABC123', 'delete "-" characters'],
    ['abc123e', 'ABC123E', 'make uppercase'],
    [' -a -b* -c 12 3  e   -   ', 'AB*C123E', 'combining all string maniplations'],

])(
    'simplify kennzeichen %s to %s, by %s',
    (kennzeichen, simplifiedKennzeichen) => {
        let result = vorfaelle.simplifyKennzeichen(kennzeichen);
        expect(result).toBe(simplifiedKennzeichen);
    },
);