export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)
export const GEBI = document.getElementById.bind(document)
export const GEBC = document.getElementsByClassName.bind(document)

const header = `header.header`

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
      self: <HTMLDivElement>GEBI(`ordes`)
    }
  }
}