import App from '../App'
import { alertUser } from './Alert'

import { APICommunicator } from '../Utils/API'

import { AdminLogin, IAdmin, IAuthRes } from '../constants/interfaces'

export const AuthAPI = (route: string) => new APICommunicator(route)

export const getUserToken: () => string = 
  () => App.AppData.loggedUser!.token

export const isUserLogged: () => boolean = () => {
  return App.AppData.loggedUser ? true : false
}

export const saveUser: (admin: IAdmin) => void =  (admin) => {
  let Admin: IAdmin = JSON.parse(localStorage.getItem('kero-client')!)

  const setUser = () => {
    Admin = {
     ...admin
    }
    localStorage.setItem('kero-admin', JSON.stringify(Admin))
    App.AppData = { loggedUser: admin }
    App.init()
  } 

  if (!Admin) {
    const Admin: IAdmin = {
      ...admin
    } 

    localStorage.setItem('kero-admin', JSON.stringify(Admin))
    App.AppData = { loggedUser: admin }
    App.init()
  }

  setUser()
}

// export const logout: () => Promise<void> = async () => {
//   localStorage.removeItem('kero-client');
//   App.AppData.loggedUser = undefined
//   alertUser(true, 'Logout Feito com successo')
//   await App.AppSetup().headerSetup()
//   App.toPage('home')
// }

export const loginAdmin: (email: string, password: string) => Promise<void> = async (email, password) => {
  const { data: { token, data: { user } } } = await AuthAPI('users/login')
    .store<AdminLogin, IAuthRes<IAdmin>>({ email, password }, 'Estas logado')

  const Admin: IAdmin = {
    ...user,
    token
  }

  saveUser(Admin)

  App.toPage('orders')
}