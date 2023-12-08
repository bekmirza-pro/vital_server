import { ProductRepo, IProductAllResponse } from '../repo/product'
import Product, { IProduct } from '../../models/Product'
import { logger } from '../../config/logger'
import AppError from '../../utils/appError'

export class ProductStorage implements ProductRepo {
    private scope = 'storage.product'

    async find(query: Object): Promise<IProduct[]> {
        try {
            let products = await Product.find({ ...query })
            
            return products
        } catch (error) {
            logger.error(`${this.scope}.find: finished with error: ${error}`)
            throw error
        }
    }

    async findOne(query: Object): Promise<IProduct> {
        try {
            let product = await Product.findOne({ ...query })
            // .populate(['creator', 'category'])
            if (!product) {
                logger.warn(`${this.scope}.get failed to findOne`)
                throw new AppError(404, 'product_404')
            }

            return product
        } catch (error) {
            logger.error(`${this.scope}.findOne: finished with error: ${error}`)
            throw error
        }
    }

    async create(payload: IProduct): Promise<IProduct> {
        try {
            let product = await Product.create(payload)

            return product
        } catch (error) {
            logger.error(`${this.scope}.create: finished with error: ${error}`)
            throw error
        }
    }

    async update(id: string, payload: IProduct): Promise<IProduct> {
        try {
            let product = await Product.findByIdAndUpdate(id, payload, {
                new: true
            })

            if (!product) {
                logger.warn(`${this.scope}.update failed to findByIdAndUpdate`)
                throw new AppError(404, 'product_404')
            }

            return product
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async updateMany(id: string, payload: Object): Promise<Object> {
        try {
            let products = await Product.updateMany({ creator: id }, payload)
            if (!products) {
                logger.warn(`${this.scope}.update failed to updateMany`)
                throw new AppError(404, 'product_404')
            }
            return products
        } catch (error) {
            logger.error(`${this.scope}.update: finished with error: ${error}`)
            throw error
        }
    }

    async delete(id: string): Promise<any> {
        try {
            let product = await Product.findByIdAndDelete(id)

            if (!product) {
                logger.warn(`${this.scope}.delete failed to findByIdAndDelete`)
                throw new AppError(404, 'sample_404')
            }

            return product
        } catch (error) {
            logger.error(`${this.scope}.delete: finished with error: ${error}`)
            throw error
        }
    }
}
