import { NextFunction, Request, Response } from 'express'
import { logger } from '../config/logger'
import { storage } from '../storage/main'
import AppError from '../utils/appError'
import catchAsync from '../utils/catchAsync'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import sharp from 'sharp'
import { unlink } from 'fs/promises'
import { message } from '../locales/get_message'

export class OrderController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id, role } = res.locals
        const orders = await storage.order.find(req.query)

        res.status(200).json({
            success: true,
            data: {
                orders
            },
            message: message('order_getAll_200', lang)
        })
    })
 
    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const order = await storage.order.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                order
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const order = await storage.order.create({ ...req.body, creator: res.locals.id })

        res.status(201).json({
            success: true,
            data: {
                order
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const order = await storage.order.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                order
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const order = await storage.order.findOne(req.body.order)

         
            await storage.order.delete(req.params.id)
            res.status(200).json({
                success: true,
                data: null
            })
        
        
    })
}
