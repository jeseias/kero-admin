import { IProject } from '../constants/interfaces'

import DOM from '../views/elements'
import { textShorter, addChildren } from '../views/View'

export const mountProducts: (products: IProject[]) => void = products => {
  const { allProducts } = DOM.pages.products

  const temp: (data: IProject) => string = data => `
    <div class="product-card" id="product-${data.id}">
      <div class="product-card__img" style="background-image: url(${data.img__url})"></div>
      <p class="product-card__name">${data.name}</p>
      <p class="product-card__summary">${textShorter(80, data.summary)}</p>
      <div class="product-card__footer">
        <span class="product-card__price">${data.price} KZ</span>
        <span class="product-card__cart">Adicionar no carinho</span>
      </div>
    </div>  
  `

  console.log(allProducts)

  addChildren(allProducts, products, temp, 'afterbegin')
} 