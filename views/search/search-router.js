function searchAndShowPermissions() {

    // Zeige an, dass ein Zeichen eingegeben wurde
    // Zeigen an, welches Zeichen eingegeben wurde
    let searchTexts = getSearchTexts();
    console.log('searchTexts :>> ', searchTexts);

    // Sende dieses Zeichen an den Server


    // ...

    // Reiche Erlaubnisse des Servers an die table weiter, wenn nötig

    // console.log('savePermission button was clicked');

    // To avoid fetching with failure after saving an entry an following page reload
    if (searchTexts.length != 0) {

        fetch('/searched', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(searchTexts)

        }).then(function (response) {
            if (response.ok) {
                // runStepsForSuccessfulPermissionCreation();
                return;
            } else
                throw new Error('Request failed.');

        }).catch(function (error) {
            console.log(error);
        });
    }

};