function getSearchTexts() {
    return getSearchInputField() === null
        ? []
        : getSearchInputField().value.trim().split(" ");
}

function getSearchInputField(){
    return getElementById("searchInput");
}