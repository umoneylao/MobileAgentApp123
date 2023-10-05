import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
    name: 'account',
    createFromLocation: "~sqliteDB.db",
});
export const deleteAccount = () => {
    return new Promise((resolve, reject) => {
        var query = "DELETE FROM account";
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
export default deleteAccount;

