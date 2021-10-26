function setKennzeichenFromSearchText() {
    domSetInputFieldText("kennzeichen", getSearchTexts().join(" "));
}

function getVorname() {
    return domGetInputValueViaId("vorname");
}

function getNachname() {
    return domGetInputValueViaId("nachname");
}