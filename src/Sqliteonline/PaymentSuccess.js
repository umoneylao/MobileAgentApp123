import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
    name: 'tbPayment',
    createFromLocation: "~sqliteDB.db",
});
export const getPayment = () => {
    return new Promise((resolve, reject) => {
        let result = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tbPayment WHERE status=1 ORDER BY status ASC', [], (tx, results) => {
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

export default getPayment;