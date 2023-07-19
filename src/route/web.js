import express from "express";
import homeController from '../controller/homeController'

let router = express.Router();

const initWebRouter = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/detail/user/:userId',homeController.getDetailUser)
      
    router.get('/home', (req, res) => {
          res.send('Welcome to Takis');
    })

    return app.use('/',router);
}

export default initWebRouter;