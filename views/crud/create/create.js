function setInsertMode(mode) {
  insertMode = mode;
}

function insertPermission() {
  let fetchMode;
  let id;

  switch (insertMode) {
    case "create":
      fetchMode = "/create";
      break;

    case "edit":
      fetchMode = "/edit";
      id = ID_OF_ACTUAL_ENTRY;
      break;
    default:
      break;
  }

  fetch(fetchMode, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      parkerlaubnis: {
        _id: id?.toString(),
        nachname: domGetInputValueViaId("nachname"),
        vorname: domGetInputValueViaId("vorname"),
        unternehmen: domGetInputValueViaId("unternehmen"),
        bereich: domGetInputValueViaId("bereich"),
        telefon: domGetInputValueViaId("telefon"),
        kennzeichen: domGetInputValueViaId("kennzeichen"),
        land: domGetInputValueViaId("land"),
        fahrzeug: domGetInputValueViaId("fahrzeug"),
        farbe: domGetInputValueViaId("farbe"),
        bemerkung: domGetInputValueViaId("bemerkung"),
        parkplaetze: getInputValuesForParkingLotsAsString(),
        searchHash:
          domGetInputValueViaId("nachname") +
          domGetInputValueViaId("vorname") +
          domGetInputValueViaId("unternehmen") +
          domGetInputValueViaId("bereich") +
          domGetInputValueViaId("telefon") +
          domGetInputValueViaId("kennzeichen") +
          domGetInputValueViaId("land") +
          domGetInputValueViaId("fahrzeug") +
          domGetInputValueViaId("farbe") +
          domGetInputValueViaId("bemerkung") +
          getInputValuesForParkingLotsAsString(),
      },
    }),
  })
    .then(function (response) {
      if (response.ok) {
        runStepsForSuccessfulPermissionSaving();
        return;
      } else throw new Error("Request failed.");
    })
    .catch(function (error) {
      console.log(error);
    });
}

function runStepsForSuccessfulPermissionSaving() {
  showSuccessMessage(getVorname(), getNachname());
  domRefreshPage();
}

function showSuccessMessage(vorname, nachname) {
  alert(
    "\nParkerlaubnis für \n" +
      vorname +
      " " +
      nachname +
      "\nwurde ERFOLGREICH gespeichert!"
  );
}
