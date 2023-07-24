import pool from "../config/connectDB"

let getAllUsers = async (req,res) => {
    const[users] = await pool.execute("SELECT * FROM USERS")
    return res.status(200).json({
        message: "OK",
        data: users
    })
}

let createUser = async (req,res) => {
    let {firstName, lastName, email, address} = req.body;

    if(!firstName || !lastName || !email || !address){
        return res.status(200).json({
            message: "Missing request"
        })
    }
    await pool.execute('insert into users(firstName, lastName, address, email) values (?,?,?,?)',[firstName,lastName,address,email])
    return res.status(200).json({
        message: "OK"
    })
}

let updateUser = async (req,res) => {
    let {firstName,lastName,email,address,userId} = req.body;
    if(!firstName || !lastName || !email || !address || !userId){
        return res.status(200).json({
            message: "Missing request"
        })
    }
    await pool.execute("update users set firstName = ?, lastName = ?, email = ?, address = ? where id_user = ?",[firstName,lastName,email,address,userId])
    return res.status(200).json({
        message: "OK"
    })
}

let deleteUser = async (req,res) => {
    let id = req.params.userId;
    if(!id){
        return res.status(200).json({
            message: "Missing request"
        })
    }
    await pool.execute("Delete from users where id_user = ?",[id])
    return res.status(200).json({
        message: "OK"
    })
}

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}