import { Request, Response } from 'express';
import {User} from '../models/User'
import {Category} from '../models/Category'

export const FindAll = async (req: Request, res: Response)=>{
    const {userId} = req.query

    let category = await Category.findAll({
        where: {
            userId
        }
    })

    return category.length > 0
    ?res.status(200).json(category)
    :res.status(204).send()
};

export const FindOne = async (req: Request, res: Response) => {
    const {id} = req.params
    const category = await Category.findByPk(id, {include: User});

    return category 
    ?res.status(200).json(category) 
    :res.status(204).send()



}
export const Create = async (req: Request, res: Response) => {
    const {title, color, userId} = req.body;

    if(title && color && userId) {
        const hasCategory = await Category.findOne({
            where: {
                title,
                userId
            }
        });
    
        if(hasCategory) {
            return res.status(403).json({error: 'Titulo já existente'})
        }
    
        const category = await Category.create({
            title,
            color,
            userId
        })
        return res.status(201).json(category);
    }
    return res.status(404).json({error: 'Dados nao enviados'})


}

export const Update = async (req: Request, res: Response) => {
    const {id} = req.params
    const {name, idade} = req.body
    let user = await User.findByPk(id);

    if(req.body) {
        if(user) {
            await User.update(req.body, 
                {where:
                    {id: id}
                }
            )
            return res.status(200).json({result: 'Usuário editado com sucesso.'})
        } 
        return res.status(404).json({error: 'Usuário não encontrado.'})
    }
    return res.status(204).json({error: 'Dados não enviados.'})
    
}


export const Destroy = async (req: Request, res: Response) => {
    const {id} = req.params
    let user = await User.findByPk(id);
    if(user) {
        await User.destroy({where: {id: id}})
        return res.status(200).json({result: 'Usuário deletado com sucesso.'})
    }
    return res.status(404).json({error: 'Usuário não encontrado.'})
}
