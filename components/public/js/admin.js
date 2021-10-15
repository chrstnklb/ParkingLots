function enableAdminArea(searchText) {
    if(searchText.includes("adminuwe")){
        showAdminButton(true);
    }else{
        showAdminButton(false);
    }
}

function showAdminButton(shouldShow) {
    let x = document.getElementById("admin");
    if (shouldShow) {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
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