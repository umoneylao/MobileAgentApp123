import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
    name: 'account',
    createFromLocation: "~sqliteDB.db",
});
export const getTransaction = () => {
    return new Promise((resolve, reject) => {
        let result = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM account WHERE balance <= 0 ORDER BY balance DESC', [], (tx, results) => {
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

export default getTransaction;