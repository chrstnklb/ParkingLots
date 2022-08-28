const vorfaelle = require('./vorfaelle');

it('test simplification of kennzeichen', () => {
    let result = vorfaelle.simplifyKennzeichen('ABC-123');
    expect(result).toBe('ABC123');
});


test.each([
    ['ABC-123', 'ABC123', 'delete "-" characters'],
    ['SAW AB 123', 'SAWAB123', 'delete whitespaces'],
    ['BLA-blub-1', 'BLABLUB1', 'bla'],
])(
    'simplify kennzeichen %s to %s, by %s',
    (kennzeichen, simplifiedKennzeichen) => {
        let result = vorfaelle.simplifyKennzeichen(kennzeichen);
        expect(result).toBe(simplifiedKennzeichen);
    },
);

// a test loop in jest
