function setKennzeichenFromSearchText() {
    setInputFieldText("kennzeichen", getSearchTexts().join(" "));
}

function getVorname() {
    return getInputValueViaId("vorname");
}

function getNachname() {
    return getInputValueViaId("nachname");
}