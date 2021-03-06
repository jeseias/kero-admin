import { getAllOrders, OrderAction } from '../models/Orders'

import { mountOrdersPage, getOrdersDetails, setUpHeader } from '../views/OrdersView'

import DOM from '../views/elements'

const { 
  allOrders: allOrdersContainer,
  header: { refreshBtn }  
} = DOM.pages.orders 

const changeOrderStateCtrl: () => {
  active: (id: string, state: string) => Promise<void>,
  complete: (id: string) => Promise<void>,
  eliminate: (id: string) => Promise<void>
} = () => { return { ...OrderAction } }

const remountHeader: () => Promise<void> = async () => {
  // Remount the header
  const allOrders = await getAllOrders()
  const [total, complete, active, done] = getOrdersDetails(allOrders)

  setUpHeader(total, complete, active, done)
}

const orderListernerCtrl: () => void = () => {
  allOrdersContainer.addEventListener('click', async (e: Event) => {
    const el = <HTMLButtonElement>e.target
    const parent = el.parentElement!.parentElement!
    const id = parent.id

    if (el.id === 'active-order') {
      let state = el.dataset.state!
      
      if (state === 'sent') {
        state = 'active'
        el.dataset.state = 'active'
        el.classList.add('active')
      } else if (state === 'active') {
        state = 'sent'
        el.dataset.state = 'sent'
        el.classList.remove('active')
      }

      await changeOrderStateCtrl().active(id, state)
      return await remountHeader()
    } else if (el.id === 'complete-order')  {
      await changeOrderStateCtrl().complete(id)
      return await mountOrdersPage(await getAllOrders())
    } else if (el.id === 'eliminate-order')  {
      await changeOrderStateCtrl().eliminate(id)
      return await mountOrdersPage(await getAllOrders())
    }
  })
}

const refreshOrderPageCtrl: () => Promise<void> = async () => {
  // 1) Get all the orders
  const allOrders = await getAllOrders()

  // 2) Mount orders page
  await mountOrdersPage(allOrders)
}

export const ordersPageCtrl: () => Promise<void> = async () => {
  // 1) Mount the order page
  refreshOrderPageCtrl() 

  // 2) Active, Complete & Delete Listeners
  orderListernerCtrl()

  // 3) Page Refresher
  refreshBtn.addEventListener('click', async () => await refreshOrderPageCtrl())

  
}