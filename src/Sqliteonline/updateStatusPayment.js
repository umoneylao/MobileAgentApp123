import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
    name: 'tbPayment',
    createFromLocation: "~sqliteDB.db",
});
export const updateStatusPayment = (data) => {
    return new Promise((resolve, reject) => {
        var query = "UPDATE tbPayment SET status=? WHERE AccountID=?";
        var param = [data.status, data.AccountID]
        db.transaction((tx) => {
            tx.executeSql(query, param, (tx, results) => {
                resolve(results)
            }, function (tx, err) {
                reject(err)
                return;
            });
        });
    });
}
export default updateStatusPayment;

