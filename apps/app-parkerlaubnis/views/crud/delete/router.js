function deletePermission(id) {

    fetch('/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id })

    }).then(function (response) {
        if (response.ok) {
            wasDeleted = true;
            runStepsForSuccessfulPermissionSaving();
            return;
        } else
            throw new Error('Request failed.');

    }).catch(function (error) {
        console.log(error);
    });
};