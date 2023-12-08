import { SampleStorage } from './mongo/sample'
import { AdminStorage } from './mongo/admin'
import { OrderStorage } from './mongo/order'
import { ProductStorage } from './mongo/product'

interface IStorage {
    sample: SampleStorage
    admin: AdminStorage
    order: OrderStorage
    product: ProductStorage
}

export let storage: IStorage = {
    sample: new SampleStorage(),
    admin: new AdminStorage(),
    order: new OrderStorage(),
    product: new ProductStorage()
}
