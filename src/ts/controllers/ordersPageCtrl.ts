import { getUserToken } from '../models/Auth'
import { APICommunicator } from '../Utils/API'

import { mountOrdersPage } from '../views/OrdersView'

import { IOrder } from '../constants/interfaces'

export const OrdersAPI = new APICommunicator('/checkouts')

const getAllOrders: () => Promise<IOrder[]> = async () => await OrdersAPI.index(getUserToken())

export const ordersPageCtrl: () => Promise<void> = async () => { 
  // 1) Get all the orders
  const allOrders = await getAllOrders()

  // 2) Mount orders page
  mountOrdersPage(allOrders)
}