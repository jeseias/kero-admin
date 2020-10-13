export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)
export const GEBI = document.getElementById.bind(document)
export const GEBC = document.getElementsByClassName.bind(document)

const header = `header.header`
const orders = `.page.orders#orders`
const products = `.page.products#products`
const clients = `.page.clients#clients`
const messages = `.page.messages#messages`

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
        itemsLength: <HTMLParagraphElement>$(`${orders} .orders__header .info .length`),
        badgeComplete: <HTMLParagraphElement>$(`${orders} .orders__badge.orders__badge--complete`),
        badgeActive: <HTMLParagraphElement>$(`${orders} .orders__badge.orders__badge--active`),
        badgeDone: <HTMLParagraphElement>$(`${orders} .orders__badge.orders__badge--done`)
      },
      allOrders: <HTMLDivElement>$(`${orders} .orders__all`)
    },
    products: {
      self: <HTMLDivElement>GEBI(`orders`),
      allProducts: <HTMLDivElement>$(`${products} .products__all`),
      header: {
        itemsLength: <HTMLParagraphElement>$(`${products} .info .items`)
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