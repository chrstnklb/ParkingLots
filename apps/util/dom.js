function domCreateWithAttribute(tagName, attribute, attributeValue){
    let element = document.createElement(tagName)
    element.setAttribute(attribute, attributeValue);
    return element;
}

function domRemoveId(id){
    if(domIdExists(id)){
        document.getElementById(id).remove();
    }
}

function domIdExists(id){
    return document.getElementById(id) != null;
}

function domGetId(id){
    return document.getElementById(id);
}

function domSetAttribute(element, attribute, attributeValue){
    return element.setAttribute(attribute, attributeValue);
}

function domAppendChild(parent, child){
    parent.appendChild(child);
}