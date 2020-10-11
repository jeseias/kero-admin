import { getAllOrders } from '../models/Orders'

import { mountOrdersPage } from '../views/OrdersView'

export const ordersPageCtrl: () => Promise<void> = async () => { 
  // 1) Get all the orders
  const allOrders = await getAllOrders()

  // 2) Mount orders page
  await mountOrdersPage(allOrders)
}