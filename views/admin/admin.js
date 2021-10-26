function enableAdminArea(searchText) {
    if (searchText.includes("adminuwe")) {
        domShowOrHideElement("admin", true);
    } else {
        domShowOrHideElement("admin", false);
    }
}