function calculateDaysSinceDateDDMMYYYY(letzteAenderung) {
    let year = letzteAenderung.slice(4, 8);
    let month = letzteAenderung.slice(2, 4);
    let day = letzteAenderung.slice(0, 2);
    let lastChangeDate = new Date(year, month - 1, day);
    let today = (new Date());
    return Math.floor((today - lastChangeDate) / 1000 / 60 / 60 / 24);
}

