import App from '../App'

import { ProductsAPI, deleteProduct, editProduct, updateProduct } from '../models/Products'

import { mountProducts } from '../views/ProductsView'
import { afterDOM } from '../views/elements'
import { userInputNotifacation } from '../views/View'

import { IProduct } from '../constants/interfaces'

const getAllProducts: () => Promise<IProduct[]> = async () => await ProductsAPI.index(App.AppData.loggedUser!.token)

const productListenerCtrl: () => Promise<void> = async () => {
  const { allProductCards } = afterDOM.pages.products
  const { changeImgInput, imageCoverContainer, productUpdateForm } = afterDOM.pages.products.editProductModal

  const editSwicthProductImg: () => void = () => {
    const input = changeImgInput()
    const img = imageCoverContainer()
    const currentImg = img.src

    input.addEventListener('change', () => {
      const file = Array.from(input.files!)[0]

      if (file) {
        const imgURL = URL.createObjectURL(file)

        img.src = imgURL
      } else {
        img.src = currentImg
      }
    }) 
  }

  const updateProductCtrl: (id: string) => Promise<void> = async id => {
    const form = productUpdateForm()

    form.addEventListener('submit', async (e: Event) => {
      e.preventDefault()

      const name = <HTMLInputElement>form.querySelector('input#edit-product-name')!
      const price = <HTMLInputElement>form.querySelector('input#edit-product-price')!
      const category = <HTMLSelectElement>form.querySelector('select#edit-product-category')!
      const subcategory = <HTMLSelectElement>form.querySelector('select#edit-product-subcategory')!
      const top = <HTMLSelectElement>form.querySelector('select#edit-product-top')!
      const summary = <HTMLTextAreaElement>form.querySelector('textarea#edit-product-summary')!
      const file = <HTMLInputElement>form.querySelector('input[type="file"]')

      const coverImage = file.files![0]

      const validated = userInputNotifacation([
        [name, 'O nome'],
        [price, 'O preço']
      ])   

      if (validated && coverImage) {
        const data = new FormData()

        data.append('imageCover', coverImage)
        data.append('name', name.value)
        data.append('price', price.value)
        data.append('category', category.selectedOptions[0].value)
        data.append('subcategory', subcategory.selectedOptions[0].value)
        data.append('top', top.selectedOptions[0].value)
        data.append('summary', summary.textContent!)

        await updateProduct(id, data) 
      } else if (validated) {
        await updateProduct(id, {
          name: name.value,
          price: price.value,
          category: category.selectedOptions[0]!.value,
          subcategory: subcategory.selectedOptions[0]!.value,
          top: top.selectedOptions[0]!.value,
          summary: summary.textContent!,
        })
      }
    })
  }

  allProductCards().forEach(product => {
    const editBtn = <HTMLElement>product.querySelector('#product-edit-btn')
    const delBtn = <HTMLElement>product.querySelector('#product-delete-btn')

    const getProductID: (btn: HTMLElement) => string = 
      el => el.parentElement!.parentElement!.parentElement!.id.replace('product-', '')

    // Edit the product
    editBtn.addEventListener('click', async () => {
      await editProduct(getProductID(editBtn))

      editSwicthProductImg()    // To switch the current image
      updateProductCtrl(getProductID(editBtn))       // Once the update BTN is cleaned
    })

    // Delete product
    delBtn.addEventListener('click', async () => {
      await deleteProduct(getProductID(delBtn))
    })
  })
}

export const productsPageCtrl: () => Promise<void> = async () => {
  // 1) Get all my products
  const Products = await getAllProducts()

  // 2) Mount the products page
  mountProducts(Products)

  // 3) Edit product listner
  await productListenerCtrl()
}