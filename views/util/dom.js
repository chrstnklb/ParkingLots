const NO_RESULT_FOUND_ELEMENT_ID = "noResult";
const SPINNER_ELEMENT_ID = "spinner";
const ADMIN_BUTTON_ELEMENT_ID = "admin";

function domGetInputValueViaId(id) {
    return domGetValueOfElement(domGetElementViaId(id));
}

function domGetValueOfElement(element) {
    if (element === null) {
        element = "";
    }
    return element.value;
}

function domGetElementViaId(id) {
    return document.getElementById(id);
}

function domSetInputFieldText(id, isNewText) {
    domGetElementViaId(id).value = isNewText ? isNewText : "";
}

function domCreateWithAttribute(tagName, attribute, attributeValue) {
    let element = document.createElement(tagName)
    element.setAttribute(attribute, attributeValue);
    return element;
}

function domRemoveId(id) {
    if (domIdExists(id)) {
        document.getElementById(id).remove();
    }
}

function domIdExists(id) {
    return document.getElementById(id) != null;
}

function domGetId(id) {
    return document.getElementById(id);
}

function domSetAttribute(element, attribute, attributeValue) {
    return element.setAttribute(attribute, attributeValue);
}

function domAppendChild(parent, child) {
    parent.appendChild(child);
}

function domRefreshPage() {
    location.reload();
}

function domShowOrHideElement(id, shouldShow) {
    let element = domGetElementViaId(id);

    if (shouldShow)
        element.style.display = "block";
    else
        element.style.display = "none";
}

function domShowSpinner() {
    domShowOrHideElement(SPINNER_ELEMENT_ID, true);
}

function domHideSpinner() {
    domShowOrHideElement(SPINNER_ELEMENT_ID, false);
}

function domShowNoResultFoundHint() {
    domShowOrHideElement(NO_RESULT_FOUND_ELEMENT_ID, true);
}

function domHideNoResultFoundHint() {
    domShowOrHideElement(NO_RESULT_FOUND_ELEMENT_ID, false);
}

function domShowAdminButton() {
    domShowOrHideElement(ADMIN_BUTTON_ELEMENT_ID, true);
}

function domHideAdminButton() {
    domShowOrHideElement(ADMIN_BUTTON_ELEMENT_ID, false);
}