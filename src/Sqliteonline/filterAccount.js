import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
    name: 'account',
    createFromLocation: "~sqliteDB.db",
});
export const filterAccount = (data) => {
    return new Promise((resolve, reject) => {
        let result = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT * from account WHERE cct_id = ?', [data], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    let item = results.rows.item(i);
                    result.push(item);
                }
                resolve(result);
            }, (error) => {
                reject(error)
            });
        });
    });
}
export default filterAccount;

