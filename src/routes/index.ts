import express, { Router } from 'express'
import path from 'path'
import sampleRouter from './sample'
import adminRouter from './admin'
import foodRouter from './product'
import orderRouter from './order'

const router = Router({ mergeParams: true })

router.use('/api/file', express.static(path.join(__dirname, '../../uploads/images')))
router.use('/sample', sampleRouter)
router.use('/admin', adminRouter)
router.use('/product', foodRouter)
router.use('/order', orderRouter)

export default router
