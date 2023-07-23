import express from "express";
import homeController from '../controller/homeController'

let router = express.Router();

const initWebRouter = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/detail/user/:userId',homeController.getDetailUser)

    router.post('/create-new-user', homeController.createNewUser)

    router.post("/delete-user/:userId",homeController.deleteUser)

    router.get("/update/:userId",homeController.updateUser);

    router.post("/update-user",homeController.postUpdateUser);
      
    router.get('/home', (req, res) => {
          res.send('Welcome to Takis');
    })

    return app.use('/',router);
}

export default initWebRouter;