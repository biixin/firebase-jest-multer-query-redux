import { Router, Request } from 'express';

import * as HomeController from '../controllers/homeController';
import * as CategoryController from '../controllers/categoryController';
import * as TaskController from '../controllers/taskController';
import * as AuthController from '../controllers/authController';
import { Auth } from './../middlewares/auth';
import multer from 'multer';
import { v4 } from 'uuid';

const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './tmp')
    },
    filename: (req, file, cb) => {
        cb(null, `${v4()}.jpg`)
    }
})

const upload = multer({
    fileFilter: (req, file, cb) => {
        const allowed: string[] = ['image/jpg', 'image/jpeg','image/png'];

        if(allowed.includes(file.mimetype)) {
            cb(null, true)
        } else {
            return cb(new Error('Só aceitamos [jpg, jpge, png] como extensão de imagem!'))
        }

    },
    limits: {fieldSize: 2000000},
    storage: storageConfig
})

const router = Router();

router.post('/upload', upload.array('img'), HomeController.uploadFile)
router.get('/image', HomeController.FindAllImages)

//user
router.get('/users', HomeController.FindAll);
router.get('/users/:id', HomeController.FindOne);
router.post('/users', HomeController.Create);
router.put('/users/:id', HomeController.Update);
router.delete('/users/:id', HomeController.Destroy);

//categories
router.get('/categories', CategoryController.FindAll);
router.get('/categories/:id', CategoryController.FindOne);
router.post('/categories', CategoryController.Create);

//tasks
router.get('/tasks', TaskController.FindAll);
router.get('/tasks/:id', TaskController.FindOne);
router.post('/tasks', TaskController.Create);
router.post('/tasks/:id', TaskController.Update);
router.delete('/tasks/:id', TaskController.Destroy);
router.put('/tasks/:id', TaskController.Check);

//auth
router.post('/login', AuthController.Login);
router.post('/register', AuthController.Register);
router.post('/request', Auth.private, AuthController.AccountREQUEST);

export default router;