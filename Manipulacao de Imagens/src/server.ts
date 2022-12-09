import express, { ErrorRequestHandler, json } from 'express';
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'
import { sequelize } from './instances/mysql';
import router from './routes/routes';
import { Server } from 'http';
import { MulterError } from 'multer';

dotenv.config()
const app = express();

app.use(json())
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({extended: true}))

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400);

    if(err instanceof MulterError) {
        res.json({error: err.code})
    } else {
        res.json({error: 'Ocorreu algum erro.'});
    }
}

app.use(errorHandler);

app.use(router)

app.listen(8819, async ()=> {
    await sequelize.sync({})
    console.log("App running on 8819!")
})