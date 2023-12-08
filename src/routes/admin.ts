import { Router } from 'express'
import { AdminController } from '../controllers/admin'
import { AdminValidator } from '../validators/admin'
import { Middleware } from '../middleware/auth'

const router = Router({ mergeParams: true })
const controller = new AdminController()
const validator = new AdminValidator()
const middleware = new Middleware()

// Selva

router.route('/all').get(middleware.auth(['admin']), controller.getAll)
router
    .route('/create')
    .post(middleware.auth(['admin']), validator.create, controller.create)

router.route('/login').post( validator.create, controller.login)
router
    .route('/:id')
    .get(middleware.auth(['admin']), controller.get)
    .patch(middleware.auth(['admin']), validator.update, controller.update)
    .delete(middleware.auth(['admin']), controller.delete)

export default router
