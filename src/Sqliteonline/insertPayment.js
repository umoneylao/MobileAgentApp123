import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
    name: 'tbPayment',
    createFromLocation: "~sqliteDB.db",
});
export const insertPayment = (data) => {
    return new Promise((resolve, reject) => {
        let result = [];
        var query = "INSERT INTO tbPayment (ProcessCode,Amount,ActionNode,PaymentCode,AccountID,TransactionDescription,Phone,ImageName,EffectType,CustomerGender,CustomerName,ToName,FromName,Language,payDate,status) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)";
        var param = [data.ProcessCode, data.Amount, data.ActionNode, data.PaymentCode, data.AccountID, data.TransactionDescription, data.Phone, data.ImageName, data.EffectType, data.CustomerGender, data.CustomerName, data.ToName, data.FromName, data.Language, data.payDate, data.status]
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
export default insertPayment;

