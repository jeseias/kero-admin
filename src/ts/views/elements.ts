export const $ = document.querySelector.bind(document)
export const $$ = document.querySelectorAll.bind(document)
export const GEBI = document.getElementById.bind(document)
export const GEBC = document.getElementsByClassName.bind(document)

export default {
  aside: {
    nav: {
      links: <HTMLAnchorElement[]>Array.from($$(`aside .nav__link`))
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