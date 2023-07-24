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

let getDetailUser = async (req, res) => {
    let id = req.params.userId;
    let [user] = await pool.execute(`SELECT * FROM users WHERE id_user = ?`,[id]) // id la tham so vao dau ?  => id_user = id
    return res.send(JSON.stringify(user));
}

let createNewUser = async (req, res) => {
    console.log("===> check req: ", req.body);
    let {firstName,lastName,address,email} = req.body;
    await pool.execute('insert into users(firstName, lastName, address, email) values (?,?,?,?)',[firstName,lastName,address,email])
    return res.redirect('/');
}

let deleteUser = async (req,res) => {
    let id = req.body.userId;
    await pool.execute("Delete from users where id_user = ?",[id])
    return res.redirect('/');
}

let updateUser = async (req,res) => {
    let id = (req.params.userId);
    let [user] = await pool.execute("select * from users where id_user = ?",[id]);
    return res.render("update.ejs", {dataUser: user[0]})
}

let postUpdateUser = async (req,res) => {
    let {firstName,lastName,email,address,userId} = req.body;
    await pool.execute("update users set firstName = ?, lastName = ?, email = ?, address = ? where id_user = ?",[firstName,lastName,email,address,userId])
    return res.redirect("/");
}

module.exports = {
    getHomePage,
    getDetailUser,
    createNewUser,
    deleteUser,
    updateUser,
    postUpdateUser
}