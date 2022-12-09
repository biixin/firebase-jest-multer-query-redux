import { Request, Response } from 'express';
import { Category } from '../models/Category';
import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import {User} from '../models/User'

const bcrypt = require('bcrypt');
dotenv.config()

export const Login = async (req: Request, res: Response)=>{
    try {
        if(req.body.email && req.body.password) {
            let {email, password} = req.body

            const user = await User.findOne({
                where: {
                    email
                }
                
            })
            if(!user) {
                return res.json({status: false, message: 'Dados incorretos.'})
            }
            if(user) {
                if(await bcrypt.compare(password, user?.password)) {
                const token = JWT.sign(
                    {id: user.id, email: user.email},
                    process.env.JWT_SECRET_KEY as string,
                    {expiresIn: '1h'}
                )
                res.json({status: true, user, token})
                } else {
                    res.json({status: false, error: 'Dados incorretos.'})
                }
                
            }
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }

    
};

export const Register = async (req: Request, res: Response) => {
    try {
        if(req.body.email && req.body.password && req.body.name) {
            let {name, email, password} = req.body;
            const salt = await bcrypt.genSalt(10)
            const passHASH = await bcrypt.hash(password, 10)
            
            let hasUser = await User.findOne({
                where: {
                    email
                }
            });
    
            if(hasUser) {
                return res.json({message: 'Email já cadastrado', status: false})
            }

            const newUser = User.create({
                name,
                email,
                password: passHASH
            })
            return res.status(201)
            .json({status: true, message: 'Conta criada com sucesso.' });

        } 
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: "Internal server error."})
    }

    
}

export const AccountREQUEST = async (req: Request, res: Response) => {
    let {email} = req.body
    if(email) {
        let email: string = req.body.email
    
        let user = await User.findOne({
            where: {
                email: email
            }
        });

        res.json({user})
    }
}

