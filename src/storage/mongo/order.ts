import { OrderRepo, IOrderAllResponse } from '../repo/order'
import Order, { IOrder } from '../../models/Orders'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class OrderStorage implements OrderRepo {
    private scope = 'storage.order'

    async find(query: Object): Promise<IOrder[]> {
        try {
            let order = await Order.find({ ...query }).populate(['product_id'])

            return order
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IOrder> {
        try {
            let order = await Order.findOne({ ...query }).populate(['product_id'])

            if (!order) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'order_404')
            }

            return order
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IOrder): Promise<IOrder> {
        try {
            let order = await Order.create(payload)

            return order
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: string, payload: IOrder | object): Promise<IOrder> {
        try {
            let order = await Order.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!order) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'order_404')
            }

            return order
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(id: string): Promise<any> {
        try {
            let order = await Order.findByIdAndDelete(id)

            if (!order) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, 'sample_404')
            }

            return order
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
