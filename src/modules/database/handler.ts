import mysql from "mysql";
import token from "../../token.json";

const connection = mysql.createConnection({
    host     : "localhost",
    user     : token.mysqlId,
    password : token.mysqlPass,
    database : "r2d2"
})

export function makeQuery(queryString:string):Promise<Array<any>> {
    return new Promise((resolve, reject) => {
        connection.query(queryString, function (error, results) {
            if (error)
                reject(error);
            else
                resolve(results);
        });
    })
}