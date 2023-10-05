import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
    name: 'account',
    createFromLocation: "~sqliteDB.db",
});
export const updateAccount = (data) => {
    return new Promise((resolve, reject) => {
        var query = "UPDATE account SET balance=? WHERE account_id=?";
        var param = [data.balance, data.account_id]
        db.transaction((tx) => {
            tx.executeSql(query, param, (tx, results) => {
                resolve(param)
            }, function (tx, err) {
                reject(err)
                return;
            });
        });
    });
}
export default updateAccount;

