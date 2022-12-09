import { Request, Response } from 'express';
import {User} from '../models/User'
import {Category} from '../models/Category'
import { Task } from '../models/Task';


export const FindAll = async (req: Request, res: Response)=>{
    const {userId} = req.query
    let task = await Task.findAll(
        {where: 
            {userId},
        include: Category
        },
    )
    return task.length > 0
    ?res.status(200).json(task)
    :res.status(204).send()
};

export const FindOne = async (req: Request, res: Response) => {
    const {id} = req.params
    const task = await Task.findByPk(id, {include: Category});

    return task 
    ?res.status(200).json(task) 
    :res.status(204).send()



}
export const Create = async (req: Request, res: Response) => {
    const {isDone, title, description, dueDate, userId, categoryId} = req.body;

    if(title && description && dueDate && userId && categoryId) {
        const user = await User.findByPk(userId);

        if(!user) {
            return res.status(404).json({error: 'Usuário não encontrado.'})
        }
        const category = await Task.create({
            title,
            description,
            dueDate,
            userId,
            categoryId
        })
        return res.status(201).json(category);
    }
    return res.status(404).json({error: 'Dados nao enviados'})

    


}

export const Update = async (req: Request, res: Response) => {
    const {id} = req.params
    const {title, categoryId, description, dueDate} = req.body
    let user = await Task.findByPk(id);

    if(req.body) {
        if(user) {
            await Task.update(req.body, 
                {where:
                    {id: id}
                }
            )
            return res.status(200).json({result: 'Tarefa editada com sucesso.'})
        } 
        return res.status(404).json({error: 'Tarefa não encontrada.'})
    }
    return res.status(204).json({error: 'Dados não enviados.'})
    
}

export const Check = async (req: Request, res: Response) => {
    const {id} = req.params

    let user = await Task.findByPk(id);

    if(id) {
        if(user) {
            let done = user.isDone
            await Task.update({isDone: !done}, 
                {where:
                    {id: id}
                }
            )
            return res.status(200).json({result: 'Tarefa editada com sucesso.'})
        } 
        return res.status(404).json({error: 'Tarefa não encontrada.'})
    }
    return res.status(204).json({error: 'Dados não enviados.'})
    
}


export const Destroy = async (req: Request, res: Response) => {
    const {id} = req.params
    let task = await Task.findByPk(id);
    if(task) {
        await Task.destroy({where: {id: id}})
        return res.status(200).json({result: 'Tarefa deletada com sucesso.'})
    }
    return res.status(404).json({error: 'Tarefa não encontrada.'})
}
