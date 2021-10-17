
function getInputValueViaId(id) {
    return getValueOfElement(getElementById(id));
}

function getValueOfElement(element) {
    if (element === null) {
        element = "";
    }
    return element.value;
}

function getElementById(id) {
    return document.getElementById(id);
}

function setInputFieldText(id, isNewText) {
    getElementById(id).value = isNewText ? isNewText : "";
}