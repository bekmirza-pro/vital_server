import Joi from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class AdminValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }

    createSchema = Joi.object({
        name: Joi.string(),
        phone_number: Joi.number().integer().required(),
        password: Joi.string().required(),
        type: Joi.string(),
    })

    updateSchema = Joi.object({
        name: Joi.string(),
        phone_number: Joi.number().required(),
        password: Joi.string().required(),
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const { error } = this.createSchema.validate(req.body)

        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        
        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
