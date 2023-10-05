import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
    name: 'tbPayment',
    createFromLocation: "~sqliteDB.db",
});
export const updateImgName = (data) => {
    return new Promise((resolve, reject) => {
        var query = "UPDATE tbPayment SET ImageName=? WHERE AccountID=?";
        var param = [data.ImageName, data.AccountID]
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
export default updateImgName;

