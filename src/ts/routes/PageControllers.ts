import { loginCtrl } from '../controllers/authCtrl'
import { errorPageCtrl } from '../controllers/errorPageCtrl'
import { ordersPageCtrl } from '../controllers/ordersPageCtrl'
import { messagesPageCtrl } from '../controllers/messagesCtrl'
import { clientsPageCtrl } from '../controllers/clientsCtrl'
import { productsPageCtrl } from '../controllers/productsCtrl'

export default {
  login: loginCtrl,
  error: errorPageCtrl,
  orders: ordersPageCtrl,
  messages: messagesPageCtrl,
  clients: clientsPageCtrl,
  products: productsPageCtrl
}