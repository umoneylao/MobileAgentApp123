import SQLite from 'react-native-sqlite-storage';
let db;
db = SQLite.openDatabase({
    name: 'account',
    createFromLocation: "~sqliteDB.db",
});
export const insertAccount = (data) => {
    console.log("insertAccount | Begin")
    return new Promise((resolve, reject) => {
        var query = "INSERT INTO account (account_id,account_state_id,account_state_name,address,balance,birthday,cct_id,created_date,customer_image,district,expired_date,family_refence,first_name,gender,issued_date,last_name,msisdn,paper_number,paper_type,party_id,party_role_id,province,recipient_type,role_id,role_name,village) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        var param = [data.account_id,data.account_state_id,data.account_state_name,data.address,data.balance,data.birthday,data.cct_id,data.created_date,data.customer_image,data.district,data.expired_date,data.family_refence,data.first_name,data.gender,data.issued_date,data.last_name,data.msisdn,data.paper_number,data.paper_type,data.party_id,data.party_role_id,data.province,data.recipient_type,data.role_id,data.role_name,data.village]
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
export default insertAccount;

