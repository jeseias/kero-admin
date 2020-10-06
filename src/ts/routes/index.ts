import PageCtrl from './PageControllers'

import DOM, { GEBI, $ } from '../views/elements' 

import { IAdmin } from '../constants/interfaces'

const setHash: (hash: string) => void = 
  (hash) => window.location.hash = hash;

export const setNavItemActive: (hash: string) => void = (hash) => {
  const { links } = DOM.aside.nav
  const activeClass = 'nav__link--active'

  links.forEach(link => {
    link.hash.replace('#', '') !== hash
      ? link.classList.remove(activeClass) 
      : link.classList.add(activeClass)
  })
}

const toPage: (to: string, chageMenu?: boolean) => void = (to, menu) => {
  const currentPage = <HTMLDivElement | undefined>$('.page.visible')

  const setPage: () => void = () => {
    const page = <HTMLDivElement>GEBI(to)
    page.classList.add('visible') 
    setHash(to) 
  }
  
  if (currentPage) {
    currentPage.classList.remove('visible');
    setPage();
  } else {
    setPage();
  }
} 

export const switchPage: (page: string) => Promise<void> = async (to) => {
  await PageCtrl[to]() 
  toPage(to)
} 

export const pageLoader: () => void = () => {
  ['load', 'hashchange'].forEach(event => {
    window.addEventListener(event, async () => {
      const allPages = ['login', 'home', '']
      let hash = window.location.hash.replace('#', '')
      const loggedAdmin: IAdmin = JSON.parse(localStorage.getItem('kero-admin')!)

      if (!allPages.includes(hash)) return switchPage('error')
      if (!loggedAdmin) return await switchPage('login')

      hash === '' 
        ? (hash = 'login', setHash('login')) 
        : hash
  
      await switchPage(hash)
    })
  })
}