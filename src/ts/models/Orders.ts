import { getUserToken } from '../models/Auth'
import { APICommunicator } from '../Utils/API'

import { IOrder, IProject } from '../constants/interfaces'

export const OrdersAPI = new APICommunicator('/checkouts')
export const ProductsAPI = new APICommunicator('/products')

export const getAllOrders: () => Promise<IOrder[]> = async () => await OrdersAPI.index(getUserToken())

export const getProductInfo: (id: string) => Promise<IProject> = async id => {
  return await ProductsAPI.show(id, getUserToken())
}

const active: (id: string, state: string) => Promise<void> = async (id, state) => {
  const msg = state === 'sent' 
    ? 'Encomenda não está ativo'
    : 'Encomenda está ativo'

  await OrdersAPI.update(id, { state: state }, msg)
} 

const complete: (id: string) => Promise<void> = async id => {
  await OrdersAPI.update(id, { state: 'complete' }, 'Encomenda concluida')
}

const eliminate: (id: string) => Promise<void> = async id => {
  await OrdersAPI.destroy(id, 'Encomenda Eliminada com successo')
}

export const OrderAction = { active, complete, eliminate }
