import connection from "../config/connectDB"

let getHomePage = (req,res) => {
    let data = []
    connection.query(
        'SELECT * FROM `users`',
        function(err, results, fields) {
          console.log("===== CHECK MYSQL =====");
          console.log(results); // results contains rows returned by server
          //data = results[0]; 
          data = results.map((row) => {return row}) // fields contains extra meta data about results, if available
          return res.render('index.ejs', {dataUser: (data)});
        }
        );
}

module.exports = {
    getHomePage
}