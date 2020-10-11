import { getUserToken } from '../models/Auth'
import { APICommunicator } from '../Utils/API'

import { IOrder, IProject } from '../constants/interfaces'

export const OrdersAPI = new APICommunicator('/checkouts')
export const ProductsAPI = new APICommunicator('/products')

export const getAllOrders: () => Promise<IOrder[]> = async () => await OrdersAPI.index(getUserToken())

export const getProductInfo: (id: string) => Promise<IProject> = async id => {
  return await ProductsAPI.show(id, getUserToken())
}
