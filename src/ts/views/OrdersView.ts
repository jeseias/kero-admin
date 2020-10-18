import { getProductInfo } from '../models/Orders'

import { removeChildren, removeAllText } from './View'
import DOM, { $$ } from './elements'

import { IOrder } from '../constants/interfaces'

export const setUpHeader: (total: number, complete: number, active: number, done: number) => void = 
  (total, complete, active, done) => {
    const { itemsLength, badgeActive, badgeComplete, badgeDone } = DOM.pages.orders.header

    itemsLength.textContent = `${total} Encomendas no total`
    badgeComplete.textContent = `${complete} Encomendas já entregas`
    badgeActive.textContent = `${active} Encomendas sendo entregas`
    badgeDone.textContent = `${done + active} Encomendas ainda por fazer`
  }

const showAllOrders: (orders: IOrder[]) => Promise<void> = async orders => {
  const { allOrders } = DOM.pages.orders

  const tempGenerator: (order: IOrder) => Promise<string> = async (order) => {
    const { user, products, location } = order 

    const allProducts = await Promise.all(products.map(async product => await getProductInfo(product.productID)))

    const state = order.state === 'active' ? 'active' : order.state === 'complete' ? 'complete' : 'done'

    return `
      <div class="order" id="${order._id}">
        <div class="order__user">
          <div>
            <img class="order__user__img" src="${user.img__url}"/>
            <p class="order__user__name">${user.name}</p>
            <p class="order__user__phone">${user.phone}</p>
          </div>
          <div>
            <p class="order__user__block">Bloco ${location.block}</p>
            <p class="order__user__building">Predio ${location.building}</p>
            <p class="order__user__entrace">Entrada ${location.entrace}</p>
            <p class="order__user__apartment">Apartamento ${location.apartment}</p>
          </div>
        </div>
        <div class="order__all-products">
          ${allProducts.map(product => `
            <div class="order__product">
              <div class="order__product__img" style="background-image: url('${product.img__url}')"></div>
              <span class="order__product__quantity">
                ${products.filter(prod => prod.productID === product.id)[0].quantity}
              </span>
              <span class="order__product__price">${product.price} AKZ</span>
              <span class="order__product__name">${product.name}</span>
            </div>
          `)}
        </div>
        <div class="order__details order__details--${state}">
          <span> </span>
          <span>Total: ${order.total} AKZ</span>
        </div>
        ${order.state === 'complete'
          ? `
            <div class="order__settings">
              <button id="active-order" 
                disabled
                title="Encomenda ja foi conluida"
                data-state="${order.state}" 
                class="complete"
              >AV</button>
              <button 
                id="complete-order" 
                disabled
                title="Encomenda ja foi conluida"
                class="complete"
              >CT</button>
              <button id="eliminate-order">EM</button>
            </div>
          ` : `
            <div class="order__settings">
              <button id="active-order" 
                data-state="${order.state}" 
                class="${order.state === 'active' ? 'active' : ''}"
              >AV</button>
              <button id="complete-order">CT</button>
              <button id="eliminate-order">EM</button>
            </div>
          `
        }
      </div>
    `
  }

  removeChildren(allOrders)
  orders.forEach(async order => {
    const temp = await tempGenerator(order)

    allOrders.insertAdjacentHTML('afterbegin', temp) 
  })
}

export const getOrdersDetails: (orders: IOrder[]) => number[] = orders => {
  const completeOrders = orders.filter(order => order.state === 'complete')
  const activeOrders = orders.filter(order => order.state === 'active')
  const doneOrders = orders.filter(order => order.state === 'sent')

  return [orders.length, completeOrders.length, activeOrders.length, doneOrders.length]
}

export const mountOrdersPage: (orders: IOrder[]) => Promise<void> = async orders => { 
  const [total, complete, active, done] = getOrdersDetails(orders)

  // 1) Set up the header first
  setUpHeader(total, complete, active, done)

  // 2) Show all the orders
  showAllOrders(orders)
}