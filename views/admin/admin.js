function enableAdminArea(searchText) {
    if (searchText.includes("adminuwe")) {
        showAdminButton(true);
    } else {
        showAdminButton(false);
    }
}

function showAdminButton(shouldShow) {
    let element = document.getElementById("admin");

    if (shouldShow)
        element.style.display = "block";
    else
        element.style.display = "none";

}

function importExcel() {
    uploadExcelToDb();
    loadDbToHtmlTable();
    alert(
        "WAIT!" +
        "\n\n Database is still in creation!" +
        "\n\n 1. Please check with F12 if there are still entries are incoming!" +
        "\n\n 2. When there is no more activity, reload the page to see results!");
}