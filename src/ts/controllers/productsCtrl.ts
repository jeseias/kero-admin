import App from '../App'

import { mountProducts } from '../views/ProductsView'

import { APICommunicator } from '../Utils/API'
import { IProject } from '../constants/interfaces'

const ProductsAPI = new APICommunicator('/products')

const getAllProducts: () => Promise<IProject[]> = async () => await ProductsAPI.index(App.AppData.loggedUser!.token)

export const productsPageCtrl: () => Promise<void> = async () => {
  // 1.) Display All the products
  const Products = await getAllProducts()

  mountProducts(Products)
}