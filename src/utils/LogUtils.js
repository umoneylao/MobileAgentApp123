import Reactoron from 'reactotron-react-native'

export function d(logFrom, name, log) {
    var fromName = logFrom.constructor && logFrom.constructor.name ? logFrom.constructor.name : logFrom;
    fromName = fromName.replace('String', logFrom);
    Reactoron.log(log)
    Reactoron.log(`_____________DEBUG_____________${fromName}: ${name}_____________`)
}

export function i(logFrom, name, log) {
    var fromName = logFrom.constructor && logFrom.constructor.name ? logFrom.constructor.name : logFrom;
    fromName = fromName.replace('String', logFrom);
    Reactoron.log(log)
    Reactoron.log(`_____________INFO_____________${fromName}: ${name}_____________`)
}

export function e(logFrom, name, log) {
    var fromName = logFrom.constructor && logFrom.constructor.name ? logFrom.constructor.name : logFrom;
    fromName = fromName.replace('String', logFrom);
    Reactoron.log(log)
    Reactoron.log(`_____________ERROR_____________${fromName}: ${name}_____________`)
}

export function getIsoObject(logFrom, name, isoObject) {
    Reactoron.log(`DEBUG_${logFrom.constructor && logFrom.constructor.name}: ${name}\n ${JSON.stringify(isoObject)}`.replace('undefined', ''))
}

export function log(logFrom, name, log) {
    var fromName = logFrom.constructor && logFrom.constructor.name ? logFrom.constructor.name : logFrom;
    fromName = fromName.replace('String', logFrom);
    Reactoron.log(`__LOG__${fromName}: ${name}__\n${log}`)
}

export default {
    d,
    i,
    e,
    getIsoObject,
    log
}