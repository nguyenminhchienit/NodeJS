import pool from "../config/connectDB"

let getHomePage = async (req,res) => {
    // let data = []
    // connection.query(
    //     'SELECT * FROM `users`',
    //     function(err, results, fields) {
    //       data = results.map((row) => {return row}) // fields contains extra meta data about results, if available
    //       return res.render('index.ejs', {dataUser: (data)});
    //     }
    //     );

    //CACH 2
    const [rows, fields] = await pool.execute('SELECT * FROM `users`');
    return res.render('index.ejs', {dataUser: (rows)});
}

module.exports = {
    getHomePage
}