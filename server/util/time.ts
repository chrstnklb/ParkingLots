
// TODO: in time-server bringen
export function getActualDate():String {
    return ((new Date()).toISOString()).slice(0, 19)
}