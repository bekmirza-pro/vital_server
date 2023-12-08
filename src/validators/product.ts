import Joi, { string } from 'joi'
import { NextFunction, Request, Response } from 'express'
import catchAsync from '../utils/catchAsync'

export class ProductValidator {
    keys = {
        required: 'required',
        optional: 'optional'
    }

    createSchema = Joi.object({
        name: Joi.string().required(),
        description: {
            uzb: Joi.string().required(),
            rus: Joi.string().required(),
            eng: Joi.string().required()
        },
        price: Joi.string(),
        images: Joi.string(),
        type: Joi.string()
    })

    updateSchema = Joi.object({
        name: Joi.string().required(),
        description: {
            uzb: Joi.string(),
            rus: Joi.string(),
            eng: Joi.string()
        },
        price: Joi.string().required(),
        images: Joi.string(),
        type: Joi.string()
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { description } = req.body

        if (description) {
            req.body.description = JSON.parse(description)
        }

        const { error } = this.createSchema.validate(req.body)

        if (error) return next(error)

        next()
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { description } = req.body

        if (description) {
            req.body.description = JSON.parse(description)
        }

        const { error } = this.updateSchema.validate(req.body)
        if (error) return next(error)

        next()
    })
}
