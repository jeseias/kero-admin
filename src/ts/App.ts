import { pageLoader, switchPage } from './routes/index'
import { setUpHeader } from './controllers/headerCtrl'

import { IApp,  } from './constants/interfaces'
 
class App {

  public AppData: IApp

  constructor() {
    const Admin = JSON.parse(localStorage.getItem('kero-admin')!)

    this.AppData = {
      loggedUser: Admin
    }
  }

  public toPage (page: string) {
    switchPage(page)
  }

  public init() {
    pageLoader()
    setUpHeader()
  }
}

export default new App()