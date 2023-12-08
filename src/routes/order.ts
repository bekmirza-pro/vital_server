import { Router } from 'express'
import { OrderController } from '../controllers/order'
import { OrderValidator } from '../validators/orders'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new OrderController()
const validator = new OrderValidator()
const middleware = new Middleware()

router.route('/all').get(middleware.auth(['admin']), controller.getAll)
router.route('/create').post(controller.create)
router
    .route('/:id')
    .get(middleware.auth(['admin']), controller.get)
    .patch(middleware.auth(['admin']), controller.update)
    .delete(middleware.auth(['admin']), controller.delete)

export default router
