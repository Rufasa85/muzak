const mysql = require("mysql");
let connection
if(process.env.JAWSDB_URL){
    connection= mysql.createConnection(process.env.JAWSDB_URL);
}else {

    connection = mysql.createConnection({
        host: 'localhost',
        
        // Your port; if not 3306
        port: 3306,
        
        // Your username
        user: 'root',
        
        // Your password
        password: 'password',
        database: 'top_songsDB',
    });
}

connection.connect((err) => {
    if (err) throw err;
    console.log("config done!")
})


module.exports = connection;
