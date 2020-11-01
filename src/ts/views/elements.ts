export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)
export const GEBI = document.getElementById.bind(document)
export const GEBC = document.getElementsByClassName.bind(document)

const header = `header.header`
const orders = `.page.orders#orders`
const products = `.page.products#products`
const clients = `.page.clients#clients`
const messages = `.page.messages#messages`

export const afterDOM = {
  pages: {
    orders: {
      allOrders: () => <HTMLDivElement[]>Array.from($$(`${orders} .orders__all .order`))
    },
    products: {
      allProductCards: () => <HTMLDivElement[]>Array.from($$(`${products} .product-card`)),
      editProductModal: {
        changeImgInput: () => <HTMLInputElement>$(`.modal .form-edit-product__images input`),
        imageCoverContainer: () => <HTMLImageElement>$(`.modal .form-edit-product__images img`),
        updateBtn: () => <HTMLButtonElement>$(`.modal .form-edit-product__submit`),
        productUpdateForm: () => <HTMLFormElement>$(`.modal form`)
      },
      newProduct: {
        productForm: () => <HTMLFormElement>$(`.modal form#add-new-product`),
        addProductBtn: () => <HTMLButtonElement>$('.modal form#add-new-product button[type="submit"]'),
        newProductImgInput: () => <HTMLInputElement>$(`.modal .add-new-product__images input`),
        newProductImgInputContainer: () => <HTMLInputElement>$(`.modal .add-new-product__images`),
        newProductImg: () => <HTMLImageElement>$(`.modal .add-new-product__images img`),
        categorySelector: () => <HTMLSelectElement>$(`.modal .add-new-product select#add-product-category`),
        subCategorySelector: () => <HTMLSelectElement>$(`.modal .add-new-product select#add-product-subcategory`),
      }
    }
  }
}

export default {
  aside: {
    nav: {
      links: <HTMLAnchorElement[]>Array.from($$(`aside .nav__link`))
    }
  },

  header: {
    user: {
      name: <HTMLParagraphElement>$(`${header} .user p.user__name`),
      img: <HTMLImageElement>$(`${header} .user img.user__img`),
      menuBtn: <HTMLElement>$(`${header} .user svg.user__icon`),
      menu: <HTMLDivElement>$(`${header} .user .user__menu`)
    }
  },

  loginPage: {
    self: <HTMLDivElement>GEBI(`login`),
    form: {
      self: <HTMLFormElement>GEBI('form-login'),
      email: <HTMLInputElement>GEBI('login-email'),
      password: <HTMLInputElement>GEBI('login-password'),
    }
  },

  pages: {
    self: <HTMLDivElement>$(`.pages`),
    orders: {
      self: <HTMLDivElement>GEBI(`orders`),
      header: {
        itemsLength: <HTMLParagraphElement>$(`${orders} .orders__header .length`),
        badgeComplete: <HTMLParagraphElement>$(`${orders} .orders__badge.orders__badge--complete`),
        badgeActive: <HTMLParagraphElement>$(`${orders} .orders__badge.orders__badge--active`),
        badgeDone: <HTMLParagraphElement>$(`${orders} .orders__badge.orders__badge--done`),
        refreshBtn: <HTMLButtonElement>$(`${orders} .orders__header__settings button`)
      },
      allOrders: <HTMLDivElement>$(`${orders} .orders__all`)
    },
    products: {
      self: <HTMLDivElement>GEBI(`orders`),
      allProducts: <HTMLDivElement>$(`${products} .products__all`),
      header: {
        itemsLength: <HTMLParagraphElement>$(`${products} .info .items`),
        addBtn: <HTMLButtonElement>$(`${products} .products__add-btn`)
      }
    },
    clients: {
      self: <HTMLDivElement>GEBI(`clients`),
      header: {
        totalClients: <HTMLParagraphElement>$(`${clients} .clients__total`)
      },
      allClientesContainer: <HTMLDivElement>$(`${clients} .clients__all`)
    },
    messages: {
      self: <HTMLDivElement>GEBI(`messages`),
      header: {
        totalMessages: <HTMLParagraphElement>$(`${messages} .messages__total`)
      },
      allMessagesContainer: <HTMLDivElement>$(`${messages} .messages__all`)
    }
  }
}