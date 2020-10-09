import { IOrder } from '../constants/interfaces'

import DOM from './elements'

export const mountOrdersPage: (orders: IOrder[]) => void = orders => {
  const {
    header: { itemsLength, badgeActive, badgeComplete, badgeDone },
    allOrders
  } = DOM.pages.orders

  const completeOrders = orders.filter(order => order.state === 'complete')
  const acitveOrders = orders.filter(order => order.state === 'active')
  const doneOrders = orders.filter(order => order.state === 'sent')

  itemsLength.textContent = `${orders.length} Encomendas no total`
  badgeComplete.textContent = `${completeOrders.length} Encomendas já entregas`
  badgeActive.textContent = `${acitveOrders.length} Encomendas sendo entregas`
  badgeDone.textContent = `${doneOrders.length} Encomendas ainda por fazer`
}