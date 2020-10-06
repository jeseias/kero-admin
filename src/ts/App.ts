import { pageLoader, switchPage } from './routes/index'

import { IApp,  } from './constants/interfaces'
 
class App {

  public AppData: IApp

  constructor() {
    const Admin = JSON.parse(localStorage.getItem('kero-admin')!)

    this.AppData = {
      loggedUser: Admin
    }
  }

  public toPage (page: 'login' | 'home') {
    switchPage(page)
  }

  public init() {
    pageLoader()
  }
}

export default new App()