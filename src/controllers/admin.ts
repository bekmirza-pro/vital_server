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
import { signToken } from '../middleware/auth'
import Admin from '../models/Admin'
const { hashSync, compareSync } = require('bcrypt')

export class AdminController {
    getAll = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { lang, id } = res.locals

   
            const admins = await storage.admin.find(req.body)

            res.status(200).json({
                success: true,
                data: {
                    admins
                },
                message: message('admin_getAll_200', lang)
            })
    })

    get = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const admin = await storage.admin.findOne({ _id: req.params.id })

        res.status(200).json({
            success: true,
            data: {
                admin
            }
        })
    })

    create = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { id } = res.locals
        const { password } = req.body

        if (password) req.body.password = await hashSync(password, 10)

            const admin = await storage.admin.create({ ...req.body })
            const token = await signToken(admin.id, 'admin')
            res.status(201).json({
                success: true,
                data: {
                    admin,
                    token
                }
            })
    })

    login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const admin = await storage.admin.findOne({ phone_number: req.body.phone_number })

        const isValidPassword = compareSync(req.body.password, admin.password)

        if (!isValidPassword) return next(new AppError(401, 'Invalid password'))

        if (!admin) {
            return next(new AppError(404, 'Admin not found !!!'))
        }

        const token = await signToken(admin.id, 'admin')

        res.status(201).json({
            success: true,
            data: {
                admin,
                token
            }
        })
    })

    update = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        let admin
        const { password } = req.body

        if (password) req.body.password = await hashSync(password, 10)
 
        admin = await storage.admin.update(req.params.id, req.body)

        res.status(200).json({
            success: true,
            data: {
                admin
            }
        })
    })

    delete = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const admin = await storage.admin.findOne({ _id: req.params.id })


        await storage.admin.delete(req.params.id)
        res.status(204).json({
            success: true,
            data: null
        })
    })
}
