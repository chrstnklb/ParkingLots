export function getActualDate():String {
    return ((new Date()).toISOString()).slice(0, 19)
}