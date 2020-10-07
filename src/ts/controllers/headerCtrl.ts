import App from '../App'

import DOM from '../views/elements'
import { menuToggler } from '../views/View'

export const setUpHeader: () => void = () => {
  const { name, img, menuBtn, menu } = DOM.header.user
  const Admin = App.AppData.loggedUser!

  name.textContent = Admin.name
  img.src = Admin.img__url

  menuToggler(menuBtn, menu, 'user')
}