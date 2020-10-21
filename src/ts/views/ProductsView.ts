import { IProduct } from '../constants/interfaces'

import DOM from '../views/elements'
import { textShorter, addChildren } from '../views/View'

export const mountProducts: (products: IProduct[]) => void = products => {
  const { 
    allProducts,
    header: { itemsLength } 
  } = DOM.pages.products

  // 1) Display Data
  itemsLength.textContent = `${products.length} Productos cadastrados`

  // 2) Display All products
  const temp: (data: IProduct) => string = data => `
    <div class="product-card" id="product-${data.id}">
      <div class="product-card__img" style="background-image: url(${data.img__url})"></div>
      <p class="product-card__name">${data.name}</p>
      <p class="product-card__summary">${textShorter(80, data.summary)}</p>
      <div class="product-card__footer">
        <span class="product-card__price">${data.price} KZ</span>
        <div>
          <svg class="product-card__delete" id="product-edit-btn">
            <use xlink:href="src/assets/SVGs/sprite.svg#icon-stack"></use>
          </svg>
          <svg class="product-card__delete" id="product-delete-btn">
            <use xlink:href="src/assets/SVGs/sprite.svg#icon-bin"></use>
          </svg>
        </div>
      </div>
    </div>  
  `

  addChildren(allProducts, products, temp, 'afterbegin')
} 

export const editProductModel: (product: IProduct) => string = product => `
  <form id="edit-product-form" class="form-edit-product">
    <div class="form-edit-product__header">
      <svg class="close">
        <use xlink:href="src/assets/SVGs/sprite.svg#icon-circle-with-cross"></use>
      </svg>
    </div>
    <div class="form-edit-product__inputs">
      <label for="edit-product-name">Nome:</label>
      <input class="form-element" type="text" value="${product.name}" id="edit-product-name"/>

      <label for="edit-product-price">Preço</label>
      <input class="form-element" type="number" value="${product.price}" id="edit-product-price"/>

      <label for="edit-product-category">Categoria</label>
      <select class="form-element" id="edit-product-category">
        <option value="${product.category}" selected>${product.category}</option>
        <option value="Alimentação">Alimentação</option>
        <option value="Materias">Materias</option>
        <option value="Vestuários">Vestuários</option>
      </select>

      <label for="edit-product-subcategory">Sub-categoria</label>
      <select class="form-element" id="edit-product-subcategory">
        <option value="${product.subCategory}" selected>${product.subCategory}</option>
        <option value="false">Não Popular</option>
      </select>
      ${product.top
          ? `
            <label for="edit-product-top">Populario</label>
            <select class="form-element" id="edit-product-top">
              <option value="true" selected>Popular</option>
              <option value="false">Não Popular</option>
            </select>
          ` : `
            <label for="edit-product-top">Populario</label>
            <select class="form-element">
              <option value="false" selected>Não Popular</option>
              <option value="true">Popular</option>
            </select>
          `
      }
      <label for="edit-product-summary">Sumário</label>
      <textarea class="form-element" id="edit-product-summary">${product.summary}</textarea>
    </div>
    <div class="form-edit-product__images">
      <img src="${product.img__url}" />
      <input type="file"/> 
    </div>
    <button class="form-edit-product__submit" type="submit">Atualizar</button>
  </form>
`
 