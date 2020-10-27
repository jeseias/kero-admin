import App from '../App'
import { APICommunicator } from '../Utils/API'

import { alertUser } from './Alert'
import { showModal } from './Modal'

import { GEBI } from '../views/elements'
import { editProductModel } from '../views/ProductsView'

import { IProduct } from '../constants/interfaces'

export const ProductsAPI = new APICommunicator('/products')

export const editProduct: (id: string) => Promise<void> = async id => {
  const product = await ProductsAPI.show<IProduct>(id)

  showModal(editProductModel(product))
}

export const deleteProduct: (id: string) => Promise<void> = async id => {
  try {
    await ProductsAPI.destroy(id, 'Produto eliminado com successo')
    alertUser(true, 'Produto eliminado com successo')

    const productDiv = <HTMLDivElement>GEBI(`product-${id}`) 
    productDiv.parentElement!.removeChild(productDiv)
  } catch (error) {
    alertUser(false, 'Não foi possivel eliminar o produto')
  }
}

export const updateProduct: (id: string, data: any) => Promise<void> = async (id, data) => {
  await ProductsAPI.update(id, data, 'Producto atualizado com successo')
}

export const createProduct: (data: any) => Promise<void> = async (data) => {
  await ProductsAPI.store(data, 'Produto criado com successo', App.AppData.loggedUser!.token)
}

