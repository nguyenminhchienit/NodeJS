import pool from "../config/connectDB"
import multer from "multer"


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

let getUploadFile = async (req,res) => {
    return res.render("upload.ejs")
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer().single('file_pic');
let handleUploadFile = async (req,res) => {
    // 'profile_pic' is the name of our file input field in the HTML form

    upload(req, res, function(err) {
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any

        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
            return res.send('Please select an image to upload');
        }
        else if (err instanceof multer.MulterError) {
            //console.log(res.send(err))
            return res.send(err);
        }
        else if (err) {
            //console.log(res.send(err))
            return res.send(err);
        }
        // Display uploaded image for user validation
        res.send(`You have uploaded this image: <hr/><img src="/images/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
    });
}


module.exports = {
    getHomePage,
    getDetailUser,
    createNewUser,
    deleteUser,
    updateUser,
    postUpdateUser,
    getUploadFile,
    handleUploadFile
}