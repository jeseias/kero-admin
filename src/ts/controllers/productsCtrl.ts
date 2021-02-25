import App from '../App'

import { hideModal, showModal } from '../models/Modal'

import { ProductsAPI, deleteProduct, editProduct, updateProduct, createProduct, productsCategories } from '../models/Products'

import { mountProducts, createProductModalTemp } from '../views/ProductsView'
import DOM, { afterDOM } from '../views/elements'
import { userInputNotification, removeChildren } from '../views/View'

import { IProduct } from '../constants/interfaces'
import { alertUser } from '../models/Alert'

const getAllProducts: () => Promise<IProduct[]> = async () => await ProductsAPI.index(App.AppData.loggedUser!.token)

const productListenerCtrl: () => Promise<void> = async () => {
  const { header: { addBtn } } = DOM.pages.products
  const { allProductCards } = afterDOM.pages.products
  const { 
		editProductModal: { changeImgInput, imageCoverContainer, productUpdateForm },
    newProduct: { productForm, newProductImg, newProductImgInput, newProductImgInputContainer, categorySelector, 
      subCategorySelector }
  } = afterDOM.pages.products
  
  const changeCategory: () => void = () => {
    const selector = categorySelector()
    const subSelector = subCategorySelector()

    selector.addEventListener('change', () => {
      const activeOption = Array.from(selector.selectedOptions)[0].value
      const activeCategory = productsCategories().filter(item => item.name[0] === activeOption)[0]

      removeChildren(subSelector)
      activeCategory.subCategories.forEach(value => subSelector.insertAdjacentHTML('afterbegin', `
        <option value="${value}">${value}</option>
      `))
    })
  }

	const switchProductImg: (input: HTMLInputElement, img: HTMLImageElement, imgContainer?: HTMLDivElement) => void = 
		(input, img, imgContainer) => {
			const currentImg = img.src

			input.addEventListener('change', () => {
				const file = Array.from(input.files!)[0]

				if (file) {
					const imgURL = URL.createObjectURL(file)
					img.src = imgURL
					imgContainer ? imgContainer.classList.remove('noimg') : false
				} else {
					img.src = currentImg
					imgContainer ? imgContainer.classList.add('noimg') : false
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

      const validated = userInputNotification([
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
        data.append('summary', summary.value!)

        await updateProduct(id, data) 

        // Reload the products page
        App.toPage('products')
        // Close the modal
        hideModal()
      } else if (validated) {
        await updateProduct(id, {
          name: name.value,
          price: price.value,
          category: category.selectedOptions[0]!.value,
          subcategory: subcategory.selectedOptions[0]!.value,
          top: top.selectedOptions[0]!.value,
          summary: summary.value!,
        })
        
        // Reload the products page
        App.toPage('products')
        // Close the modal
        hideModal()
      }
    })
  }

  const addNewProductCtrl: () => Promise<void> = async () => {
    addBtn.addEventListener('click', () => {
      showModal(createProductModalTemp())
      changeCategory()

			const form = productForm();
			const name = <HTMLInputElement>form.querySelector('#add-product-name')
			const price = <HTMLInputElement>form.querySelector('#add-product-price')
			const category = <HTMLSelectElement>form.querySelector('#add-product-category')
			const subcategory = <HTMLSelectElement>form.querySelector('#add-product-subcategory')
			const top = <HTMLSelectElement>form.querySelector('#add-product-top')
			const summary = <HTMLTextAreaElement>form.querySelector('#add-product-summary')
			const file = <HTMLInputElement>form.querySelector('#add-product-file')

			switchProductImg(
				newProductImgInput(), 
				newProductImg(), 
				newProductImgInputContainer()
			)

			productForm().addEventListener('submit', async (e: Event) => {
				e.preventDefault()

				const img = file.files![0]
				const data = new FormData()

				userInputNotification([
					[name, 'O nome'],
					[price, 'O preco'],
					[category, 'A category'],
					[subcategory, 'A subcategory'],
					[top, 'E popular']
				])

				if (!summary.value) return alertUser(false, 'O summario')
        if (!img) return alertUser(false, 'A imagen')
        
        console.log(subcategory.selectedOptions[0].value)

				data.append('name', name.value)
				data.append('price', price.value)
				data.append('category', category.selectedOptions[0].value)
				data.append('subCategory', subcategory.selectedOptions[0].value)
				data.append('top', top.selectedOptions[0].value)
				data.append('summary', summary.value)
				data.append('imageCover', img)

        await createProduct(data)
        hideModal()
        App.toPage('products')
				
			})
    })
  }

  addNewProductCtrl()

  allProductCards().forEach(product => {
    const editBtn = <HTMLElement>product.querySelector('#product-edit-btn')
    const delBtn = <HTMLElement>product.querySelector('#product-delete-btn')

    const getProductID: (btn: HTMLElement) => string = 
      el => el.parentElement!.parentElement!.parentElement!.id.replace('product-', '')

    // Edit the product
    editBtn.addEventListener('click', async () => {
      await editProduct(getProductID(editBtn))

      switchProductImg(changeImgInput(), imageCoverContainer())    // To switch the current image
      updateProductCtrl(getProductID(editBtn))       // Once the update BTN is cleaned
    })

    // Delete product
    delBtn.addEventListener('click', async () => {
      await deleteProduct(getProductID(delBtn))
    })
  })
}

const searchFilterProducts: () => void = () => {
  const { searchInput } = DOM.pages.products.header
  const { allProductCards } = afterDOM.pages.products

  searchInput.addEventListener('keyup', () => {
    const currentValue = searchInput.value.toLowerCase();
    const productCards = allProductCards();

    productCards.forEach(product => {
      const nameParagraph = <HTMLParagraphElement>product.querySelector('.product-card__name')
      const cardName = nameParagraph.dataset.name!.toLowerCase()

      console.log(currentValue, cardName)

      if (cardName.indexOf(currentValue) > -1) {
        product.style.display = 'block';
      } else {
        product.style.display = 'none';
      }
    });
  });
}

export const productsPageCtrl: () => Promise<void> = async () => {
  const {
    header: { category }
  } = DOM.pages.products
  // 1) Get all my products
  const Products = await getAllProducts()

  // 2) Mount the products page
  const filterProducts: (items: IProduct[], category?: string) => IProduct[] = 
    (items, category) => items.filter(item => category !== 'all' ? item.category === category : item)

  mountProducts(Products, filterProducts(Products, category.value))

  category.addEventListener('change', () => { 
    mountProducts(Products, filterProducts(Products, category.value))
  })


  // 3) Edit product listner
  await productListenerCtrl()

  //filter products
  searchFilterProducts()
}