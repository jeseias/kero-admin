import { productsCategories } from '../models/Products'

import DOM from '../views/elements'
import { textShorter, addChildren } from '../views/View'

import { IProduct } from '../constants/interfaces'
import { formatMoney } from '../Utils/logic'

export const mountProducts: (products: IProduct[], filterProducts: IProduct[]) => void = (products, filterProducts) => {
	const { 
		allProducts,
		header: { 
			itemsLength,
			types: { elec, food, mate, colt } 
		} 
	} = DOM.pages.products

	const getCategoryLength: (category: string) => number = 
		category => products.filter(item => item.category === category).length

	// 1) Display Data
	itemsLength.textContent = `${products.length} Productos cadastrados`
	elec.textContent = `Eletronicos - ${getCategoryLength('eletronicos')}`
	food.textContent = `Alimentação - ${getCategoryLength('alimentos')}`
	mate.textContent = `Materias - ${getCategoryLength('materias')}`
	colt.textContent = `Vestuários - ${getCategoryLength('vestuarios')}`

	// 2) Display All products
	const temp: (data: IProduct) => string = data => `
		<div class="product-card" id="product-${data.id}">
			<div class="product-card__img" style="background-image: url(${data.img__url})"></div>
			<p class="product-card__name" data-name="${data.name}">${data.name}</p>
			<p class="product-card__summary">${textShorter(80, data.summary)}</p>
			<div class="product-card__footer">
				<span class="product-card__price">${formatMoney(data.price)}</span>
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

	addChildren(allProducts, filterProducts, temp, 'afterbegin')
} 

export const editProductModel: (product: IProduct) => string = product => {
	const productsCategory = productsCategories()

	const activeCategory = productsCategory.filter(item => item.name[0] === product.category)[0]

	console.log(activeCategory)

	return `
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
					${activeCategory.subCategories.map(item => {
						return item === product.subCategory 
							? `
								<option value="${item}" selected >${item}</option>
							` 
							: `
								<option value="${item}">${item}</option>
							`
					})}
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
							<select class="form-element" id="edit-product-top">
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
}

export const createProductModalTemp: () => string = () => {
	const Categorires = productsCategories()

	return `
		<form id="add-new-product" class="add-new-product">
			<div class="add-new-product__header">
				<svg class="close">
					<use xlink:href="src/assets/SVGs/sprite.svg#icon-circle-with-cross"></use>
				</svg>
			</div>
			<div class="add-new-product__inputs">
				<label for="add-product-name">Nome:</label>
				<input class="form-element" type="text" id="add-product-name"/>

				<label for="add-product-price">Preço</label>
				<input class="form-element" type="number" id="add-product-price"/>

				<label for="add-product-category">Categoria</label>
				<select class="form-element" id="add-product-category"> 
					${Categorires.map(({ name }) => `	
						<option value="${name[0]}">${name[1]}</option>
					`)}
				</select>

				<label for="add-product-subcategory">Sub-categoria</label>
				<select class="form-element" id="add-product-subcategory"> 
					${Categorires[0].subCategories.map((item) => `	
						<option value="${item}">${item}</option>
					`)}
				</select>  

				<label for="add-product-top">Populario</label>
				<select class="form-element" id="add-product-top">
					<option value="true">Popular</option>
					<option value="false">Não Popular</option>
				</select> 
				<label for="add-product-summary">Sumário</label>
				<textarea class="form-element" id="add-product-summary"></textarea>
			</div>
			<div class="add-new-product__images noimg">
				<img  />
				<input type="file" id="add-product-file" /> 
			</div>
			<button class="add-new-product__submit" type="submit">Adicionar</button>
		</form>
	`
}	
