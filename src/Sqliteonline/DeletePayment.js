import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
    name: 'tbPayment',
    createFromLocation: "~sqliteDB.db",
});
export const deletePayment = () => {
    return new Promise((resolve, reject) => {
        var query = "DELETE FROM tbPayment";
        db.transaction((tx) => {
            tx.executeSql(query, (tx, results) => {
                resolve(results)
            }, function (tx, err) {
                reject(err)
                return;
            });
        });
    });
}
export default deletePayment;

